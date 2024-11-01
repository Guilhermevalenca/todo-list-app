import User from 'src/classes/User';
import Todo from 'src/classes/Todo.ts';
import TGroup from 'src/classes/types/TGroup.ts';
import TUser from 'src/classes/types/TUser.ts';
import ICrud from 'src/classes/interface/ICrud.ts';
import { api } from 'boot/axios.ts';

export default class Group implements TGroup, ICrud {
  private readonly _id: number | undefined;
  private _name: string;
  private _description: string;
  private _users: User[] | TUser[] = [];
  private _todos: Todo[] | TUser[] = [];

  public constructor(data: TGroup) {
    this._id = data?.id;
    this._name = data?.name;
    this._description = data?.description ?? '';
    this._users = data?.users ?? [];
    this._todos = data?.todos ?? [];
  }

  get id(): number | undefined {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get users(): User[] {
    return this._users;
  }
  get todos(): Todo[] {
    return this._todos;
  }

  set name(value: string) {
    this._name = value;
  }
  set description(value: string) {
    this._description = value;
  }
  set users(value: User[] | TUser[]) {
    this._users = value;
  }
  set todos(value: Todo[] | TUser[]) {
    this._todos = value;
  }

  public async create() {
    const data: TGroup = {
      name: this._name,
      description: this._description,
    };

    return api.post('groups', data);
  }
  public async update() {
    const data: TGroup = {
      name: this._name,
      description: this._description,
    };

    return api.put('groups/' + Number(this._id), data);
  }
  public async delete() {
    return api.delete('groups/' + Number(this._id));
  }
}
