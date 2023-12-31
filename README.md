# TEKEVER-API

Este projeto foi desenvolvido como um teste, com o objetivo de demonstar habilidades para avaliação de conhecimento.

## Linguagem

Este projeto foi desenvolvido em NodeJs, utilizando o framework NestJS.

## Conceitos

A arquitetura aqui desenvolvida foi pensada com base em conceitos latentes do desenvolvimento de código, aplicando padrões de projeto e conceitos fundamentais como: Clean Architecture, DDD, SOLID, entre outros.

## Arquitetura

Na figura abaixo encontra-se um exemplo da arquitetura pensada e desenvolvida para esse desafio.
Aqui encontramos uma arquitetura baseada em micro-serviços, disponibilizando os seguintes serviços:

- Keycloak: serviço de autenticação
- Tekever: api tekever desenvolvida para este desafio.

![Alt text](images/arquitetura.png)

\
 &nbsp;
\
 &nbsp;
\
 &nbsp;
\
 &nbsp;
\
 &nbsp;
\
 &nbsp;

## Domínios da aplicação

A aplicação desenvolvida foi separa em três domínios principais, sendo eles:

- **auth**: domínio responsável por toda a regra de negócio por trás da autenticação e criação de usuários na aplicação. Este domínio conversa diretamente com o Keycloak.
- **core**: nosso domínio principal, responsável pela implementação da maior parte das regras de negócio descritas no documento code challenge.
- **tasks**: módulo responsável pela execução de shchedules. Neste módulo foi implementada uma schedule que realiza o crawler de TvShows a cada 5 minutos do site https://www.episodate.com/api.

### Banco da dados

Para que os serviços aqui apresentados executem corretamente, é necessário o fornecimento do seguinte banco de dados:

- Mysql: banco de dados utilizado para armazenar os dados da aplicação
  \
  &nbsp;
  \
  &nbsp;

## Start da aplicação

### Yarn

Para iniciar o projeto utilziando o yarn, precisamos primeiramente subir os bancos de dados da aplicação. Para isso, execute o docker-compose abaixo exemplificado:

```yml
version: "3"

services:
  mysql:
    container_name: mysql
    image: "mysql/mysql-server:8.0"
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: "root"
      MYSQL_ROOT_HOST: "%"
      MYSQL_DATABASE: "tekever-database"
      MYSQL_USER: "tekever"
      MYSQL_PASSWORD: "password"
      MYSQL_PORT: "3306:3306"
      MYSQL_ALLOW_EMPTY_PASSWORD: 1
    volumes:
      - db:/var/lib/mysql
volumes:
  db:
```

O mesmo docker-compose está presente no arquivo 'database-docker-compose.yml' na raiz do projeto.
Para executar o docker compose, execute o seguinte comando:

```bash
  docker-compose up -d
```

Após subir os bancos de dados, estamos prontos para iniciar o projeto. Para isso, execute os seguintes comandos em sequência, dentro da pasta do projeto:

```bash
  yarn
  yarn build
  yarn migrate-generate
  yarn migrate-push
  yarn start:dev
```

O projeto será servido na porta 9000.

\
&nbsp;
\
&nbsp;

#### Testes

Para executar os testes implementados neste projeto, basta executar o seguinte comando:

```bash
  yarn test:cov
```

### Docker

Para subir a aplicação de uma forma mais simplificada, basta apenas executar o aquivo docker-compose.yml disponibilizado na raiz do projeto. Além de subir os bancos necessários, esse docker-compose vai subir também, um container disponibilizado para a aplicação, servindo o projeto também na porta 9000.

