<template>
  <q-page class="row items-center justify-evenly">
    <pre>{{ router }}</pre>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',

  components: {},

  data() {
    return {
      router: useRouter(),
    }
  },
});
</script>
