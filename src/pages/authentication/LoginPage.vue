<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/use-user-store.ts';

export default defineComponent({
  name: 'LoginPage',

  data() {
    return {
      user: useUserStore().user,
      showPassword: false,
    };
  },

  methods: {
    async submit() {
      await this.user
        .login()
        .then(() => {
          this.$router.push({ name: 'home' });
        })
        .catch(({ response: { status } }) => {
          if (status === 401) {
            this.$q.notify({
              message: 'Email ou senha incorretos!',
              position: 'top',
              color: 'negative',
            });
          }
        });
    },
  },
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="col-8">
      <q-card-section>
        <p class="tw-text-center">
          <strong class="tw-text-2xl">Realize seu login!</strong>
        </p>
        <br />
        <q-form @submit.prevent="submit">
          <q-input v-model="user.email" label="Email" type="email" outlined />
          <br />
          <q-input
            v-model="user.password"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            outlined
          >
            <template #append>
              <q-btn
                :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click="showPassword = !showPassword"
                round
                push
                outline
                class="shadow-2"
              >
                <q-tooltip>
                  {{ showPassword ? 'Esconder senha' : 'Ver senha' }}
                </q-tooltip>
              </q-btn>
              <q-icon name="mdi-lock" />
            </template>
          </q-input>
          <br />
          <div class="tw-flex tw-items-center tw-justify-end tw-gap-2">
            <router-link :to="{ name: 'createAccount' }"
              >Criar conta</router-link
            >
            <q-btn type="submit" color="primary" rounded push class="shadow-2"
              >Login</q-btn
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
