import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { SignInDTO, SignUpDTO } from './dto';
import { IUser } from './interfaces';

@Injectable()
export class AppService {

  constructor(
    private readonly appRepository:AppRepository
  ){}


  public async getAllUsers(limit_:string, page_:string, search_:string): Promise<IUser[]> {
    
    const limit = limit_ ? Number(limit_) : 10;
    const page = page_ ? Number(page_) : 0;
    const search = search_ ? search_.toLowerCase() : '';
    
    return await this.appRepository.getAllUsers(limit, page, search);
  }

  public async signIn(user:SignInDTO):Promise<IUser>{
    
    return user;
  }


  public async signUp(user:SignUpDTO):Promise<IUser>{

    return user;
  }

  private async _findUserByEmail(email:string):Promise<IUser>{

    return 
  }

  private async _findUserByPhone(phone:string):Promise<IUser>{

    return
  }

  private async _comparePassword(email:string):Promise<IUser>{

    return
  }
}
