import { CacheModule, Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ConfigModule } from "@nestjs/config";
import { ClsModule } from "nestjs-cls";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from "nest-keycloak-connect";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AllExceptionsFilter } from "./shared/core/filters/AllExceptions.filter";
import { CoreModule } from "./modules/core/core.module";
import * as redisStore from "cache-manager-redis-store";

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: 6379,
    }),
    ConfigModule.forRoot({
      envFilePath: !ENV ? ".env.dev" : `.${ENV}.env`,
    }),
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENTID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      cookieKey: "KEYCLOAK_JWT",
      realmPublicKey: process.env.KEYCLOAK_REALM_PUBLIC_KEY,
      tokenValidation: TokenValidation.OFFLINE,
      useNestLogger: false,
    }),
    EventEmitterModule.forRoot(),
    ClsModule.register({
      global: true,
      middleware: { mount: true },
    }),
    JwtModule.register({
      publicKey: process.env.KEYCLOAK_REALM_PUBLIC_KEY,
    }),
    AuthModule,
    CoreModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
