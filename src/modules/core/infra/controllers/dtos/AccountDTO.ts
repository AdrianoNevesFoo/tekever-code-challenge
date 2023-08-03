import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { AccountTypeEnum } from "src/shared/core/enums/AccountTypeEnum";

export class AccountRequestDTO {
  @ApiProperty({ description: "account name", example: "Fulano de tal" })
  @IsString()
  name: string;

  @ApiProperty({ description: "account email", example: "fulano@email.com" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "account password",
    example: "strongpassword!#%",
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "account type",
    example: "USER",
    enum: AccountTypeEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  accountType?: AccountTypeEnum;
}
