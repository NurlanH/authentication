
  
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from 'src/app.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {

    

    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
            passReqToCallback:true
        });
    }

    async validate(payload: any) {
 
        const {user} = payload;
        console.log(user,'salam');
        let verifiedUser = await this.appService.getUserByEmail(user.email);

        if (!verifiedUser) return null;

        return verifiedUser;
    }
}