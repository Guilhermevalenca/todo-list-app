<template>
  <q-item clickable :to="{ name }" :active="router.currentRoute.name === name">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  name: string;
  icon?: string;
}

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      router: useRouter()
    }
  }
});
</script>
