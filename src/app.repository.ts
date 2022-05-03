import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IAppRepository, IUser } from './interfaces';
import { UserDocument, Users } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class AppRepository implements IAppRepository {
  constructor(
    @InjectModel(Users.name)
    public readonly userModel: Model<UserDocument | any>,
  ) {}

  public async createUser(user: IUser): Promise<IUser> {
    try {
      return await this.userModel.create(user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    try {
      return await this.userModel.findOne({ email: email }).lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async getUserByPhone(phone: string): Promise<IUser> {
    try {
      return await this.userModel.findOne({ phone: phone }).lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async getUserById(_id: string): Promise<IUser> {
    try {
      return await this.userModel.findById(_id).lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }


  public async updateUserBalance(_id: string, balance:number): Promise<IUser> {
    try {
      return await this.userModel.findByIdAndUpdate({_id:_id},{balance:balance},{new:true});
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  

  public async getAllUsers(
    limit: number,
    page: number,
    search: string,
  ): Promise<IUser[]> {
    try {
      return await this.userModel
        .find()
        .where({
          $or: [
            { fullName: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { merchantType: { $regex: search, $options: 'i' } },
            { ownerName: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } },
          ],
          isDeleted: false,
        })
        .lean()
        .limit(limit)
        .skip(limit * page)
        .sort({ createdAt: -1 });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
