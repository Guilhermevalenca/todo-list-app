<script lang="ts">
import { defineComponent } from 'vue';
import Todo from 'src/classes/Todo.ts';

export default defineComponent({
  name: 'ActionAddOrRemoveUserComponent',

  props: {
    todo: {
      type: Todo,
      required: true,
    },
  },

  data() {
    const todoData = this.todo;

    return {
      todoData,
    };
  },

  activated() {
    console.log('add/remove ativado');
  },
});
</script>

<template>
  <div>Eu adiciono e removo usuários</div>
</template>

<style scoped></style>
