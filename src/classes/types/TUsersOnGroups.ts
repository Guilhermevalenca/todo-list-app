import RoleUsersOnGroups from 'src/classes/enums/RoleUsersOnGroups.ts';
import Group from 'src/classes/Group.ts';
import User from 'src/classes/User.ts';
import TUser from 'src/classes/types/TUser.ts';
import TGroup from 'src/classes/types/TGroup.ts';

type TUsersOnGroups = {
  role: RoleUsersOnGroups;
  group?: Group | TGroup;
  user?: User | TUser;
};

export default TUsersOnGroups;
