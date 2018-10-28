# code-for-sf-
Requierements: Node.js, Postgres

1.Fork this repository to your own account 
2.Clone the repository from github: git clone 3.https://github.com/sitdikovaaliia/code-for-sf-.git
4.Change into the repository directory: cd code-for-sf-
5.Install dependencies: npm install
6.Modify config/config.json for your Postgres installation (username, password)
7.Create the database: node_modules/.bin/sequelize db:create
Run the database migrations: node_modules/.bin/sequelize db:migrate
Run the web app: npm start