# ng-editable-table

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
You need to create some TableCells and TableRows objects to use the `ng-editable-table` directive

```typescript
import { TableRow } from 'ng-editable-table/util/table-row';
import { TableCell } from 'ng-editable-table/util/table-cell';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    tableHeaders: TableCell[] = [];
    tableCells: TableCell[] = [];
    tableCells2: TableCell[] = [];
    tableRows: TableRow[] = [];

    constructor() {
    this.tableHeaders.push(
      new TableCell('Header 1'),
      new TableCell('Header 2'),
      new TableCell('Header 3'),
      new TableCell('Header 4')
    );

    this.tableCells.push(
      new TableCell('Item 1'),
      new TableCell('Item 2'),
      new TableCell('Item 3'),
      new TableCell('Item 4')
    );

    this.tableRows.push(
      new TableRow(this.tableCells),
    );
  }

  ...
}
```

And finally add this directive to your html:

```html
  <nv-editable-table [table-headers]="tableHeaders" [table-rows]="tableRows"></nv-editable-table>
```

## Directive Options

You can customize the table options by the `nv-editable-table` directive, the available options are:

|       Option      | Value          |    Description   |
| ----------------- |----------------|------------------|
| table-headers     | TableCell Array| An array of TableCell objects with headers name|
| table-rows        | TableRow Array | An array of TableRows objects with TableCells  |
| can-delete-rows   | true/false     | Enable or disable delete rows button           |
| can-edit-rows     | true/false     | Enable or disable edit rows button             |
| can-add-rows      | true/false     | Enable or disable add rows button              |

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