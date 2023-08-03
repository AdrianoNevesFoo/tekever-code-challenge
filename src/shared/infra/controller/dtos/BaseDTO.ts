import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsArray, IsNumber, IsObject, IsString } from "class-validator";

export class InvalidCredentialsResponseDTO {
  @ApiProperty({ example: 403, description: "HTTP response status" })
  @IsNumber()
  @ApiPropertyOptional()
  status: number;

  @ApiProperty({
    example: "2023-07-17T13:13:20.166Z",
    description: "response timestamp",
  })
  @IsString()
  @ApiPropertyOptional()
  timestamp: string;

  @ApiProperty({
    example: "/some-route",
    description: "endpoint route where the error occurred",
  })
  @IsString()
  @ApiPropertyOptional()
  path: string;

  @ApiProperty({
    example: { message: "Unauthorized", statusCode: 401 },
    description: "api errors array lower level",
  })
  @IsArray()
  @ApiPropertyOptional()
  errors: [];

  @ApiProperty({
    example:
      "Unauthorized user. This resource is only available to authorized users!.",
    description: "fiendly message",
  })
  @IsString()
  @ApiPropertyOptional()
  friendlyMessage: string;
}

export class UnexpecteErrorDTO {
  @ApiProperty({ example: 500, description: "HTTP response status" })
  @IsNumber()
  @ApiPropertyOptional()
  status: number;

  @ApiProperty({
    example: "2023-07-17T13:13:20.166Z",
    description: "response timestamp",
  })
  @IsString()
  @ApiPropertyOptional()
  timestamp: string;

  @ApiProperty({
    example: "/some-route",
    description: "endpoint route where the error occurred",
  })
  @IsString()
  @ApiPropertyOptional()
  path: string;

  @ApiProperty({
    example: { stackTrace: {} },
    description: "api errors array lower level",
  })
  @IsArray()
  @ApiPropertyOptional()
  errors: [];

  @ApiProperty({
    example: "Oops, an unexpected error occurred! Try again later.",
    description: "fiendly message",
  })
  @IsString()
  @ApiPropertyOptional()
  friendlyMessage: string;
}

export class MetaPaginateResponseDTO {
  @ApiProperty({
    example: 10,
    description: "Amount of found in current page",
  })
  @IsNumber()
  itemCount: number;

  @ApiProperty({ example: 5000, description: "Total number of itens found" })
  @IsNumber()
  totalItems: number;

  @ApiProperty({ example: 10, description: "Amount of itens per page" })
  @IsNumber()
  itemsPerPage: number;

  @ApiProperty({ example: 500, description: "Total amount of pages" })
  @IsNumber()
  totalPages: number;

  @ApiProperty({ example: 1, description: "Current Page" })
  @IsNumber()
  currentPage: number;
}
export class PaginateResponseDTO {
  @ApiProperty({
    description: "Current page itens",
    example: [{}],
  })
  @IsObject()
  items: any[];

  @ApiProperty({
    description: "Pagination meta data",
    type: MetaPaginateResponseDTO,
  })
  @IsObject()
  meta: MetaPaginateResponseDTO;
}

export class FindBaseResponseDTO {}
