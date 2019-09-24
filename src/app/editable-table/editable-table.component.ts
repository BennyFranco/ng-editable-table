import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableRow } from '../util/table-row';

import { EditableTableService } from './editable-table.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-editable-table',
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
                  <td class="{{tdClass}}" *ngFor="let cell of row.cells">
                        <span *ngIf="!service.isViewEditing(row)">
                      {{service.getCellContent(cell)}}
                    </span>
                        <div class="ui input" *ngIf="service.isViewEditing(row) && !isRequired && !service.contentIsBoolean(cell)">
                              <input type="text" [(ngModel)]="cell.content" [name]="cell.content">
                        </div>
                        <div class="ui input requiredInput" [ngClass]="{errorClass: !cell.content && cell.touched}"
                        *ngIf="service.isViewEditing(row) && !service.contentIsBoolean(cell) && isRequired">
                              <input type="text" [(ngModel)]="cell.content" [name]="cell.content"
                              #[cell.content]="ngModel" required />
                              <div [ngClass]="{'show': !cell.content && cell.touched,
                                      'hide': cell.content}" class="divmessage" style="Color: red;" [hidden]="cell.content">
                                    <div>{{requiredMessage}}</div>
                              </div>
                        </div>
                        <div *ngIf="service.isViewEditing(row) && service.contentIsBoolean(cell)"
                        class="field checkboxContainer">
                              <div class="ui toggle checkbox">
                                    <input type="checkbox" name="public" [(ngModel)]="cell.content" name="active">
                                    <label>{{cell.content ? 'Activo' : 'Inactivo'}}</label>
                              </div>
                        </div>
                  </td>
                  <td class={{buttonsTdClass}} *ngIf="canEditRows||canDeleteRows">
                        <button class={{editButtonClass}} *ngIf="!service.isViewEditing(row) && canEditRows" (click)="editRow(row)">
                      <i class="{{editIcon}}"></i>{{editButtonLabel}}
                    </button>
                        <button class={{editButtonClass}} *ngIf="service.isViewEditing(row) && canEditRows" (click)="saveRow(row)">
                      <i class="{{saveIcon}}"></i>{{saveButtonLabel}}
                    </button>
                        <button class={{deleteButtonClass}} *ngIf="canDeleteRows && !service.isViewEditing(row)" (click)="deleteRow(row)">
                      <i class="{{deleteIcon}}"></i>{{deleteButtonLabel}}
                    </button>
                        <button class={{deleteButtonClass}} *ngIf="service.isViewEditing(row) && canEditRows" (click)="deleteRow(row)">
                      <i class="{{deleteIcon}}"></i>{{cancelButtonLabel}}
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
  styles: [`tfoot{text-align: right;}
  .myerror{color:red}
  .requiredInput.divmessage{display:none}
  .requiredInput.divmessage.show{display:block !important}
  .requiredInput.divmessage.hide{display:none}
  .ng.editable.icon.edit{
    display: block;
    width: 16px;
    content:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path d='M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z'/></svg>");
  }
  .ng.editable.icon.add{
    display: block;
    width: 11px;
    content:url("data:image/svg+xml;utf8,<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='plus' class='svg-inline--fa fa-plus fa-w-14' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='currentColor' d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'></path></svg>")
  }
  .ng.editable.icon.save{
    display: block;
    width: 13px;
    content:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z'/></svg>");
  }
  .ng.editable.icon.delete {
    display: block;
    width: 10px;
    content:url("data:image/svg+xml;utf8,<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' class='svg-inline--fa fa-times fa-w-11' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512'><path fill='currentColor' d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path></svg>");
  }`],
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
