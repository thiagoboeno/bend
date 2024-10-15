# Bend

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
<!--   ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) -->
<!--   ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) -->

Bend é um sistema/interface de rede social, incluido sistema de (des)seguir. postagens, chat e etc, feito com Express.js e React


## Instalação

Tenha o [Node.js](https://nodejs.org/en/) e o [Npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) instalados.

Com os demais instalados, as dependencias do `package.json` precisam ser instaladas a partir do commando:

``` bash
# instalando as dependências
$ yarn

# Executando/compilando o projeto (localhost:8080)
$ yarn serve

# Buildando o projeto e minificando para produção
$ yarn build
````


### Implementado:
- Sistema de register/login básicos
- Crud dos posts, like e dislike, timeline ordenada por mais recente ao mais antigo
- Sistema de seguir e desseguir usuários
- Models de User, Post, Conversation e Message (MongoDB)
- Sistema de chat realtime com socket.io
- Autenticação com JWT
- Sistema de redefinição de senha

### A ser implementado:
- Notificações ao usuário ser seguido ou ter um post curtido
- Design do sistema de profile do usuario, para editar as informações
