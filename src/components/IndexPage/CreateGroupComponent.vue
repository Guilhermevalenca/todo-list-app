<script lang="ts">
import { defineComponent } from 'vue';
import Group from 'src/classes/Group.ts';

export default defineComponent({
  name: 'CreateGroupComponent',

  emits: ['created-group', 'close-create-group'],

  data() {
    const group = new Group();

    return {
      group,
      rulesName: [
        (value: string): string | true => {
          return !!value ? true : 'É necessario preencher este campo!';
        },
      ],
    };
  },

  methods: {
    resetValuesGroup() {
      this.group.name = '';
      this.group.description = '';
      this.$emit('close-create-group');
    },
    async submit() {
      await this.group.create().then(() => {
        this.$q.notify({
          message: 'Grupo criado com sucesso!',
          icon: 'done',
          color: 'positive',
          position: 'top',
        });
        this.$eventEmitter.emit('created-group');
        this.resetValuesGroup();
      });
    },
  },
});
</script>

<template>
  <section>
    <p class="tw-text-2xl tw-text-center tw-mb-0">
      <strong>Criar grupo</strong>
    </p>
    <br />
    <q-form @submit.prevent="submit">
      <q-input
        v-model="group.name"
        label="Titulo"
        outlined
        :rules="rulesName"
      />
      <br />
      <q-input
        v-model="group.description"
        label="Descrição"
        type="textarea"
        outlined
        hint="Obs.: Campo não obrigatório"
      />
      <br />
      <div class="tw-flex tw-justify-end tw-gap-2">
        <q-btn type="button" @click="resetValuesGroup" outline>Cancelar</q-btn>
        <q-btn type="submit" color="primary" push class="shadow-4"
          >Criar grupo</q-btn
        >
      </div>
    </q-form>
  </section>
</template>

<style scoped></style>
