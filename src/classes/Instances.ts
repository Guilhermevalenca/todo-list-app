import { api } from 'boot/axios.ts';
import { socket } from 'boot/socket.ts';

export default class Instances {
  protected $axios = api;
  protected $socket = socket;

  protected static $axios = api;
  protected static $socket = socket;
}
