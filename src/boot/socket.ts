import { boot } from 'quasar/wrappers';
import io, { Socket } from 'socket.io-client';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$socket = io(import.meta.env.VITE_SOCKET_URL);
});
