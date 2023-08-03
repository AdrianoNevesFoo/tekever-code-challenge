import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class AssociateEpisodeDTO {
  @ApiProperty({ description: "Episode name", example: "The fire" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Episode number", example: 4 })
  @IsNumber()
  number: number;

  @ApiProperty({
    description: "Episode description",
    example: "some description",
  })
  @IsString()
  description: string;

  @ApiProperty({ description: "Episode duration", example: 1.2 })
  @IsNumber()
  time: number;

  @ApiProperty({ description: "Episode season", example: 4 })
  @IsNumber()
  season: number;

  @ApiProperty({
    description: "Tv Show id to be associated",
    example: "64cb97daf7dea6187dbac663",
  })
  @IsString()
  showId: string;
}

export class AssociateEpisodeResponseDTO extends AssociateEpisodeDTO {
  @ApiProperty({
    description: "Created entity id",
    example: "64cba7aee42f4b4c83fb7e47",
  })
  @IsString()
  id: string;

  @ApiProperty({ description: "Created entity active status", example: true })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: "Entity created at timestamp",
    example: "2023-08-03T13:12:14.440Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Entity updated at timestamp",
    example: "2023-08-03T13:12:14.440Z",
  })
  @IsDate()
  updatedAt: Date;
}
