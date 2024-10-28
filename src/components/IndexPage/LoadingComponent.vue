<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingComponent',

  props: {
    text: {
      type: String,
      required: true,
    }
  }
});
</script>

<template>
  <q-card>
    <q-card-section>
      <p class="tw-text-2xl tw-text-center">
        <strong>{{text}}</strong>
      </p>
      <q-spinner color="primary" size="3em" class="tw-block tw-mx-auto" />
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
