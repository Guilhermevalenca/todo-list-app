import User from 'src/classes/User';
import Group from 'src/classes/Group';

export enum RoleUsersOnGroups {
  admin = 'ADMIN',
  user = 'USER',
  guest = 'GUEST',
}

export default class UsersOnGroups {
  private _userId: number;
  private _groupId: number;
  private _role: RoleUsersOnGroups;
  private _users: User[] | undefined;
  private _groups: Group[] | undefined;
}
