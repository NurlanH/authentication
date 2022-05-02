import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator"
import { MerchantType } from "src/enums"

export class SignUpDTO{

  // It is checked whether the type of merchant corresponds to the two types we have [Seller or Buyer]
  @IsNotEmpty()
  @IsEnum(MerchantType)
  merchantType:string
  
  @IsNotEmpty()
  @IsString()
  fullName:string

  @IsNotEmpty()
  @IsString()
  ownerName:string

  @IsNotEmpty()
  @IsString()
  address:string

  // The telephone number is checked for compliance with the Azerbaijani standard
  @IsNotEmpty()
  @IsString()
  @Matches(/^(994)(50|51|77|70|55|99|60)[0-9]{3}[0-9]{2}[0-9]{2}$/)
  phone:string


  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
  password:string
}