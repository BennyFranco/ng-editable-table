import { Component, OnInit, Input } from '@angular/core';
import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';

@Component({
  selector: 'nv-editable-table',
  template: `
              <table>
              <thead>
                <tr>
                  <th *ngFor="let title of tableHeaders">{{title.content}}</th>
                  <th *ngIf="canEditRows||canDeleteRows"></th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of tableRows; let i = index">
                  <td *ngFor="let cell of row.cells">
                    <span *ngIf="isEditing.indexOf(row) === -1">{{cell.content}}</span>
                    <div class="ui input" *ngIf="!(isEditing.indexOf(row) == -1)">
                      <input type="text" [(ngModel)]="cell.content" [name]="cell.content">
                    </div>
                  </td>
                  <td *ngIf="canEditRows||canDeleteRows">
                    <button *ngIf="isEditing.indexOf(row) === -1 && canEditRows" (click)="editRow(row)">Edit</button>
                    <button *ngIf="!(isEditing.indexOf(row) == -1) && canEditRows" (click)="cancelEditing(row)">Ok</button>
                    <button *ngIf="canDeleteRows" (click)="deleteRow(row)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button (click)="addRow()" *ngIf="canAddRows">Add</button>
  `
})
export class EditableTableComponent implements OnInit {

  @Input('table-headers') tableHeaders: TableCell[] = [];
  @Input('table-rows') tableRows: TableRow[] = [];
  @Input('can-delete-rows') canDeleteRows = true;
  @Input('can-edit-rows') canEditRows = true;
  @Input('can-add-rows') canAddRows = true;

  isEditing: TableRow[] = [];

  constructor() {
  }

  ngOnInit() {

  }

  addRow() {
    const newCells: TableCell[] = [];
    let newRow: TableRow;
    for (let i = 0; i < this.tableHeaders.length; i++) {
      newCells.push(new TableCell(''));
    }

    this.tableRows.push(
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
    this.tableRows = this.tableRows.filter(temporalRow => temporalRow !== selectedRow);
  }
}
