import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { IGetTokenDTO } from "../../infra/dtos/AccessTokenDTO";

import { AccessTokenProvider } from "../providers/AccessToken.provider";

@Injectable()
export class GetTokenUseCase implements IUseCase<IGetTokenDTO, any> {
  constructor(
    @Inject(AccessTokenProvider)
    private accessTokenProvider: AccessTokenProvider
  ) {}

  async execute(dto: IGetTokenDTO) {
    return await this.accessTokenProvider.token({
      username: dto.username,
      password: dto.password,
    });
  }
}
