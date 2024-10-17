import UsersOnGroups from 'src/classes/UsersOnGroups';
import UsersOnTodos from 'src/classes/UsersOnTodos';

export default class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string | undefined;
  private _groups: UsersOnGroups[] | undefined;
  private _todos: UsersOnTodos[] | undefined;
}
