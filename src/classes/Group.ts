import User from 'src/classes/User';
import Todo from 'src/classes/Todo.ts';
import TGroup from 'src/classes/types/TGroup.ts';
import TUser from 'src/classes/types/TUser.ts';

export default class Group implements TGroup {
  private readonly _id: number | undefined;
  private _name: string;
  private _description: string;
  private _users: User[] | TUser[] = [];
  private readonly _todos: Todo[] | TUser[] = [];

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
}
