import { boot } from 'quasar/wrappers';
import { QVueGlobals, useQuasar } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $q: QVueGlobals;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$q = useQuasar();
});
