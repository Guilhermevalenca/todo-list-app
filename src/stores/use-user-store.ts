import { defineStore } from 'pinia';
import User from 'src/classes/User.ts';

export default defineStore('user', {
  state: () => ({
    user: new User({}, true),
  }),
});
