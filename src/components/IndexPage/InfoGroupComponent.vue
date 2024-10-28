<script lang="ts">
import { defineComponent } from 'vue';
import UsersOnGroups from 'src/classes/UsersOnGroups.ts';
import useUserStore from 'stores/use-user-store.ts';

export default defineComponent({
  name: 'InfoGroupComponent',

  props: {
    userOnGroup: {
      type: UsersOnGroups,
      required: true,
    },
  },

  data() {
    const userGroup: UsersOnGroups = this.userOnGroup;

    return {
      userGroup,
      userStore: useUserStore().user,
    };
  },

  methods: {
    async getUsers() {
      const query = `{
        group(id: ${this.userGroup.group.id}) {
          users {
            user {
              id,
              name,
            },
          },
        },
      }`;
      await this.$axios.get('graphql?query=' + query).then(
        ({
          data: {
            data: {
              group: { users },
            },
          },
        }) => {
          this.userGroup.group.users = users.map(({ user }) => user);
        },
      );
    },
  },

  mounted() {
    this.getUsers();
  },

  updated() {
    this.userGroup = this.userOnGroup;
    this.getUsers();
  },
});
</script>

<template>
  <q-card>
    <q-card-section>
      <p>{{ userGroup.group.name }}</p>
    </q-card-section>
    <q-card-section>
      <q-list>
        <q-item v-for="(user, index) in userGroup.group?.users" :key="index">
          <q-item-section>
            {{ user.name }} {{ user.id === userStore.id && '(Você)' }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
