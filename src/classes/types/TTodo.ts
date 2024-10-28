import User from 'src/classes/User.ts';
import StatusTodo from 'src/classes/enums/StatusTodo.ts';
import TUser from 'src/classes/types/TUser.ts';

type TTodo = {
  id?: number | undefined;
  title?: string;
  description?: string;
  status?: StatusTodo;
  groupId?: number | undefined;
  users?: User[] | undefined | TUser[];
};

export default TTodo;
