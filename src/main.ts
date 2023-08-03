import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { RedocModule, RedocOptions } from "nestjs-redoc";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./shared/core/filters/AllExceptions.filter";
import { EventEmitter2 } from "@nestjs/event-emitter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false,
  });

  const httpAdapter = app.get(HttpAdapterHost);
  const emitter = app.get<EventEmitter2>(EventEmitter2);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, emitter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // isso faz com que apenas o que estiver no validation pipe chegue na requisição
    })
  );

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "src", "shared", "views"));
  app.setViewEngine("hbs");

  app.setViewEngine("ejs");
  const config = new DocumentBuilder()
    .setTitle("BOILERPLATE-API")
    .setDescription("BOILERPLATE-API documentation.")
    .setVersion("1.0.0")
    .addTag("BOILERPLATE-API")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const redocOptions: RedocOptions = {
    title: "BOILERPLATE-API",
    logo: {
      url: "https://komunic.art.br/wp-content/uploads/2020/03/logo-iveco-site.png",
      altText: "Logo IVECO",
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    noAutoAuth: false,
    theme: {
      colors: {
        main: "#000000",
      },
      baseFont: {
        size: "15px",
      },
      code: {
        fontSize: "13px",
      },
      menu: {
        backgroundColor: "#E9EDEE",
      },
      logo: {
        maxWidth: "150px",
      },
      rightPanel: {
        backgroundColor: "#1F2018",
      },
    },
  };

  await RedocModule.setup("/api/docs", app, document, redocOptions);
  await app.listen(process.env.PORT || 9000);
}
bootstrap();
