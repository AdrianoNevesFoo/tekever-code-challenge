import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateNewUserDTO {
  @ApiProperty({
    description: "User email",
    example: "teste@email.com",
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "User name",
    example: "Joao da Silva",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "User password",
    example: "abc1234",
  })
  @IsString()
  password: string;
}
