<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-5 tw-grid">
      <div>
        <p class="tw-text-2xl">
          <strong>Seus grupos:</strong>
        </p>
        <q-list>
          <q-item
            clickable
            class="shadow-4 tw-mb-8"
            @click="isCreateGroup = true"
          >
            <q-item-section avatar>
              <q-avatar round color="primary">
                <q-icon name="mdi-plus" color="white" />
              </q-avatar>
            </q-item-section>
            <q-item-label class="tw-flex tw-items-center"
              >Criar novo grupo</q-item-label
            >
          </q-item>
          <q-scroll-area
            :bar-style="{
              right: '2px',
              borderRadius: '4.5px',
              backgroundColor: '#027be3',
              width: '4.5px',
              opacity: 0.2,
            }"
            :thumb-style="{
              right: '2px',
              borderRadius: '4.5px',
              backgroundColor: '#027be3',
              width: '5px',
              opacity: 0.75,
            }"
            class="tw-h-96"
          >
            <q-item
              v-for="(value, index) in groups"
              :key="index"
              clickable
              class="shadow-2 tw-mb-2"
              @click="alterGroup(value)"
            >
              <q-item-section>
                <q-item-label>{{ value.group.name }}</q-item-label>
                <q-item-label caption>Você é: {{ value.role }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-scroll-area>
        </q-list>
      </div>
    </div>
    <q-separator vertical inset />
    <div class="col-5">
      <transition>
        <div v-if="groupSelected === null && !isCreateGroup" key="2">
          <p class="tw-text-center tw-text-xl">
            Nenhum grupo ou ação selecionados
          </p>
        </div>
      </transition>
      <Transition name="fade">
        <keep-alive key="0">
          <CreateGroupComponent
            v-if="isCreateGroup"
            @close-create-group="() => (isCreateGroup = false)"
          />
          <InfoGroupComponent
            v-else-if="groupSelected !== null"
            :user-on-group="groupSelected"
            @info-close="groupSelected = null"
          />
        </keep-alive>
      </Transition>
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
import CreateGroupComponent from 'components/IndexPage/CreateGroupComponent.vue';

export default defineComponent({
  name: 'IndexPage',

  components: {
    CreateGroupComponent,
    InfoGroupComponent,
  },

  data() {
    const groups: UsersOnGroups[] = [];
    const groupSelected: UsersOnGroups | null = null;
    return {
      userStore: useUserStore().user,
      groups,
      groupSelected,
      isCreateGroup: false,
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
    alterGroup(value: UsersOnGroups) {
      this.groupSelected = value;
      this.transitionGroup = true;
      this.isCreateGroup = false;
      setTimeout(() => {
        this.transitionGroup = false;
      }, 500);
    },
  },

  mounted() {
    this.getGroups();
    this.$eventEmitter.on('created-group', () => {
      this.getGroups();
    });
  },
});
</script>
