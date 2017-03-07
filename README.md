# ng-editable-table

This is a dynamic table for angular, you can add, edit or delete rows without any stylesheet.

[![Build Status][travis-badge]][travis-badge-url]
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]
[![npm][npm-badge]][npm-badge-url]

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

|       Option        | Value                  | Description                                    |
| ------------------- |------------------------|------------------------------------------------|
| table-headers       | String Array           | An array of strings with headers name          |
| table-rows          | Array of string Arrays | An array of string arrays with the rows content|
| can-delete-rows     | true/false             | Enable or disable delete rows button           |
| can-edit-rows       | true/false             | Enable or disable edit rows button             |
| can-add-rows        | true/false             | Enable or disable add rows button              |
| add-button-label    | String                 | String label for add button                    |
| edit-button-label   | String                 | String label for edit button                   |
| save-button-label   | String                 | String label for save button                   |
| delete-button-label | String                 | String label for delete button                 |
| add-icon            | String                 | Icon class for add button                      |
| edit-icon           | String                 | Icon class for edit button                     |
| save-icon           | String                 | Icon class for save button                     |
| delete-icon         | String                 | Icon class for delete button                   |
| add-button-class    | String                 | Add button class                               |
| edit-button-class   | String                 | Edit/save button class                         |
| delete-button-class | String                 | Delete button class                            |
| tr-class            | String                 | Table row class                                |
| td-class            | String                 | Table cell class                               |


### Example
```html
<nv-editable-table [table-headers]="tableHeaders" 
                   [table-rows]="tableRows"  
                   [add-button-label] = "''"
                   [edit-button-label] = "''"
                   [save-button-label] = "''"
                   [delete-button-label] = "''"
                   [add-icon] = "'plus icon'"
                   [edit-icon] = "'edit icon'"
                   [save-icon] = "'checkmark icon'"
                   [delete-icon] = "'remove icon'"
                   [add-button-class] = "'ui compact icon button'"
                   [edit-button-class] = "'ui compact blue icon button'"
                   [delete-button-class] = "'ui compact red icon button'"
                   [can-delete-rows]="true"
                   [can-edit-rows]="false"
                   [can-add-rows]="true"
                   class="ui table">
</nv-editable-table>
```
#### Normal view using Semantic-ui styles
![Normal view][example-image-one]
#### Editing view using Semantic-ui styles
![Editing view][example-image-two]

[travis-badge]: https://travis-ci.org/BennyFranco/ng-editable-table.svg?branch=master
[travis-badge-url]: https://travis-ci.org/BennyFranco/ng-editable-table
[david-badge]: https://david-dm.org/BennyFranco/ng-editable-table.svg
[david-badge-url]: https://david-dm.org/BennyFranco/ng-editable-table
[david-dev-badge]: https://david-dm.org/BennyFranco/ng-editable-table/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/BennyFranco/ng-editable-table?type=dev
[npm-badge]: https://img.shields.io/npm/v/ng-editable-table.svg
[npm-badge-url]: https://www.npmjs.com/package/ng-editable-table
[example-image-one]: https://raw.githubusercontent.com/BennyFranco/ng-editable-table/trunk/src/assets/normal.png
[example-image-two]: https://raw.githubusercontent.com/BennyFranco/ng-editable-table/trunk/src/assets/editing.png
