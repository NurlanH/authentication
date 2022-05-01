import { IUser } from "./user";

export interface IAppRepository{
  createUser:(user:IUser) => Promise<IUser>
  getUserByEmail:(email:string) => Promise<IUser>
  getUserByPhone:(phone:string) => Promise<IUser>
  getUserById:(id:string) => Promise<IUser>
  getAllUsers:(limit:number, page:number, search:string) => Promise<IUser[]>
}