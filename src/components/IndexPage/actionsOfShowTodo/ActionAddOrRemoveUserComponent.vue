<script lang="ts">
import { defineComponent } from 'vue';
import Todo from 'src/classes/Todo.ts';
import User from 'src/classes/User.ts';
import TUser from 'src/classes/types/TUser.ts';

export default defineComponent({
  name: 'ActionAddOrRemoveUserComponent',

  props: {
    todo: {
      type: Todo,
      required: true,
    },
  },

  inject: ['dataUserGroup'],

  data() {
    const todoData = this.todo;
    const userGroup = this.dataUserGroup;
    return {
      todoData,
      userGroup,
      //mudei a forma de escrita por ser uma variável muito grande
      group_users_not_assigned_to_task: [],
      usersAssignedToTask: [...todoData.users],
    };
  },

  methods: {
    getUsersNotAssigned() {
      this.group_users_not_assigned_to_task =
        this.userGroup?.group.users.filter(
          (user) =>
            !this.todoData.users.some((userTodo) => userTodo.id === user.id),
        );
    },
    switchSide(user: User | TUser, addInTask: boolean) {
      if(addInTask) {
        this.group_users_not_assigned_to_task = this.group_users_not_assigned_to_task.filter((data) => data.id !== user.id);
        this.usersAssignedToTask.push(user);
      } else {
        this.usersAssignedToTask = this.usersAssignedToTask.filter((data) => data.id !== user.id);
        this.group_users_not_assigned_to_task.push(user);
      }
    },
    async updateUsers() {
      const users = this.usersAssignedToTask.map( (user: User | TUser) => ({
        id: Number(user?.id),
      }));
      await this.todoData.updateManyUsers(users)
        .then((response) => {
          console.log('deu bom', response);
        })
        .catch(error => {
          console.log('deu merda, a merda:', error);
        })
    }
  },

  activated() {
    this.getUsersNotAssigned();
    this.usersAssignedToTask = [...this.todoData.users];
  },
});
</script>

<template>
  <section>
    <q-icon
      name="mdi-help"
      round
      color="primary"
      class="tw-block tw-ml-auto tw-mt-0 tw-mb-4"
      size="md"
    >
      <q-tooltip>
        <p class="tw-text-center tw-text-xl">
          <strong>Apenas clique no usuário para que ele mudar de lado</strong>
        </p>
      </q-tooltip>
    </q-icon>
    <div class="row justify-evenly">
      <div class="column">
        <p>
          <strong>usuários da tarefa</strong>
        </p>
        <div class="tw-grid tw-grid-cols-2 tw-gap-1">
          <div
            v-for="(user, index) in usersAssignedToTask"
            :key="index"
            @click="switchSide(user, false)"
            class="tw-cursor-pointer"
          >
            <q-item-section avatar>
              <q-avatar round color="primary" text-color="white">
                {{user.name[0].toUpperCase()}}
                <q-tooltip>
                  {{user.name}}
                </q-tooltip>
              </q-avatar>
            </q-item-section>
          </div>
        </div>
      </div>
      <q-separator vertical inset />
      <div class="column">
        <p>
          <strong>Usuários do grupo não atribuídos a tarefá</strong>
        </p>
        <div class="tw-grid tw-grid-cols-3 tw-gap-1">
          <div
            v-for="(user, index) in group_users_not_assigned_to_task"
            :key="index"
            @click="switchSide(user, true)"
            class="tw-cursor-pointer"
          >
            <q-item-section avatar>
              <q-avatar round color="primary" text-color="white">
                {{user.name[0].toUpperCase()}}
                <q-tooltip>
                  {{user.name}}
                </q-tooltip>
              </q-avatar>
            </q-item-section>
          </div>
        </div>
      </div>
    </div>
    <br />
    <q-separator inset />
    <q-btn
      class="tw-mt-4 tw-block tw-mx-auto"
      color="primary"
      @click="updateUsers"
    >Salvar alterações</q-btn>
  </section>
</template>

<style scoped></style>
