<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>
          <q-btn
            v-if="userStore.id"
            :label="userStore.name"
            push
            class="shadow-2"
          >
            <q-menu>
              <q-list>
                <q-item>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/use-user-store.ts';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Pagina inicial',
    icon: 'home',
    name: 'home',
  },
];

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      userStore: useUserStore().user,
    };
  },
});
</script>
