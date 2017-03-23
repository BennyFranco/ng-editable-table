import { Component, OnInit } from '@angular/core';
import { EditableTableService } from '../editable-table/editable-table.service';

@Component({
  selector: 'nv-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  tableHeaders = ['Header 1', 'Header 2', 'Header 3'];

  tableRowsWithId: any[][] = [
    [1, 'Header 1', 'Header 2', true],
    [2, 'Header 1', 'Header 2', true]
    ];

  dataType = ['string', 'string', 'boolean'];

  constructor(private service: EditableTableService) {

  }

  ngOnInit() {
   this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
  }

  onRemove(row: any) {
    console.log(row);
  }
}
