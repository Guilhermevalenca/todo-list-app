import { boot } from 'quasar/wrappers';
import mitt, { Emitter } from 'mitt';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $eventEmitter: Emitter;
  }
}

const eventEmitter = mitt();

export default boot(({ app }) => {
  app.config.globalProperties.$eventEmitter = eventEmitter;
});

export { eventEmitter };
