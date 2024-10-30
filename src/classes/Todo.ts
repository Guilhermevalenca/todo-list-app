import User from 'src/classes/User';
import TTodo from 'src/classes/types/TTodo.ts';
import StatusTodo from 'src/classes/enums/StatusTodo.ts';
import statusTodo from 'src/classes/enums/StatusTodo.ts';
import TUser from 'src/classes/types/TUser.ts';
import { api } from 'boot/axios.ts';

export default class Todo implements TTodo {
  private readonly _id: number | undefined;
  private _title: string = '';
  private _description: string = '';
  private _status: StatusTodo = statusTodo.notCompleted;
  private _groupId: number | undefined;
  private _users: User[] | TUser[] = [];

  constructor(data: TTodo) {
    this._id = data.id;
    this._title = data.title;
    this._description = data.description;
    this._status = data.status;
    this._groupId = data.groupId;
    this._users = data.users ?? [];
  }

  get id(): number | undefined {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get description(): string {
    return this._description;
  }
  get status(): string {
    let status: string;
    if (this._status === StatusTodo.completed) {
      status = 'Concluído';
    } else if (this._status === StatusTodo.inProgress) {
      status = 'Em progresso';
    } else if (this._status === StatusTodo.notCompleted) {
      status = 'Pendente';
    }
    return status;
  }
  get groupId(): number | undefined {
    return this._groupId;
  }
  get users(): User[] | undefined {
    return this._users;
  }

  set title(value: string) {
    this._title = value;
  }
  set description(value: string) {
    this._description = value;
  }
  set groupId(value: number | undefined) {
    this._groupId = value;
  }
  set status(value: string) {
    if (value === 'Concluído' || value === StatusTodo.completed) {
      this._status = StatusTodo.completed;
    } else if (value === 'Em progresso' || value === StatusTodo.inProgress) {
      this._status = StatusTodo.inProgress;
    } else if (value === 'Pendente' || value === StatusTodo.notCompleted) {
      this._status = StatusTodo.notCompleted;
    }
  }
  set users(users: User[] | TUser[]) {
    if (users.length > 0) {
      this._users = [];
      for (const value: User | TUser of users) {
        const user: User = value instanceof User ? value : new User(value);
        this._users.push(user);
      }
    } else {
      this._users = [];
    }
  }

  public addUser(user: User | TUser) {
    this._users.push(user);
  }

  public removeUser(user: TUser) {
    const index = this._users.findIndex((value: TUser) => value.id === user.id);
    if (index !== -1) {
      this._users.splice(index, 1);
    }
  }

  public resetUsers() {
    this._users = [];
  }

  private getUsersIds(): { id?: number }[] {
    return this._users.map((user: User | TUser) => ({
      id: user?.id,
    }));
  }

  public modifyStatus(value: string) {
    this.status = value;
  }

  public async create() {
    const data = {
      todo: {
        title: this._title,
        description: this._description,
        groupId: this._groupId,
      },
      users: this.getUsersIds(),
    };
    return api.post('todos', data);
  }

  public async update() {
    const data = {
      title: String(this._title),
      description: String(this._description),
      status: String(this._status),
    };

    return api.put('todos/' + Number(this._id), {
      ...data,
    });
  }
}
