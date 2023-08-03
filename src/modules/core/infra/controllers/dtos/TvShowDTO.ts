import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  isBoolean,
  IsDate,
  IsDateString,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { CreateActorResponseDTO } from "./ActorDTO";
import { AssociateEpisodeResponseDTO } from "./EpisodeDTO";

export class TvShowEpisodesDTO {
  @ApiProperty({ description: "Episode name", example: "The Fire" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Episode number", example: 4 })
  @IsNumber()
  number: number;

  @ApiProperty({
    description: "Episode description",
    example:
      "A fire in the office leads the employees to evacuate the building. To pass the time, the employees play games and learn more about each other. Jim is revealed to be dating handbag saleswoman Katy Moore, something Pam seems bothered by. Meanwhile, Michael tries to mentor temporary worker Ryan Howard, but discovers that Ryan is more educated than he is. Dwight becomes jealous of the attention that Michael is giving Ryan. At the end of the day, it is determined that Ryan accidentally caused the fire, and Dwight is thrilled.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Episode duration",
    example: 2.3,
  })
  @IsNumber()
  time: number;

  @ApiProperty({
    description: "Season number",
    example: 2,
  })
  @IsNumber()
  season: number;
}

export class CreateTvShowDTO {
  @ApiProperty({ description: "TV Show name", example: "The Office" })
  @IsString()
  name: string;

  @ApiProperty({ description: "TV Show start date", example: "2005-03-24" })
  @IsDateString()
  releaseDate: string;

  @ApiProperty({ description: "Actor birthdate", example: "2013-05-16" })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: "TV Show producer",
    example: "Universal Television",
  })
  @IsString()
  productionCompany: string;

  @ApiProperty({ description: "Country of origin", example: "United States" })
  @IsString()
  country: string;

  @ApiProperty({ description: "TvShow genre", example: "Sitcom" })
  @IsString()
  genre: string;

  @ApiProperty({ description: "Amount of Seasons", example: 9 })
  @IsNumber()
  seasons: number;

  @ApiProperty({
    description: "Id of all Tv Show Actors.",
    example: ["64cba0b372b369ef9efa6e42", "64cba0b372b369ef9efa2e33"],
  })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  actors: string[];

  @ApiProperty({
    description: "All tv shows episodes.",
    example: [
      {
        name: "The Fire",
        number: 4,
        description: "some description",
        time: 1.2,
        season: 2,
      },
    ],
    type: [TvShowEpisodesDTO],
  })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  episodes: TvShowEpisodesDTO[];
}

export class CreateTvShowResponseDTO {
  @ApiProperty({
    description: "Created entity id",
    example: "64cba7aee42f4b4c83fb7e47",
  })
  @IsString()
  id: string;

  @ApiProperty({ description: "Tv Show name", example: "The Office" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Tv show release date", example: "2002-08-17" })
  @IsDateString()
  releaseDate: string;

  @ApiProperty({ description: "Tv show end date", example: "2010-08-17" })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: "TV Show producer",
    example: "Universal Television",
  })
  @IsString()
  productionCompany: string;

  @ApiProperty({ description: "Country of origin", example: "United States" })
  @IsString()
  country: string;

  @ApiProperty({ description: "TvShow genre", example: "Sitcom" })
  @IsString()
  genre: string;

  @ApiProperty({ description: "Amount of Seasons", example: 9 })
  @IsNumber()
  seasons: number;

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

export class TvShowDetailsResponseDTO extends CreateTvShowResponseDTO {
  @ApiProperty({
    description: "Tv Show actors",
    type: [CreateActorResponseDTO],
  })
  @IsArray()
  starring: CreateActorResponseDTO[];

  @ApiProperty({
    description: "Tv Show episodes",
    type: [AssociateEpisodeResponseDTO],
  })
  @IsArray()
  episodes: AssociateEpisodeResponseDTO[];
}
