import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDataURI,
  IsDate,
  IsDateString,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { CreateTvShowResponseDTO } from "./TvShowDTO";

export class CreateActorDTO {
  @ApiProperty({ description: "Actor name", example: "Steve Carell" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Actor age", example: 60 })
  @IsNumber()
  age: number;

  @ApiProperty({ description: "Actor birthdate", example: "1962-08-16" })
  @IsDateString()
  birthDate: Date;

  @ApiProperty({ description: "Actor country", example: "United States" })
  @IsString()
  country: string;

  @ApiProperty({
    description: "All tv shows starred by the actor.",
    example: ["64cba0b372b369ef9efa6e42", "64cba0b372b369ef9efa2e33"],
  })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  tvShows?: string[];
}

export class CreateActorResponseDTO extends CreateActorDTO {
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

export class ActorsOnTvShowsDTO {
  @ApiProperty({
    description: "Tv Show starred by the actor",
    type: CreateTvShowResponseDTO,
  })
  @IsObject()
  tvShow: CreateTvShowResponseDTO;
}

export class ActorDetailsResponseDTO extends CreateActorResponseDTO {
  @ApiProperty({
    description: "All Tv Show starred by the actor",
    type: [ActorsOnTvShowsDTO],
  })
  @IsObject()
  actorsOnTvShows: ActorsOnTvShowsDTO[];
}
