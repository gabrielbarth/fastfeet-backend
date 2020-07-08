<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./logo-green.png" width="300px" />
  <br>
  <br>
  FastFeet Backend
</h1>
:us:
<br>
Backend aplication that allows delivery management. It was developed for GoStack10 bootcamp challanges 02 and 03.
<br>
<br>
<span>&#x1f1e7;&#x1f1f7;</span>
<br>
Aplicação backend para permitir gestão de encomendas, desenvolvido durante os desafios 02 e 03 do bootcamp GoStack10.

## :mag_right: Overview / Visão geral

:us:
<br>
This application allows:

- admins authentication (users who manage the platform);
- create, update and delete recipients, deliverymen and deliveries;
- list deliveries by deliveryman (finished, pending and canceled deliveries);
- images upload for deliveryman avatar and for delivery signature (that proves its execution);
- create and solve (delete) deliveries problems (such as losses, damages, each others).

<span>&#x1f1e7;&#x1f1f7;</span>
<br>
A aplicação permite:

- autenticação de administradores (responsáveis por toda gestão do app);
- cadastro, atualização e remoção de destinatários, entregadores e encomendas;
- listagem de encomendas por entregador (entregas finalizadas, pendentes e canceladas);
- upload de imagens para o usuário e para assinatura de entrega da encomenda;
- cadastro e remoção de problemas com encomendas (como perdas, danos, etc).
  <br>

#### :rocket: See about this challange [here](https://github.com/Rocketseat/bootcamp-gostack-desafio-02)

## :link: Project dependencies / Bibliotecas utilizadas

:heavy_check_mark: [**sucrase**](https://github.com/alangpierce/sucrase) `// allows super-fast development builds and ES6 import/export modules` <br>
:heavy_check_mark: [**sentry/node**](https://docs.sentry.io/platforms/node/) `// exception handling in production mode` <br>
:heavy_check_mark: [**bcryptjs**](https://github.com/dcodeIO/bcrypt.js/)  `// generate hash though user password` <br>
:heavy_check_mark: [**date-fns**](https://date-fns.org/) `// node library to handle data` <br>
:heavy_check_mark: [**dotenv**](https://github.com/motdotla/dotenv) `// load environment variables in application paths` <br>
:heavy_check_mark: [**express**](https://expressjs.com/pt-br/) `// basically allows create backend application` <br>
:heavy_check_mark: [**express-async-errors**](https://www.npmjs.com/package/express-async-errors) `// allows express capture errors that happens inside async functions` <br>
:heavy_check_mark: [**express-handlebars**](https://www.npmjs.com/package/express-handlebars) `// allows build semantic templates` <br>
:heavy_check_mark: [**jsonwebtoken**](https://github.com/auth0/node-jsonwebtoken) `// allows generate jwt token for users` <br>
:heavy_check_mark: [**multer**](https://github.com/expressjs/multer) `// allows file uploads in application` <br>
:heavy_check_mark: [**nodemailer**](https://nodemailer.com/about/) `// allow easy email sending` <br>
:heavy_check_mark: [**nodemailer-express-handlebars**](https://github.com/yads/nodemailer-express-handlebars) `// allows build semantic templates with nodemailer` <br>


:heavy_check_mark: [**path**](https://nodejs.org/api/path.html) `// provides utilities for working with file and directory paths` <br>
:heavy_check_mark: [**pg**](https://node-postgres.com/) `// allows use postgrees database` <br>
:heavy_check_mark: [**pg-hstore**](https://github.com/scarney81/pg-hstore/) `// allows use postgrees database too` <br>
:heavy_check_mark: [**sequelize**](https://sequelize.org/) `// ORM Node.js for SQL databases (postgress in this case)` <br>
:heavy_check_mark: [**youch**](https://github.com/poppinss/youch) `// pretty error reporting for Node.js` <br>
:heavy_check_mark: [**yup**](https://github.com/jquense/yup) `// treats validations` <br>

Bibliotecas de desenvolvimento utilizadas no projeto: <br>
:heavy_check_mark: [**eslint**](https://eslint.org/) `// analyzes your code to quickly find problems` <br>
:heavy_check_mark: [**nodemon**](https://nodemon.io/) `// allows automatically restarting app` <br>
:heavy_check_mark: [**prettier**](https://prettier.io/)  `// sequelize client - ORM for SQL databases` <br>
:heavy_check_mark: [**sequellize-cli**](https://github.com/sequelize/cli) `// code formatter (as the name says)` <br>
:heavy_check_mark: [**sucrase**](https://github.com/alangpierce/sucrase)  `// allows ES6 import/export modules` <br>
<br>

## :computer: Getting Started - Running on your machine

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### :ballot_box_with_check: Prerequisites

This project considers usage of tree databases: [Postgres](https://github.com/postgres/postgres) and [Redis](https://redis.io/). So it was used [Docker](https://www.docker.com/) to simplify the process

```
# Install a Redis image
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine

# Install a Posgres image
docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
(Note: login and password is equals to 'fastfeet')

# Run Redis
docker start redisfastfeet

# Run Postgres
docker start fastfeet
```

### :hammer_and_wrench: Installing

Now follow the bellow steps to run project on your machine:

**1.** Clone this repo using `git clone https://github.com/gabrielbarth/fastfeet-backend.git`. <br />
**2.** Move to the appropriate directory: `cd fastfeet-backend`.<br />
**3.** Run `yarn` to install dependencies.<br />
**4.** Now you need set the required informations on .env file (see the example). <br />
**5.** After that, send the migrations to database: `yarn sequelize db:migrate` and `yarn sequelize db:seed:all`
**6.** Run `yarn queue` and `yarn dev` to run the app on port `http://localhost:3333`.<br/>
**7.** Now you can test using some tool like [Insomnia](https://insomnia.rest/) or even installing [mobile](https://github.com/gabrielbarth/fastfeet-mobile) and [web](https://github.com/gabrielbarth/fastfeet-web) projects.



## :bulb: :handshake: Contributing
Please feel free to contributing and submitting pull requests.


## :pray: Acknowledgments
* Rocketseat team
* Rocketseat community


## :thinking: Any question?

**Contact me on my social medias:**
[LinkedIn](https://www.linkedin.com/in/gabriel-barth-silv%C3%A9rio-6081ba153/) <br>
[Instagram](https://instragram.com/gb1.dev) <br>
[YouTube](https://www.youtube.com/channel/UCmA_19d5L3WTFdDfwQ6Uenw) <br>
[Discord](https://www.wikihow.com/Add-Friends-on-Discord) (**gabrielbarth1#0492**) <br>
<br>
Or send me an email :incoming_envelope:: gabrielbarth.dev@gmail.com.
<br>
<br>
Made with ♥ by [Gabriel Barth](https://gabrielbarth.com)

