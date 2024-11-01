import { boot } from 'quasar/wrappers';
import mitt, { Emitter } from 'mitt';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $eventEmitter: Emitter<Record<string | symbol, unknown>>;
  }
}

const eventEmitter: Emitter<Record<string | symbol, unknown>> = mitt();

export default boot(({ app }) => {
  app.config.globalProperties.$eventEmitter = eventEmitter;
});

export { eventEmitter };
