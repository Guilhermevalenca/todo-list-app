<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionAddOrRemoveUserComponent',

  activated() {
    console.log('add/remove ativado');
  },
});
</script>

<template>
  <div>Eu adiciono e removo usuários</div>
</template>

<style scoped></style>
