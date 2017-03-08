import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';

import { EditableTableService } from './editable-table.service';


@Component({
  selector: 'nv-editable-table',
  template: `
              <table class="{{class}}">
              <thead>
                <tr>
                  <th *ngFor="let title of service.tableHeadersObjects">{{title.content}}</th>
                  <th *ngIf="canEditRows||canDeleteRows"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="{{trClass}}" *ngFor="let row of service.tableRowsObjects">
                  <td class={{tdClass}} *ngFor="let cell of row.cells">
                    <span *ngIf="service.isEditing.indexOf(row) === -1 && checkTypeOf(cell.content) !== 'boolean'">{{cell.content}}</span>
                    <span *ngIf="service.isEditing.indexOf(row) === -1 && checkTypeOf(cell.content) == 'boolean'">
                      {{cell.content ? 'Activo' : 'Inactivo'}}
                    </span>
                    <div class="ui input" *ngIf="!(service.isEditing.indexOf(row) == -1) && checkTypeOf(cell.content) !== 'boolean'">
                      <input type="text" [(ngModel)]="cell.content" [name]="cell.content">
                    </div>
        <div *ngIf="!(service.isEditing.indexOf(row) == -1) && checkTypeOf(cell.content) === 'boolean'" class="field checkboxContainer">
            <div class="ui toggle checkbox">
                <input type="checkbox" name="public" [(ngModel)]="cell.content" name="active">
                <label>{{cell.content ? 'Activo' : 'Inactivo'}}</label>
            </div>
        </div>
                  </td>
                  <td class={{buttonsTdClass}} *ngIf="canEditRows||canDeleteRows">
                    <button class={{editButtonClass}} *ngIf="service.isEditing.indexOf(row) === -1 && canEditRows" (click)="editRow(row)">
                      <i class="{{editIcon}}"></i>{{editButtonLabel}}
                    </button>
                    <button class={{editButtonClass}} *ngIf="!(service.isEditing.indexOf(row) == -1) && canEditRows" (click)="cancelEditing(row)">
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
                  <th *ngFor="let title of service.tableHeadersObjects"></th>
                  <th *ngIf="canEditRows||canDeleteRows">
                      <button class={{addButtonClass}} (click)="addRow()" *ngIf="canAddRows">
                          <i class="{{addIcon}}"></i>{{addButtonLabel}}
                      </button>
                  </th>
                </tr>
              </tfoot>
            </table>
  `,
  styles: [`tfoot{text-align: right;}`],
  providers: [EditableTableService]
})
export class EditableTableComponent implements OnInit {

  @Input('table-headers') tableHeaders: string[] = [];
  @Input('table-rows') tableRows: any[][] = [];
  @Input('table-rows-with-id') tableRowsWithId: any[][] = [];
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
  @Input('td-class') tdClass: string;
  @Input('buttons-td-class') buttonsTdClass: string;
  @Input('class') class: string;

  @Output() onSave = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();

  service: EditableTableService;

  constructor(service: EditableTableService) {
    this.service = service;
  }

  ngOnInit() {
    for (const obj of this.tableHeaders) {
      this.service.tableHeadersObjects.push(
        new TableCell(obj)
      );
    }

    let tableCells: TableCell[] = [];

    if (this.tableRows.length > 0) {
      for (const row of this.tableRows) {
        for (const cell of row) {
          tableCells.push(
            new TableCell(cell),
          );
        }
        this.service.tableRowsObjects.push(new TableRow(tableCells));
        tableCells = [];
      }
    } else if (this.tableRowsWithId.length > 0) {
      for (const row of this.tableRowsWithId) {
        for (let i = 1; i < row.length; i++) {
          tableCells.push(
            new TableCell(row[i]),
          );
        }
        this.service.tableRowsObjects.push(new TableRow(tableCells, row[0]));
        tableCells = [];
      }
    }
  }

  addRow() {
    this.service.addRow();
  }

  editRow(selectedRow: TableRow) {
    this.service.editRow(selectedRow);
  }

  cancelEditing(selectedRow: TableRow) {
    this.service.cancelEditing(selectedRow);
    const dir = [];

    for (let i = 0; i < selectedRow.cells.length; i++) {
      dir.push(selectedRow.cells[i].content);
    }
    const obj = { id: selectedRow.id, cells: dir };

    this.onSave.emit(obj);
  }

  deleteRow(selectedRow: TableRow) {
    this.service.deleteRow(selectedRow);
    const dir = [];

    for (let i = 0; i < selectedRow.cells.length; i++) {
      dir.push(selectedRow.cells[i].content);
    }
    const obj = { id: selectedRow.id, cells: dir };

    this.onRemove.emit(obj);
  }

  checkTypeOf(value: any): string {
    if (typeof (value) === 'boolean') {
      return 'boolean';
    }
    return '';
  }
}
