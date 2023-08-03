import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { IUseCase } from "src/shared/core/IUseCase";
import { UserProvider } from "../providers/User.provider";
import { ICreateUser } from "src/shared/interfaces/CreateUser.interface";
import AppError from "src/shared/core/errors/AppError";

@Injectable()
export class CreateUserUseCase implements IUseCase<ICreateUser, any> {
  constructor(
    @Inject(UserProvider)
    private userProvider: UserProvider,
    private eventEmitter: EventEmitter2
  ) {}

  async execute(payload: ICreateUser) {
    const foundUser = await this.userProvider.getUserByEmail(payload.email);

    if (foundUser) throw new AppError("User already exists.", 400);

    const userCreated = await this.userProvider.create(payload);
  }
}
