import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nv-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  tableHeaders = ['Header 1', 'Header 2', 'Header 3'];
  tableRows = [
    [1, 'Cell', 'Cell'],
    ['Cell', 2, 'Cell'],
    ['Cell', 'Cell', true]
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
