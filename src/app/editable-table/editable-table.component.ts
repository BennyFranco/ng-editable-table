import { Component, OnInit, Input } from '@angular/core';
import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';

@Component({
  selector: 'nv-editable-table',
  template: `
              <table class="{{class}}">
              <thead>
                <tr>
                  <th *ngFor="let title of tableHeadersObjects">{{title.content}}</th>
                  <th *ngIf="canEditRows||canDeleteRows"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="{{trClass}}" *ngFor="let row of tableRowsObjects">
                  <td class={{tdClass}} *ngFor="let cell of row.cells">
                    <span *ngIf="isEditing.indexOf(row) === -1 && checkTypeOf(cell.content) !== 'boolean'">{{cell.content}}</span>
                    <span *ngIf="isEditing.indexOf(row) === -1 && checkTypeOf(cell.content) == 'boolean'">
                      {{cell.content ? 'Activo' : 'Inactivo'}}
                    </span>
                    <div class="ui input" *ngIf="!(isEditing.indexOf(row) == -1) && checkTypeOf(cell.content) !== 'boolean'">
                      <input type="text" [(ngModel)]="cell.content" [name]="cell.content">
                    </div>
                    <div *ngIf="!(isEditing.indexOf(row) == -1) && checkTypeOf(cell.content) === 'boolean'" class="field checkboxContainer">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="public" [(ngModel)]="cell.content" name="active">
                            <label>{{cell.content ? 'Activo' : 'Inactivo'}}</label>
                        </div>
                    </div>
                  </td>
                  <td class={{tdClass}} *ngIf="canEditRows||canDeleteRows">
                    <button class={{editButtonClass}} *ngIf="isEditing.indexOf(row) === -1 && canEditRows" (click)="editRow(row)">
                      <i class="{{editIcon}}"></i>{{editButtonLabel}}
                    </button>
                    <button class={{editButtonClass}} *ngIf="!(isEditing.indexOf(row) == -1) && canEditRows" (click)="cancelEditing(row)">
                      <i class="{{saveIcon}}"></i>{{saveButtonLabel}}
                    </button>
                    <button class={{deleteButtonClass}} *ngIf="canDeleteRows" (click)="deleteRow(row)">
                      <i class="{{deleteIcon}}"></i>{{deleteButtonLabel}}
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th *ngFor="let title of tableHeadersObjects"></th>
                  <th *ngIf="canEditRows||canDeleteRows">
                      <button class={{addButtonClass}} (click)="addRow()" *ngIf="canAddRows">
                          <i class="{{addIcon}}"></i>{{addButtonLabel}}
                      </button>
                  </th>
                </tr>
              </tfoot>
            </table>
  `,
  styles: [`tfoot{text-align: right;}`]
})
export class EditableTableComponent implements OnInit {

  @Input('table-headers') tableHeaders: string[] = [];
  @Input('table-rows') tableRows: any[][] = [];
  @Input('can-delete-rows') canDeleteRows = true;
  @Input('can-edit-rows') canEditRows = true;
  @Input('can-add-rows') canAddRows = true;

  @Input('add-button-label') addButtonLabel = 'Add';
  @Input('edit-button-label') editButtonLabel = 'Edit';
  @Input('save-button-label') saveButtonLabel = 'Ok';
  @Input('delete-button-label') deleteButtonLabel = 'Delete';

  @Input('add-icon') addIcon: string;
  @Input('edit-icon') editIcon: string;
  @Input('save-icon') saveIcon: string;
  @Input('delete-icon') deleteIcon: string;

  @Input('add-button-class') addButtonClass: string;
  @Input('edit-button-class') editButtonClass: string;
  @Input('delete-button-class') deleteButtonClass: string;

  @Input('tr-class') trClass: string;
  @Input('td class') tdClass: string;
  @Input('class') class: string;

  tableHeadersObjects: TableCell[] = [];
  tableRowsObjects: TableRow[] = [];

  isEditing: TableRow[] = [];

  constructor() {
  }

  ngOnInit() {
    for (const obj of this.tableHeaders) {
      this.tableHeadersObjects.push(
        new TableCell(obj)
      );
    }

    let tableCells: TableCell[] = [];

    for (const row of this.tableRows) {
      for (const cell of row) {
        tableCells.push(
          new TableCell(cell),
        );
      }
      this.tableRowsObjects.push(new TableRow(tableCells));
      tableCells = [];
    }
  }

  addRow() {
    const newCells: TableCell[] = [];
    let newRow: TableRow;
    for (let i = 0; i < this.tableHeadersObjects.length; i++) {
      newCells.push(new TableCell(''));
    }

    this.tableRowsObjects.push(
      newRow = new TableRow(newCells)
    );

    this.isEditing.push(newRow);
  }

  editRow(selectedRow: TableRow) {
    this.isEditing.push(selectedRow);
  }

  cancelEditing(selectedRow: TableRow) {
    this.isEditing = this.isEditing.filter(temporalRow => temporalRow !== selectedRow);
  }

  deleteRow(selectedRow: TableRow) {
    this.isEditing = this.isEditing.filter(temporalRow => temporalRow !== selectedRow);
    this.tableRowsObjects = this.tableRowsObjects.filter(temporalRow => temporalRow !== selectedRow);
  }

  checkTypeOf(value: any): string {
    if (typeof (value) === 'boolean') {
      return 'boolean';
    }
    return '';
  }
}
