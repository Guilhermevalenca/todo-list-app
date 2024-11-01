import { AxiosResponse } from 'axios';

export default interface ICrud {
  read?: Promise<AxiosResponse>;
  create: Promise<AxiosResponse>;
  update: Promise<AxiosResponse>;
  delete: Promise<AxiosResponse>;
}
