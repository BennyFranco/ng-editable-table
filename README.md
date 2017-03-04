# ng-editable-table

[![Build Status][travis-badge]][travis-badge-url]
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]
[![npm][npm-badge]][npm-badge-url]


This is a dynamic table for angular, you can add, edit or delete rows.

## Install

You can get it on npm:

`npm install ng-editable-table --save`


## Setup

You'll need to add `EditableTableModule` to your application module.

```typescript
import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';

    @NgModule({
      imports: [
        EditableTableModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [],
      bootstrap: [AppComponent]

      export class AppModule {}
})
```

## Usage
You need to create some arrays for haders and rows to use the `ng-editable-table` directive

```typescript
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tableHeaders = ['Header 1', 'Header 2', 'Header 3'];
  tableRows = [
    ['Cell', 'Cell', 'Cell'],
    ['Cell', 'Cell', 'Cell'],
    ['Cell', 'Cell', 'Cell']
  ];

    constructor() {}

  ...
}
```

And finally add this directive to your html:

```html
<nv-editable-table [table-headers]="tableHeaders" [table-rows]="tableRows" ></nv-editable-table>
```

## Directive Options

You can customize the table options by the `nv-editable-table` directive, the available options are:

|       Option      | Value                  | Description                                    |
| ----------------- |------------------------|------------------------------------------------|
| table-headers     | string Array           | An array of strings with headers name          |
| table-rows        | Array of string Arrays | An array of string arrays with the rows content|
| can-delete-rows   | true/false             | Enable or disable delete rows button           |
| can-edit-rows     | true/false             | Enable or disable edit rows button             |
| can-add-rows      | true/false             | Enable or disable add rows button              |

### Example
```html
  <nv-editable-table 
    [table-headers]="tableHeaders" 
    [table-rows]="tableRows"
    [can-delete-rows]="true"
    [can-edit-rows]="false"
    [can-add-rows]="true">
  </nv-editable-table>
```

[travis-badge]: https://travis-ci.org/BennyFranco/ng-editable-table.svg?branch=master
[travis-badge-url]: https://travis-ci.org/BennyFranco/ng-editable-table
[david-badge]: https://david-dm.org/BennyFranco/ng-editable-table.svg
[david-badge-url]: https://david-dm.org/BennyFranco/ng-editable-table
[david-dev-badge]: https://david-dm.org/BennyFranco/ng-editable-table/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/BennyFranco/ng-editable-table?type=dev
[npm-badge]: https://img.shields.io/badge/npm-v0.0.2-brightgreen.svg
[npm-badge-url]: https://www.npmjs.com/package/ng-editable-table