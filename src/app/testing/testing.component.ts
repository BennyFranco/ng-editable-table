import { Component, OnInit } from '@angular/core';
import { EditableTableService } from '../editable-table/editable-table.service';

@Component({
  selector: 'nv-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  tableHeaders = ['Header 1', 'Header 2', 'Header 3'];

  tableRowsWithId = [];
  dataType = ['string', 'string', 'boolean'];

  constructor(private service: EditableTableService) {

  }

  ngOnInit() {
  }

  onRemove(row: any) {
    console.log(row);
  }
}
