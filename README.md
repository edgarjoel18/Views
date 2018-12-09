# code-for-sf-
Requierements: Node.js, Postgres

1. Fork this repository to your own account
2. Clone your fork from github, i.e.: ```git clone https://github.com/edgarjoel18/Views.git```
3. Change into the repository directory: ```cd Views```
4. Install dependencies: ```npm install```
5. Copy example.env to .env, set your Postgres username and password
6. Create the database: ```node_modules/.bin/sequelize db:create```
7. Run the database migrations: ```node_modules/.bin/sequelize db:migrate```
8. Run the web app: ```npm start```
