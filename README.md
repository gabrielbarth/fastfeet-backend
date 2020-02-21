<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./logo.png" width="300px" />
</h1>
:us: 
<br>
Backend aplication that allows delivery management. It was developed for GoStack10 bootcamp challanges 02 and 03.
<br>
<br>
<span>&#x1f1e7;&#x1f1f7;</span>
<br>
Aplicação backend para permitir gestão de encomendas, desenvolvido durante os desafios 02 e 03 do bootcamp GoStack10.

##  :mag_right:    Overview / Visão geral
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

##  :link: Project dependencies / Bibliotecas utilizadas

:ballot_box_with_check: **sucrase**                `// allows super-fast development builds and ES6 import/export modules` <br>
:ballot_box_with_check:**sentry/node**             `// exception handling in production mode` <br>
:ballot_box_with_check: **bcryptjs**             `// generate hash though user password`  <br>
:ballot_box_with_check: **date-fns**          `// node library to handle data` <br>
:ballot_box_with_check: **dotenv**               `// load environment variables in application paths` <br>
:ballot_box_with_check: **express**             `// basically allows create backend application`  <br>
:ballot_box_with_check: **express-async-errors**     `// allows express capture errors that happens inside async functions` <br>
:ballot_box_with_check: **express-handlebars**        `// allows build semantic templates` <br>
:ballot_box_with_check: **jsonwebtoken**           `//  allows generate jwt token for users` <br>
:ballot_box_with_check: **multer**                    `//  allows file uploads in application` <br>
:ballot_box_with_check: **nodemailer**               `// allow easy email sending` <br> 
:ballot_box_with_check: **nodemailer-express-handlebars**   `// allows build semantic templates with nodemailer` <br>
:ballot_box_with_check: **path**       `// provides utilities for working with file and directory paths` <br>
:ballot_box_with_check: **pg**          `// allows use postgrees database` <br>
:ballot_box_with_check: **pg-hstore**       `// allows use postgrees database too` <br>
:ballot_box_with_check: **sequelize**         `// ORM Node.js for SQL databases (postgress in this case)` <br>
:ballot_box_with_check: **youch**              `// pretty error reporting for Node.js` <br>
:ballot_box_with_check: **yup**               `// treat validations ` <br>

Bibliotecas de desenvolvimento utilizadas no projeto: <br>
:ballot_box_with_check: **eslint**             `// analyzes your code to quickly find problems` <br>
:ballot_box_with_check: **nodemon**            `// allows automatically restarting app` <br>
:ballot_box_with_check: **prettier**             `// code formatter (as the name says)` <br>
:ballot_box_with_check: **sequellize-cli**       `// sequelize client - ORM for SQL databases` <br>
:ballot_box_with_check: **sucrase**              `//  allows ES6 import/export modules` <br>

<br>
<br>

<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, por isso é fundamental que ele seja feito com muito empenho!</p>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-02?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app para uma transportadora fictícia, o FastFeet.

Nesse primeiro desafio vamos criar algumas funcionalidades básicas que aprendemos ao longo das aulas até aqui. Esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile, que será utilizada para a **certificação do bootcamp**, então, bora pro código!

### **Um pouco sobre as ferramentas**

Você deverá criar a aplicação do zero utilizando o [Express](https://expressjs.com/), além de precisar configurar as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);

### **Funcionalidades**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

### **1. Autenticação**

Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

Crie um usuário administrador utilizando a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed), essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.

Para criar um seed utilize o comando:

    yarn sequelize seed:generate --name admin-user

No arquivo gerado na pasta `src/database/seeds` adicione o código referente à criação de um usuário administrador:

    const bcrypt = require("bcryptjs");

    module.exports = {
      up: QueryInterface => {
        return QueryInterface.bulkInsert(
          "users",
          [
            {
              name: "Distribuidora FastFeet",
              email: "admin@fastfeet.com",
              password_hash: bcrypt.hashSync("123456", 8),
              created_at: new Date(),
              updated_at: new Date()
            }
          ],
          {}
        );
      },

      down: () => {}
    };

Agora execute:

    yarn sequelize db:seed:all

Agora você tem um usuário na sua base de dados, utilize esse usuário para todos os logins que você fizer.

- A autenticação deve ser feita utilizando JWT.
- Realize a validação dos dados de entrada;

### 2. Gestão de destinatários

Você agora precisa permitir que destinatários sejam mantidos (cadastrados/atualizados) na aplicação, e esses devem ter o **nome** do destinatário e campos de endereço: **rua**, **número**, **complemento**, **estado**, **cidade** e **CEP**.

Utilize uma nova tabela no banco de dados chamada `recipients` para guardar informações do destinatário.

O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação.

O destinatário não pode se autenticar no sistema, ou seja, não possui senha.

## 📅 Entrega

