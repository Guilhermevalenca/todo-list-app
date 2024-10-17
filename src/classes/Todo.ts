export enum statusTodo {
  notCompleted = 'Pendente',
  inProgress = 'Em progresso',
  completed = 'Concluído',
}

export default class Todo {
  private _id: number;
  private _title: string;
  private _description: string;
  private _status: statusTodo;
  private _groupId: number;
}