```yml
version: "3"

services:
  mysql:
    container_name: mysql
    image: "mysql/mysql-server:8.0"
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: "root"
      MYSQL_ROOT_HOST: "%"
      MYSQL_DATABASE: "tekever-database"
      MYSQL_USER: "tekever"
      MYSQL_PASSWORD: "password"
      MYSQL_PORT: "3306:3306"
      MYSQL_ALLOW_EMPTY_PASSWORD: 1
    volumes:
      - db:/var/lib/mysql

  tekever-code-challenge:
    container_name: tekever-api
    image: "adrianonevesps/tekever:latest"
    depends_on:
      - mysql
    ports:
      - "9000:9000"
    environment:
      NODE_ENV: hml
      PORT: 9000
      KEYCLOAK_URL: https://tekever-keycloak.labsmaisdigital.com.br
      KEYCLOAK_CLIENTID: tekever-client
      KEYCLOAK_CLIENT_SECRET: TTmRJZvRSfPN408cq1D8aBvMVyXNQHZX
      KEYCLOAK_MASTER_USERNAME: admin
      KEYCLOAK_MASTER_PASSWORD: tekever
      KEYCLOAK_MASTER_CLIENT_ID: admin-cli
      KEYCLOAK_REALM: tekever
      KEYCLOAK_REALM_PUBLIC_KEY: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvW/DPY8s/kGfToR/YNc/50GxPWYmUZkjGy719XVFkGL42H3eXl7iBiXRRtFyhSuIe8w/knnqxJUylD5a5xeAWTDsY7GcCQLZDQ+QbvoheEjmmeibgW1TRpMexRuE+074dDvgYjl8sntwOBre77jdOzO4D0qteJ2PzwyaowVzJbK3NPRJrHSvZDtLUoB23nBn75zq8JntuWNGSk7Zddf5EeKljvbJe9V84UFTnyU/2PUg0r819TpNI4QMCe3rylY//g01PNvPOve267ahrLp7McH9Rl9roKPx7OqaRx6TszX8VZqXQAyDpXBOPeXuvRwkkWrTSn2HdsbJ1XBqvGSVFQIDAQAB
      DATABASE_URL: "mysql://root:root@mysql:3306/tekever-database?schema=public"
volumes:
  db:
```

### Swagger

Após subir a aplicação, é possível visualizar a documentação swagger do projeto através do link:

```
  localhost:9000/api/docs
```

## Keycloak

O Keycloak é um software open source de gerenciamento de identidade e acesso voltado para WebApps e RESTful web services.

O Keycloak usa padrões de protocolo aberto como OpenID Connect ou SAML 2.0 para proteger suas aplicações.

Para simplificar o teste desse projeto, foi disponibilizado um keycloak previamente configurado e testado, simplificando o processo de start da aplicação.
Todos os dados necessários do keycloak estão presentes no arquivo .env, na raiz do projeto:

```yml
KEYCLOAK_URL=https://tekever-keycloak.labsmaisdigital.com.br
KEYCLOAK_CLIENTID=tekever-client
KEYCLOAK_CLIENT_SECRET=TTmRJZvRSfPN408cq1D8aBvMVyXNQHZX
KEYCLOAK_MASTER_USERNAME=admin
KEYCLOAK_MASTER_PASSWORD=tekever
KEYCLOAK_MASTER_CLIENT_ID=admin-cli
KEYCLOAK_REALM=tekever
KEYCLOAK_REALM_PUBLIC_KEY=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvW/DPY8s/kGfToR/YNc/50GxPWYmUZkjGy719XVFkGL42H3eXl7iBiXRRtFyhSuIe8w/knnqxJUylD5a5xeAWTDsY7GcCQLZDQ+QbvoheEjmmeibgW1TRpMexRuE+074dDvgYjl8sntwOBre77jdOzO4D0qteJ2PzwyaowVzJbK3NPRJrHSvZDtLUoB23nBn75zq8JntuWNGSk7Zddf5EeKljvbJe9V84UFTnyU/2PUg0r819TpNI4QMCe3rylY//g01PNvPOve267ahrLp7McH9Rl9roKPx7OqaRx6TszX8VZqXQAyDpXBOPeXuvRwkkWrTSn2HdsbJ1XBqvGSVFQIDAQAB
```

Caso deseje subir uma instância do Keycloak localmente, basta executar o docker-compose descrito abaixo:

```yml
version: "3"

services:
  keycloak:
    image: quay.io/keycloak/keycloak:18.0.2
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: tekever
      KC_PROXY: edge
    ports:
      - 9002:8080
    command: start-dev
```

## Relations (Filtros)

É possível aplicar filtros em cima dos endpoints fornecidos pela aplicação, para isso, basta passar o 'query param' **relations** em qualquer requisição do tipo GET, informando o tipo de filtro que deseja realizar. Por exemplo, caso queira trazer todos os TvShows onde o gênero seja igual a Sicom, basta realizar a requisição com os seguites 'query params':

```
limit           10
page            0
relations       {"where": {"genre": "Sitcom"}}
```

Abaixo, o exemplo da utilização do parametro **relations** no insomnia:

![Alt text](images/relations.png)

O parâmetro **relations** só pode ser utilizado nos métodos /paginate e /findAll de qualquer recurso.

## OrderBy

Assim como o parâmetro relations, é possível ordernar os recursos pesquisados pela rota /paginate através do parâmetro **orderBy**, assim como demonstrado na imagem abaixo:

```
limit           10
page            0
orderBy         {"orderBy": {"name": "desc"}}
```

Abaixo, o exemplo da utilização do parametro **orderBy** no insomnia:

![Alt text](images/orderby.png)

O parâmetro **orderBy** só pode ser utilizado no método /paginate de qualquer recurso.
