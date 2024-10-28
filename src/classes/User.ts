import UsersOnGroups from 'src/classes/UsersOnGroups';
import Todo from './Todo';
import TUser from 'src/classes/types/TUser.ts';
import TUsersOnGroups from 'src/classes/types/TUsersOnGroups.ts';
import TTodo from 'src/classes/types/TTodo.ts';
import Instances from 'src/classes/Instances.ts';
import useUserStore from 'stores/use-user-store.ts';

export default class User extends Instances implements TUser {
  private _id: number | undefined;
  private _name: string | undefined;
  private _email: string | undefined;
  private _password: string | undefined;
  private _groups: UsersOnGroups[] | TUsersOnGroups[] | undefined;
  private readonly _todos: Todo[] | TTodo[] | undefined;

  constructor(data: TUser) {
    super();
    this._id = data?.id;
    this._name = data?.name;
    this._email = data?.email;
    this._password = data?.password;
    this._groups = data?.groups;
    this._todos = data?.todos;
  }

  get id(): number | undefined {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get password(): string | undefined {
    return this._password;
  }
  get groups(): UsersOnGroups[] | undefined {
    return this._groups;
  }
  get todos(): Todo[] | undefined {
    return this._todos;
  }

  set id(value: number) {
    this._id = value;
  }
  set name(value: string) {
    this._name = value;
  }
  set email(value: string) {
    this._email = value;
  }
  set password(value: string) {
    this._password = value;
  }
  set groups(value: UsersOnGroups[]) {
    this._groups = value;
  }

  static async createAccount(user: TUser & { confirmationPassword: string }) {
    return this.$axios.post('users', user);
  }

  async login() {
    const data = {
      email: this._email,
      password: this._password,
    };

    return await this.$axios.post('users/login', data).then(({ data }) => {
      localStorage.setItem('token', data.access_token);

      this.$axios.defaults.headers.common['Authorization'] =
        `Bearer ${data.access_token}`;

      this._id = Number(data.id);
      this._name = String(data.name);
      this._email = String(data.email);
      this._password = undefined;
    });
  }

  static async isLogged() {
    return await this.$axios
      .get('users')
      .then(({ data }) => {
        const user = useUserStore().user;
        if (user) {
          user.id = data?.id;
          user.name = data?.name;
          user.email = data?.email;
        }
      })
      .catch(({ response: { status } }) => {
        if (status === 401) {
          localStorage.removeItem('token');
        }
      });
  }
}
