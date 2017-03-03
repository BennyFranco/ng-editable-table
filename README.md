# ng2-template

This is a library template to create modules and libraries who can be used into an angular-cli project by npm command install, using a repository
based on git or using the npm repository.

## Building to Deploy

To build the library to be used in another angular-cli project use:

`npm run build`

automatically will create a folder named ng2-template inside the root folder.


# Structure of project

If you don't want to use this template, you can configure your own angular-cli
project to be compiled with the right format.

## Dependencies

You must install some dependencies before start to work.
* [ngm-cli](https://www.npmjs.com/package/ngm-cli) is the way to manage and compile your submodules, install it using:
`npm install -g ngm-cli`

## Configuration
Into your source directory (app or src/app) you must create an index.ts, package.json and tsconfig.json.

### **index.ts**
Here you must export your accesible (public) angular modules and componentes, for example:

```typescript
    export * from './library/library.component';
    export * from './library/library.module';
    ...
````

### **package.json**
This file include the necesary dependencies for your project, the ngm have an example like:

````
{
  "name": "ng2-template",
  "version": "0.0.1",
  "dependencies": {
    "moment": "*"
  },
  "peerDependencies": {
    "@angular/common": "*",
    "@angular/compiler": "*",
    "@angular/core": "*",
    "@angular/forms": "*"
  }
}

````

for mor information about this, see the [ngm docs](https://github.com/valor-software/npm-submodules/tree/master/src/ngm)

### **tsconfig.json**
This is the typescript transpiler configuration, you must create one for your module, and here is an example:

````
{
  "compilerOptions": {
    "outDir": "../../ng2-template",
    "baseUrl": "./app",
    "target": "es5",
    "module": "es6",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "inlineSources": true,
    "noEmitHelpers": false,
    "noImplicitAny": true,
    "declaration": true,
    "skipLibCheck": false,
    "stripInternal": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "lib": ["dom", "es6"],
    "types": [
      "jasmine",
      "../node_modules/@types/node"
    ]
  },
  "exclude": [
    "node_modules"
  ],
  "angularCompilerOptions": {
    "genDir": "../temp/factories",
    "strictMetadataEmit": true,
    "skipTemplateCodegen": true,
    
    "entryModule": "app/library/library.module#LibraryModule"
  }
}

````
it's so important specify your **entryModule** in the configuration.

### **Modifying the angular-cli.json**
Finally you must add your module to the **angular-cli.json** file:
````
  "module":[{
    "name": "ng2-template",
    "root": "src",
    "outDir": "dist",
    "main":"index.ts",
    "tsconfig": "tsconfig.json"
  }]
````

# Limits
Currently you can't use relative template files like .html or .css, you must use
multiline templates:

````typescript
  @Component({
      selector: 'app-library',
      template: `<p>library works!</p>`
  })
  export class LibraryComponent implements OnInit {

    constructor() { }

    ngOnInit() {}
  }

````

# Testing and Development

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26. 
If you want to test your code, only use angular-cli commands to run, build and test.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.