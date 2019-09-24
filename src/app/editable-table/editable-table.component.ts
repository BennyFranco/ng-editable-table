import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableRow } from './util/table-row';

import { EditableTableService } from './editable-table.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css'],
  providers: [EditableTableService]
})
export class EditableTableComponent implements OnInit {

  @Input('table-headers') tableHeaders: string[] = [];
  @Input('table-rows') tableRows: any[][] = [];
  @Input('table-rows-with-id') tableRowsWithId: any[][] = [];
  @Input('can-delete-rows') canDeleteRows = true;
  @Input('can-edit-rows') canEditRows = true;
  @Input('can-add-rows') canAddRows = true;

  @Input('add-button-label') addButtonLabel: string;
  @Input('edit-button-label') editButtonLabel: string;
  @Input('save-button-label') saveButtonLabel: string;
  @Input('cancel-button-label') cancelButtonLabel: string;
  @Input('delete-button-label') deleteButtonLabel: string;

  @Input('add-icon') addIcon = 'ng editable icon add';
  @Input('edit-icon') editIcon = 'ng editable icon edit';
  @Input('save-icon') saveIcon = 'ng editable icon save';
  @Input('delete-icon') deleteIcon = 'ng editable icon delete';

  @Input('add-button-class') addButtonClass: string;
  @Input('edit-button-class') editButtonClass: string;
  @Input('delete-button-class') deleteButtonClass: string;

  @Input('tr-class') trClass: string;
  @Input('td-class') tdClass: string;
  @Input('buttons-td-class') buttonsTdClass: string;
  @Input('class') class: string;
  @Input('data-type') dataType = [];

  @Input() errorClass = 'myerror';
  @Input() isRequired = true;
  @Input() requiredMessage = 'Required';


  @Output() save = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  service: EditableTableService;

  constructor(service: EditableTableService) {
    this.service = service;
  }

  ngOnInit() {
    if (this.tableRows.length > 0 || (this.tableRows !== undefined && this.tableRowsWithId.length === 0)) {
      this.service.createTable(this.tableHeaders, this.tableRows, this.dataType);
    } else if (this.tableRowsWithId.length > 0 || (this.tableRowsWithId !== undefined && this.tableRows.length === 0)) {
      this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
    }
  }

  addRow() {
    this.service.addRow();
  }

  editRow(selectedRow: TableRow) {
    this.service.editRow(selectedRow);
  }

  cancelEdition(selectedRow: TableRow) {
    this.service.cancelEdition(selectedRow);
  }

  saveRow(selectedRow: TableRow) {
    for (const cell of selectedRow.cells) {
      if ((cell.content == null || cell.content === '') && this.isRequired) {
        return;
      }
    }
    this.service.saveRow(selectedRow);
    const dir = [];

    for (const item of selectedRow.cells) {
      dir.push(item.content);
    }
    const obj = { id: selectedRow.id, cells: dir };

    this.save.emit(obj);
  }

  deleteRow(selectedRow: TableRow) {
    this.service.deleteRow(selectedRow);
    const dir = [];

    for (const item of selectedRow.cells) {
      dir.push(item.content);
    }
    const obj = { id: selectedRow.id, cells: dir };

    this.remove.emit(obj);
  }
}
