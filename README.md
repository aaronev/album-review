# Vinyl

A community for record enthusiasts to review their favorite albums.

## Getting Started

### Set Up Database
Use the following commands to set up and seed the PSQL database:
```
1. `$ npm run db:create`  : Create PostgreSQL database `vinyl`
2. `$ npm run db:schema`  : Set ups the database tables
3. `$ npm run db:seed`    : Loads the datas for each table
```

### Set Up Server
Use the following commands to set up the server:
```
1. `$ npm install`        : Installs all dependencies
2. `$ npm start`          : Server at http://localhost:3000
```
Once server is running sign up and then sign in.

### Testing
Integration Testing
```
1. `$ npm run test:integration` : Test SQL Injections I/O
```

Run `$ npm run` to see the list of commands available. To see what each command does, look at `package.json`.

The app uses Express file structure, and includes SQL files to set up the schema and import data.

### MVC

```sh
README.md           # you are here
package.json        # npm standard
.eslintrc           # eslint config
```
```sh
src/                # contains developer contents
configurations/     # configurations throughout the codebase
authentication.js   # configured passport authentication
database/           # connection and queries
database.js         # file within database for connections and queries
schema.sql          # shows all the columns of each tables
seed.sql            # seed the ablums, users, and reviews data
domain/             # folder is for abstract functions 
public/             # static folder for image files, css, & browser js
routes/             # folder contains routes for server
views/              # folder renders ejs html template
server.js           # web server
```
```sh
test/               # contains QA content
integration/        # contains integration test files
database.test.js    # test sql injection I/O
```