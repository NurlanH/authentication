import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppRepository } from './app.repository';
import { CreateUserEvent } from './create-user.event';
import { SignInDTO, SignUpDTO } from './dto';
import { IUser } from './interfaces';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly authService: AuthService,
  ) {}

  public async getAllUsers(
    limit_: string,
    page_: string,
    search_: string,
  ): Promise<IUser[]> {
    const limit = limit_ ? Number(limit_) : 10;
    const page = page_ ? Number(page_) : 0;
    const search = search_ ? search_.toLowerCase() : '';
    return await this.appRepository.getAllUsers(limit, page, search);
  }

  public async signIn(signIn: SignInDTO): Promise<IUser | any> {
    // Checking user has on db
    const user = await this._findUserByEmail(signIn.email);

    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }

    // Comparing user password with sended password
    const isPasswordCorrect = await this._comparePassword(
      signIn.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return {
        status: false,
        message: 'email or password is wrong',
      };
    }

    const access_token = await this.authService.generateJwt(user);

    return access_token;
  }

  public async signUp(user: SignUpDTO): Promise<IUser | any> {
    const hasEmailInDb = await this._findUserByEmail(user.email);

    if (hasEmailInDb) {
      return {
        status: false,
        message: 'User already exists',
      };
    }

    user.password = this._hashPassword(user.password);

    const newUser: IUser = await this._createUser(user);

    return newUser;
  }

  public async getUserByEmail(signIn: SignInDTO): Promise<IUser | any> {
    const user = await this._findUserByEmail(signIn.email);

    if (user) {
      return {
        status: false,
        message: 'User not found exists',
      };
    }

    user.password = this._hashPassword(user.password);

    const newUser = await this._createUser(user);

    return newUser;
  }

  public async validateUser(access_token: string): Promise<boolean> {
    const { user } = await this.authService.verify(access_token);
    const isUserValid = await this._findUserByEmail(user.email);

    if (isUserValid && !isUserValid.isDeleted) {
      return user;
    } else {
      return false;
    }
  }

  public async payOrder(body: any): Promise<boolean> {
    const { userId, price } = body;
    const user = await this._findUserById(userId);
    if (user.balance > 0) {
      if ((user.balance - price ) > 0) {
        const newBalance = Number((user.balance - price).toFixed(2));

        await this._updateUserBalance(userId, newBalance);

        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private async _createUser(user: IUser): Promise<IUser> {
    return await this.appRepository.createUser(user);
  }

  private _hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  private async _comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async _findUserByEmail(email: string): Promise<IUser> {
    return await this.appRepository.getUserByEmail(email);
  }

  private async _findUserById(id: string): Promise<IUser> {
    return await this.appRepository.getUserById(id);
  }

  private async _updateUserBalance(
    id: string,
    balance: number,
  ): Promise<IUser> {
    return await this.appRepository.updateUserBalance(id, balance);
  }
}
