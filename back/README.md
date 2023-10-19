# First initilization

### Install different librairies
npm i

### Initialize database
npx sequelize-cli db:create
npx sequelize-cli db:migrate

### Generate fake datas
npx sequelize-cli db:seed:all

# Delete fake datas
npx sequelize-cli db:seed:undo:all

### Start node server
npm run dev