import { Component, OnInit } from '@angular/core';
import { EditableTableService } from '../editable-table/editable-table.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-basic-example',
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.css']
})
export class BasicExampleComponent implements OnInit {
  tableHeaders = ['Header 1', 'Header 2', 'Header 3'];

  tableRowsWithId: any[][] = [
    [1, 'Header 1', 'Header 2', true],
    [2, 'Header 1', 'Header 2', true]
  ];

  dataType = ['string', 'string', 'boolean'];

  constructor(public service: EditableTableService) {

  }

  ngOnInit() {
    this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
  }

  onRemove(row: any) {
    console.log(row);
  }
}
