<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-5">
      <p class="tw-text-2xl">
        <strong>Seus grupos:</strong>
      </p>
      <q-list>
        <q-item
          v-for="(value, index) in groups"
          :key="index"
          clickable
          class="shadow-2 tw-mb-2"
          @click="() => (groupSelected = value)"
        >
          <q-item-section>
            <q-item-label>{{ value.group.name }}</q-item-label>
            <q-item-label caption>Você é: {{ value.role }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-separator vertical inset />
    <div class="col-5">
      <transition name="fade">
        <keep-alive>
          <div v-if="groupSelected === null">
            <p class="tw-text-center tw-text-xl">Nenhum grupo selecionado</p>
          </div>
          <div v-else>
            <InfoGroupComponent
              :user-on-group="groupSelected"
              @info-close="groupSelected = null"
            />
          </div>
        </keep-alive>
      </transition>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUserStore from 'stores/use-user-store.ts';
import TUsersOnGroups from 'src/classes/types/TUsersOnGroups.ts';
import UsersOnGroups from 'src/classes/UsersOnGroups.ts';
import Group from 'src/classes/Group.ts';
import InfoGroupComponent from 'components/IndexPage/InfoGroupComponent.vue';
import queryGraphQL from 'src/functions/queryGraphQL.ts';

export default defineComponent({
  name: 'IndexPage',

  components: {
    InfoGroupComponent,
  },

  data() {
    const groups: UsersOnGroups[] = [];
    const groupSelected: UsersOnGroups | null = null;
    return {
      userStore: useUserStore().user,
      groups,
      groupSelected,
    };
  },

  methods: {
    async getGroups() {
      await queryGraphQL(`{
        user {
          groups {
            role,
            group {
              id,
              name,
            },
          },
        }
      }`).then(
        ({
          data: {
            user: { groups },
          },
        }) => {
          this.groups = groups.map((data: TUsersOnGroups) => {
            return new UsersOnGroups({
              role: data.role,
              group: new Group(data.group),
            });
          });
        },
      );
    },
  },

  mounted() {
    this.getGroups();
  },
});
</script>
