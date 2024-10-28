import UsersOnGroups from 'src/classes/UsersOnGroups.ts';
import Todo from 'src/classes/Todo.ts';
import TUsersOnGroups from 'src/classes/types/TUsersOnGroups.ts';
import TTodo from 'src/classes/types/TTodo.ts';

type TUser = {
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  groups?: UsersOnGroups[] | TUsersOnGroups[] | undefined;
  todos?: Todo[] | TTodo[] | undefined;
};

export default TUser;
