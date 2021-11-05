# Bend

  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
<!--   ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) -->
<!--   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) -->
<!--   ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) -->
<!--   ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) -->
<!--   ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) -->

Bend é um sistema/interface de rede social, incluido sistema de seguir/desseguir. postagens, chat e etc, feito com Express.js



## Installation

Tenha o [Node.js](https://nodejs.org/en/) e o [Npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) instalados.

Com os demais instalados a dependencias do `package.json` precisam ser instaladas a partir do commando

#### NPM
```bash
$ npm install
```

#### YARN
```bash
$ yarn
```



### Implementado:
- Sistema de register/login básicos
- Crud dos posts, like e dislike, timeline ordenada por mais recente ao mais antigo
- Sistema de seguir e desseguir usuários
- Models de User e Post (MongoDB)

### A ser implementado:
- Sistema de chat relatime com socket.io
- Listagem dos posts relativo ao usuário (timeline do perfil selecionado)
- Autenticação com JWT ou oAuth
- Notificações ao usuário ser seguido ou ter um post curtido
