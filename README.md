# Asynchronouschess

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# On Heroku
The project uses the MEAN stack, the app is an Angular Web App with a NodeJS API and a Mongo mLab Heroku sevice.

File `package.json`:
from:
```
"start": "ng serve",
```
to:
```
"start": "node server.js",
```

File `main.ts`, added:
```
import './polyfills.ts';
```

Install libraries and save the dependencies to our package.json file so that they will also be installed when we deploy the application to Heroku:
```
npm install mongodb express body-parser --save
```

When creating a mLab add-on, the database connection URI is stored as a config var accessible in Node.js code as `process.env.MONGODB_URI`.

Item class: MongoDB by default creates an _id ObjectId field for each document that is inserted into the database. 

Install the Angular CLI so that remote Heroku deployment can use it:
```
npm install --save @angular/cli @angular/compiler-cli
```

Added in `package.json`:
```
"postinstall": "ng build --output-path dist"
```

Copy from dev dependencies to dependencies:
```
"@angular/cli": "^8.0.6",
"@angular/compiler-cli": "^8.0.3",
```

## Notes
Note that `ng serve` is serving the node `server.js` API wich is the one exsposing `/dist` folder.


## API
Post an item on the API:
```
Content-Type: application/json
POST https://<project-name>.herokuapp.com/api/item
{"name":"mLab Support","email":"support@mlab.com"}
```

## Dev
```
ng serve --configuration=remote
```

