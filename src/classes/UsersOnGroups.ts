import Group from 'src/classes/Group';
import RoleUsersOnGroups from 'src/classes/enums/RoleUsersOnGroups.ts';
import TUsersOnGroups from 'src/classes/types/TUsersOnGroups.ts';
import User from 'src/classes/User.ts';
import TUser from 'src/classes/types/TUser.ts';
import TGroup from 'src/classes/types/TGroup.ts';

export default class UsersOnGroups implements TUsersOnGroups {
  private readonly _role: RoleUsersOnGroups;
  private readonly _group: Group | null | TGroup;
  private readonly _user: User | null | TUser;

  constructor(data: TUsersOnGroups) {
    this._role = data.role;
    this._group = data.group ?? null;
    this._user = data.user ?? null;
  }

  get role(): string {
    let role: string = '';
    if (this._role === RoleUsersOnGroups.admin) {
      role = 'Administrador';
    } else if (this._role === RoleUsersOnGroups.user) {
      role = 'Usuário';
    } else if (this._role === RoleUsersOnGroups.guest) {
      role = 'Visitante';
    }
    return role;
  }
  get group(): Group | TGroup {
    return this._group;
  }
  get user(): User | TUser {
    return this._user;
  }
}
