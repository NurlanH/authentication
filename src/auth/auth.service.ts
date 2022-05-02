import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwt(user: any): Promise<string> {
    return await this.jwtService.signAsync(
      { user },
      { secret: this.configService.get('JWT_SECRET_KEY') },
    );
  }

  async verify(token: string): Promise<any> {
    return await this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
  }
}
