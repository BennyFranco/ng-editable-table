import { Injectable } from '@angular/core';

import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';

@Injectable()
export class EditableTableService {

  tableHeadersObjects: TableCell[] = [];
  tableRowsObjects: TableRow[] = [];

  isEditing: TableRow[] = [];
  constructor() { }

  addRow() {
    const newCells: TableCell[] = [];
    let newRow: TableRow;
    for (let i = 0; i < this.tableHeadersObjects.length; i++) {
      if (this.tableRowsObjects[0].cells == null) {
        newCells.push(new TableCell(''));
      } else if (this.checkTypeOf(this.tableRowsObjects[0].cells[i].content) === 'boolean') {
        newCells.push(new TableCell(false));
      } else {
        newCells.push(new TableCell(''));
      }
    }

    this.tableRowsObjects.push(
      newRow = new TableRow(newCells)
    );

    this.isEditing.push(newRow);
  }

  editRow(selectedRow: TableRow) {
    this.isEditing.push(selectedRow);
  }

  saveRow(selectedRow: TableRow) {
    this.isEditing = this.isEditing.filter(temporalRow => temporalRow !== selectedRow);
  }

  cancelEdition(selectedRow: TableRow) {
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
