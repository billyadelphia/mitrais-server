# How to install
Requirement `Node JS version >=10 with NPM`
```
cd project_folder
npm install
cp .env.example .env //Please configure database configuration the .env file
npx sequelize-cli db:migrate
```



# How to run
```
npm run start //start the server
npm run stop //stop the server
npm run logs //to see the server logs
```
