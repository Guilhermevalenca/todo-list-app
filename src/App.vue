<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <template v-if="$route.meta.keepAlive">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </template>
      <template v-else>
        <component :is="Component" />
      </template>
    </transition>
  </router-view>

  <q-dialog v-model="notifyAlert" persistent>
    <q-card>
      <q-card-section v-if="alterMessage">
        <p>Autenticação concluída!</p>
        <q-icon name="done" size="3em" class="tw-block tw-mx-auto" />
      </q-card-section>
      <q-card-section v-else>
        <p>Estamos preparando sua sessão!</p>
        <q-spinner color="primary" size="3em" class="tw-block tw-mx-auto" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/use-user-store.ts';
import User from 'src/classes/User.ts';

export default defineComponent({
  name: 'App',

  data() {
    return {
      userStore: useUserStore().user,
      notifyAlert: true,
      alterMessage: false,
    };
  },

  mounted() {
    if (localStorage.getItem('token')) {
      User.isLogged()
        .then(() => {
          this.alterMessage = true;
          setTimeout(() => {
            this.notifyAlert = false;
          }, 1000);
        })
        .catch(() => {
          this.notifyAlert = false;
          this.$router.push({ name: 'login' });
        });
    } else {
      this.notifyAlert = false;
      this.$router.push({ name: 'login' });
    }
  },
});
</script>
