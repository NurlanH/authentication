import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator"

export class SignInDTO { 

  @IsNotEmpty()
  @IsEmail()
  email:string
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
  password:string
}