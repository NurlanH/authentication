import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class QueryDTO {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  limit:string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  page:string
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search:string
}