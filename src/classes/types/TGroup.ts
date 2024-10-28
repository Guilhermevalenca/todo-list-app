import User from 'src/classes/User.ts';
import Todo from 'src/classes/Todo.ts';
import TUser from 'src/classes/types/TUser.ts';
import TTodo from 'src/classes/types/TTodo.ts';

type TGroup = {
  id?: number | undefined;
  name: string;
  description: string | undefined;
  users?: User[] | undefined | TUser[];
  todos?: Todo[] | undefined | TTodo[];
};

export default TGroup;
