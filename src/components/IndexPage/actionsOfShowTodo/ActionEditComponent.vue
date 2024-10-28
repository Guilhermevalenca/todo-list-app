<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionEditComponent',

  activated() {
    console.log('edit ativado');
  },
});
</script>

<template>
  <div>Ola, eu sou o editar dessa poha</div>
</template>

<style scoped></style>
