import Todo from 'src/classes/Todo';
import User from 'src/classes/User';

export default class UsersOnTodos {
  private _id: number;
  private _todoId: number;
  private _userId: number;
  private _todos: Todo[] | undefined;
  private _users: User[] | undefined;
}
