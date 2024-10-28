<script lang="ts">
import { defineComponent } from 'vue';
import Todo from 'src/classes/Todo.ts';
import queryGraphQL from 'src/functions/queryGraphQL.ts';
import ActionAddOrRemoveUserComponent from 'components/IndexPage/actionsOfShowTodo/ActionAddOrRemoveUserComponent.vue';
import ActionDeleteComponent from 'components/IndexPage/actionsOfShowTodo/ActionDeleteComponent.vue';
import ActionEditComponent from 'components/IndexPage/actionsOfShowTodo/ActionEditComponent.vue';

enum Actions {
  edit = 'ActionEditComponent',
  addOrRemoveUser = 'ActionAddOrRemoveUserComponent',
  delete = 'ActionDeleteComponent',
}

export default defineComponent({
  name: 'ShowTodoComponent',

  components: {
    ActionAddOrRemoveUserComponent,
    ActionDeleteComponent,
    ActionEditComponent,
  },

  props: {
    todo: {
      type: Todo,
      required: true,
    },
  },

  data() {
    const todoData = this.todo;
    const actionSelected: Actions | null = null;

    return {
      todoData,
      actionSelected,
      Actions,
    };
  },

  methods: {
    async getDataTodo() {
      await queryGraphQL(`{
        todo(id: ${this.todo.id}) {
          description,
          status,
          users {
            user {
              id,
              name
            }
          },
        },
      }`).then(({ data: { todo } }) => {
        this.todoData.description = todo.description;
        this.todoData.status = todo.status;
        this.todoData.users = todo.users.map(({ user }) => user);
      });
    },
  },

  mounted() {
    this.getDataTodo();
  },
});
</script>

<template>
  <q-card>
    <q-card-section>
      <q-btn
        icon="close"
        v-close-popup
        round
        push
        class="shadow-2 tw-block tw-ml-auto"
      />
    </q-card-section>
    <div class="row">
      <div class="col-5">
        <q-card-section>
          <p class="tw-text-2xl tw-text-center">
            <strong>Informações</strong>
          </p>
          <div>
            <ul>
              <strong>Titulo: </strong>
              <span class="tw-break-words">{{ todoData.title }}</span>
            </ul>
            <ul>
              <strong>Descrição: </strong>
              <span class="tw-break-words">{{ todoData.description }}</span>
            </ul>
            <ul>
              <strong>Status: </strong>
              <span>{{ todoData.status }}</span>
            </ul>
          </div>
        </q-card-section>
        <q-card-section>
          <p class="tw-text-2xl tw-text-center">
            <strong>Usuários responsaveis</strong>
          </p>
          <div class="row">
            <ul v-for="(user, index) in todoData.users" :key="index">
              <q-item-section avatar>
                <q-avatar round color="primary" text-color="white">
                  {{ user.name[0].toUpperCase() }}
                  <q-tooltip>
                    {{ user.name }}
                  </q-tooltip>
                </q-avatar>
              </q-item-section>
            </ul>
          </div>
        </q-card-section>
      </div>
      <q-separator vertical inset />
      <div class="col-5">
        <q-card-section>
          <p class="tw-text-2xl tw-text-center">
            <strong>Ações</strong>
          </p>
          <q-list bordered separator>
            <q-item
              clickable
              v-ripple
              class="shadow-4 tw-mb-4"
              @click="actionSelected = Actions.edit"
            >
              <q-item-section>
                <q-item-label>Editar informações da tarefa</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="shadow-4 tw-mb-4"
              @click="actionSelected = Actions.addOrRemoveUser"
            >
              <q-item-section>
                <q-item-label>Adicionar/remover usuário da tarefa</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="shadow-4 tw-bg-red-600 tw-text-slate-50"
              @click="actionSelected = Actions.delete"
            >
              <q-item-section>
                <q-item-label>Deletar Tarefa</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <ul>
            <transition name="fade">
              <keep-alive>
                <component :is="actionSelected" />
              </keep-alive>
            </transition>
          </ul>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<style scoped></style>
