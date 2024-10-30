<script lang="ts">
import { defineComponent } from 'vue';
import Todo from 'src/classes/Todo.ts';

export default defineComponent({
  name: 'ActionDeleteComponent',

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
    console.log('delete ativado');
  },
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