Esse desafio **não precisa ser entregue** e não receberá correção. Além disso, o código fonte **não está disponível** por fazer parte do **desafio final**, que será corrigido para **certificação** do bootcamp. Após concluir o desafio, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.

<br>
<br>

<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 3: FastFeet, continuando a aplicação
</h3>

<h3 align="center">
  :warning: Etapa 2/4 do Desafio Final :warning:
</h3>

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, por isso é fundamental que ele seja feito com muito empenho!</p>

<blockquote align="center">“Faça seu melhor, mas sempre com prazo de entrega”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-03?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-03?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença">Licença</a>
</p>

## :rocket: Sobre o desafio

Durante esse desafio vamos aprimorar a aplicação FastFeet que demos início no desafio anterior implementando funcionalidades que aprendemos durante as aulas até agora. 

### **Funcionalidades do administrador**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para administradores.

### **1. Gestão de entregadores**

Permita que o administrador possa cadastrar entregadores para a plataforma, o entregador deve possuir os seguintes campos:

- id (id do entregador)
- name (nome do entregador);
- avatar_id (foto do entregador);
- email (email do entregador)
- created_at;
- updated_at;

Crie rotas para listagem/cadastro/atualização/remoção de entregadores;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **2. Gestão de encomendas**

Apesar do entregador estar cadastrado, ele não é independente dentro da plataforma, e você deve cadastrar encomendas para os entregadores.

Nessa funcionalidade criaremos um cadastro de encomendas por entregador, a encomenda possui os campos:

- id (id da entrega)
- recipient_id (referência ao destinatário);
- deliveryman_id (referência ao entregador);
- signature_id (referência à uma assinatura do destinatário, que será uma imagem);
- product (nome do produto a ser entregue);
- canceled_at (data de cancelamento, se cancelada);
- start_date (data de retirada do produto);
- end_date (data final da entrega);
- created_at;
- updated_at;

A **data de início** deve ser cadastrada assim que for feita a retirada do produto pelo entregador, e as retiradas só podem ser feitas entre as 08:00 e 18:00h.

A **data de término** da entrega deve ser cadastrada quando o entregador finalizar a entrega:

Os campos **recipient_id** e **deliveryman_id** devem ser cadastrados no momento que for cadastrada a encomenda.

Quando a encomenda é **cadastrada** para um entregador, o entregador recebe um e-mail com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.

Crie rotas para listagem/cadastro/atualização/remoção de encomendas;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **Funcionalidades do entregador**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para os entregadores.

### **1. Visualizar encomendas**

Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuidas a ele, que **não estejam entregues ou canceladas**;

Permita também que ele liste apenas as encomendas que já foram **entregues** por ele, com base em seu ID de cadastro;

Exemplo de requisição: `GET https://fastfeet.com/deliveryman/1/deliveries`

### 2. Alterar status de encomendas

Você deve permitir que o entregador tenha rotas para incluir uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. O entregador só pode fazer **5 retiradas por dia**.

Obs.: Para a funcionalidade de finalizar a entrega, você deverá permitir o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.

### 3. Cadastrar problemas nas entregas

O entregador nem sempre conseguirá entregar as encomendas com sucesso, algumas vezes o destinatário pode estar ausente, ou o próprio entregador poderá ter algum problema com seu veículo na hora de entregar.

A tabela `delivery_problems` deve conter os seguintes campos:

- delivery_id (referência da encomenda);
- description (descrição do problema que o entregador teve);
- created_at;
- updated_at;

Crie uma rota para a distribuidora listar todas as entregas com algum problema;

Crie uma rota para listar todos os problemas de uma encomenda baseado no ID da encomenda.

Exemplo de requisição: `GET https://fastfeet.com/delivery/2/problems`

Crie uma rota para o entregador cadastrar problemas na entrega apenas informando seu ID de cadastro (ID da encomenda no banco de dados);

Exemplo de requisição: `POST https://fastfeet.com/delivery/3/problems`

Crie uma rota para a distribuidora cancelar uma entrega baseado no ID do problema. Esse cancelamento pode acontecer devido a gravidade do problema da entrega, por exemplo, em caso de perda da encomenda.

Exemplo de requisição: `DELETE https://fastfeet.com/problem/1/cancel-delivery`

Quando uma encomenda for cancelada, o entregador deve receber um e-mail informando-o sobre o cancelamento.

## **📅 Entrega**

Esse desafio **não precisa ser entregue** e não receberá correção. Além disso, o código fonte **não está disponível** por fazer parte do **desafio final**, que será corrigido para **certificação** do bootcamp. Após concluir o desafio, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.

## **📝 Licença**

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/LICENSE.md) para mais detalhes.

---

Feito com ♥ by Rocketseat 👋 [Entre na nossa comunidade!](https://discordapp.com/invite/gCRAFhc)

