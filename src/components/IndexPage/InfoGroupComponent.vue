<script lang="ts">
import { defineComponent } from 'vue';
import UsersOnGroups from 'src/classes/UsersOnGroups.ts';
import useUserStore from 'stores/use-user-store.ts';
import ShowTodoComponent from 'components/IndexPage/ShowTodoComponent.vue';
import TTodo from 'src/classes/types/TTodo.ts';
import Todo from 'src/classes/Todo.ts';
import queryGraphQL from 'src/functions/queryGraphQL.ts';
import LoadingComponent from 'components/IndexPage/LoadingComponent.vue';

export default defineComponent({
  name: 'InfoGroupComponent',
  components: {
    ShowTodoComponent,
    LoadingComponent,
  },

  props: {
    userOnGroup: {
      type: UsersOnGroups,
      required: true,
    },
  },

  emits: ['info-close'],

  data() {
    const userGroup: UsersOnGroups = this.userOnGroup;
    const todoSelected: Todo | null = null;

    return {
      userGroup,
      userStore: useUserStore().user,
      showTodo: false,
      todoSelected,
      loading: {
        all: false,
        user: false,
        todo: false,
      },
    };
  },

  methods: {
    async getUsers() {
      this.loading.user = true;
      await queryGraphQL(`{
        group(id: ${this.userGroup.group.id}) {
          users {
            user {
              id,
              name,
            },
          },
        },
      }`)
        .then(
          ({
            data: {
              group: { users },
            },
          }) => {
            this.userGroup.group.users = users.map(({ user }) => user);
          },
        )
        .finally(() => {
          this.loading.user = false;
        });
    },
    async getDataGroup() {
      this.loading.todo = true;
      await queryGraphQL(`{
        group(id: ${this.userGroup.group.id}) {
          description,
          todos {
            id,
            title,
          }
        }
      }`)
        .then(({ data: { group } }) => {
          this.userGroup.group.description = group?.description;
          this.userGroup.group.todos = group?.todos.map(
            (todo: TTodo) =>
              new Todo({
                id: todo.id,
                title: todo.title,
              }),
          );
        })
        .finally(() => {
          this.loading.todo = false;
        });
    },
    setShowTodo(value: Todo | TTodo) {
      this.todoSelected = value;
      this.showTodo = true;
    },
  },

  watch: {
    // Observando apenas a id do grupo, para evitar infinite loop
    'userOnGroup.group.id': {
      immediate: true,
      async handler() {
        this.loading.all = true;
        this.userGroup = this.userOnGroup;
        await Promise.race([this.getUsers(), this.getDataGroup()]).finally(
          () => {
            this.loading.all = false;
          },
        );
      },
    },
  },
});
</script>

<template>
  <div v-if="loading.all">
    <LoadingComponent text="Estamos carregando os dados do grupo" />
  </div>
  <div
    v-else
    class="tw-grid tw-gap-2 tw-overflow-auto tw-w-full"
    style="max-height: 80vh"
  >
    <div>
      <div>
        <q-btn
          icon="close"
          class="tw-block tw-ml-auto shadow-4"
          round
          push
          @click="$emit('info-close')"
        />
      </div>
      <p class="tw-text-2xl tw-text-center tw-mb-0">
        <strong>{{ userGroup.group.name }}</strong>
      </p>
      <transition name="fade">
        <div v-if="loading.user">
          <LoadingComponent
            text="Estamos Carregando os demais dados do grupo"
          />
        </div>
        <div v-else>
          <p class="tw-text-gray-600">
            {{ userGroup.group.description }}
          </p>
          <p class="tw-text-xl tw-mt-6">
            <strong>Usuários do grupo:</strong>
          </p>
          <div class="row tw-gap-2">
            <q-item
              v-for="(user, index) in userGroup.group?.users"
              :key="index"
              class="tw-border tw-border-solid tw-border-gray-400"
            >
              <q-item-section class="tw-w-full">
                {{ user.name }} {{ user.id === userStore.id && '(Você)' }}
              </q-item-section>
            </q-item>
          </div>
        </div>
      </transition>
    </div>
    <q-separator inset />
    <div>
      <p class="tw-text-xl">
        <strong>Tarefás associadas ao grupo:</strong>
      </p>
      <transition name="fade">
        <div v-if="loading.todo">
          <LoadingComponent
            text="Estamos terminando de carregar as tarefas do grupo"
          />
        </div>
        <div v-else class="tw-grid tw-grid-cols-3 tw-gap-2">
          <q-item
            v-for="(todo, index) in userGroup.group?.todos"
            :key="index"
            class="tw-border tw-border-solid tw-border-gray-400 shadow-2"
            clickable
            @click="() => setShowTodo(todo)"
          >
            <q-item-section>
              <span class="tw-break-words tw-w-full">
                {{ todo.title }}
              </span>
            </q-item-section>
          </q-item>
        </div>
      </transition>
    </div>
  </div>
  <keep-alive>
    <q-dialog v-model="showTodo" full-width full-height>
      <ShowTodoComponent :todo="todoSelected" />
    </q-dialog>
  </keep-alive>
</template>
