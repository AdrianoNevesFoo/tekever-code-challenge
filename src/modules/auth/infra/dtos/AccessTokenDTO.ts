import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class IGetTokenDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: "username",
    example: "example@email.com",
  })
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: "password", example: "password123" })
  password: string;
}

export class TokenResponseDTO {
  @ApiProperty({
    example:
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMc3hQWUlHaHVrcVB1LTVfbE1ldmJJUjlGd0tkbDdPMFFwcnJqTGJZZlJnIn0.eyJleHAiOjE2ODk0NDk2OTIsImlhdCI6MTY4OTQ0OTM5MiwianRpIjoiMjQyMDFlOTktZjliZS00MmY0LWJhYzQtMTJlNjcxNjg0YjE3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1obWwubGJzZGlnaXRhbC5jb20uYnIvcmVhbG1zL1Rlc3RlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImUyNTY2NDY1LTJhMjEtNGUxZi04MWUwLWZjYjkxYThkMTQ4NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlc3RlLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiI5M2QwMTE5Yi1iNjU3LTQ0ODUtYjFkMS0zZjQ5ZWU0MWFiNWYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXRlc3RlIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiOTNkMDExOWItYjY1Ny00NDg1LWIxZDEtM2Y0OWVlNDFhYjVmIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJVc3VhcmlvIFRlc3RlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdGVAZW1haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlVzdWFyaW8iLCJmYW1pbHlfbmFtZSI6IlRlc3RlIiwiZW1haWwiOiJ0ZXN0ZUBlbWFpbC5jb20ifQ.GrJCvCGxOvA7Yl_l-IaPGlXLqMQMUha_wgwg3DoMjET27uEuYBZJ_m_tGbrYZ9gQ27uCqBGnXi2R2m7T4Wdc101yFfr_fKrzO78dFGE_4q8-JEOqGGUq6OQhnAd4yYxGHkcNFfT5tNhOSv4IKZZcVDOHeDsLiMTqLtJRB6fhSYtMUQxZePNrwbsJJVvetKjFEjyNKWzS-3tZKwSSUGxeBymKkqWRpnRt3Rlf6haDr_n2ail9PvFN1_bsJEOzde_MExQG5xm7KMu3oKd2qzWsJPlvnk26ZF6oNi_3ePveAyOVQpnU-KKnlHy-NyZ8N1ytEEDUySHRdHogXxr4SRTZgA",
  })
  @IsString()
  access_token: string;

  @ApiProperty({ example: 300 })
  @IsString()
  expires_in: number;

  @ApiProperty({ example: 1800 })
  @IsString()
  refresh_expires_in: number;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhOWVkNjFlZS1kYzI3LTQyMmYtOGQyNS1hOTVlNjBhYTNiNTEifQ.eyJleHAiOjE2ODk0NTExOTIsImlhdCI6MTY4OTQ0OTM5MiwianRpIjoiOGU1MWYzNTQtNDRkYS00NDIxLWIxMTQtNDdkZTk1NjdmYTgzIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1obWwubGJzZGlnaXRhbC5jb20uYnIvcmVhbG1zL1Rlc3RlIiwiYXVkIjoiaHR0cHM6Ly9rZXljbG9hay1obWwubGJzZGlnaXRhbC5jb20uYnIvcmVhbG1zL1Rlc3RlIiwic3ViIjoiZTI1NjY0NjUtMmEyMS00ZTFmLTgxZTAtZmNiOTFhOGQxNDg0IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6InRlc3RlLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiI5M2QwMTE5Yi1iNjU3LTQ0ODUtYjFkMS0zZjQ5ZWU0MWFiNWYiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiOTNkMDExOWItYjY1Ny00NDg1LWIxZDEtM2Y0OWVlNDFhYjVmIn0.asQX32Ky3pv2R-va84TmC2dfMDlA1zkR4rKm6B30Qac",
  })
  @IsString()
  refresh_token: string;

  @ApiProperty({ example: "Bearer" })
  @IsString()
  token_type: string;

  @ApiProperty({ example: "93d0119b-b657-4485-b1d1-3f49ee41ab5f" })
  @IsString()
  session_state: string;

  @ApiProperty({ example: "openid email profile" })
  @IsString()
  scope: string;
}

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
    example: "/user",
    description: "endpoint route where the error occurred",
  })
  @IsString()
  @ApiPropertyOptional()
  path: string;

  @ApiProperty({
    example: ["Invalid user credentials"],
    description: "api errors array lower level",
  })
  @IsArray()
  @ApiPropertyOptional()
  errors: [];

  @ApiProperty({
    example: "User already exists.",
    description: "fiendly message",
  })
  @IsString()
  @ApiPropertyOptional()
  friendlyMessage: string;
}
