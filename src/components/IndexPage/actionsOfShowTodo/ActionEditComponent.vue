<script lang="ts">
import { defineComponent } from 'vue';
import Todo from 'src/classes/Todo.ts';
import { StatusTodoTranslate } from 'src/classes/enums/StatusTodo.ts';
import queryGraphQL from 'src/functions/queryGraphQL.ts';

export default defineComponent({
  name: 'ActionEditComponent',

  props: {
    todo: {
      type: Todo,
      required: true,
    }
  },

  data() {
    const todoData = this.todo;
    const todoOriginalValues = {
      title: this.todo.title,
      description: this.todo.description,
      status: this.todo.status,
    }

    return {
      todoData,
      StatusTodoTranslate,
      todoOriginalValues,
    }
  },

  activated() {
    console.log('edit ativado');
  },

  mounted() {
    this.$eventEmitter.on('reset-unsaved', () => {
      this.resetValues();
    });
  },

  methods: {
    async resetValues() {
      this.todoData.title = this.todoOriginalValues.title;
      this.todoData.description = this.todoOriginalValues.description;
      this.todoData.status = this.todoOriginalValues.status;

      await queryGraphQL(`{
        todo(id: ${this.todo.id}) {
          title,
          description,
          status,
        }
      }`)
        .then(({data: {todo}}) => {
          this.todoData.title = todo?.title ?? '';
          this.todoData.description = todo?.description ?? '';
          this.todoData.status = todo?.status ?? StatusTodoTranslate.notCompleted;
        })
    },
    async submit() {
      await this.todo.update()
        .then(() => {
          console.log('editado com sucesso!!')
        });
    }
  }
});
</script>

<template>
  <div>
    <q-form @submit.prevent="submit">
      <q-input v-model="todoData.title" label="Titulo" outlined />
      <br />
      <q-input v-model="todoData.description" label="Descrição" outlined />
      <br />
      <q-select v-model="todoData.status" label="Status" :options="Object.values(StatusTodoTranslate)" outlined />
      <br />
      <div class="tw-flex tw-justify-center tw-gap-2">
        <q-btn type="button" rounded @click="resetValues">
          Resetar valores
          <q-tooltip>
            <p class="tw-text-xl">Reseta valores para o valor original!</p>
          </q-tooltip>
        </q-btn>
        <q-btn type="submit" rounded push color="primary" class="shadow-4">
          Editar
          <q-tooltip>
            <p class="tw-text-xl">Atualiza as informações da tarefá!</p>
          </q-tooltip>
        </q-btn>
      </div>
    </q-form>
  </div>
</template>

<style scoped></style>
