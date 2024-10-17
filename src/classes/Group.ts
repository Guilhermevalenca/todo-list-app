import User from 'src/classes/User';

export default class Group {
  private _id: number;
  private _name: string;
  private _description: string;
  private _users: User[] | undefined;
}
