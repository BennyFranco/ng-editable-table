/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Input } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditableTableComponent } from './editable-table.component';

describe('EditableTableComponent', () => {
  let component: EditableTableComponent;
  let fixture: ComponentFixture<EditableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditableTableComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have table headers strings', () => {
    const tableHeaders = ['Header 1', 'Header 2', 'Header 3'];

    component.tableHeaders = tableHeaders;

    expect(component.tableHeaders).toBe(tableHeaders);
  });

  it('should have table rows strings', () => {
    const tableRows = [
      ['Cell', 'Cell', 'Cell'],
      ['Cell', 'Cell', 'Cell'],
      ['Cell', 'Cell', 'Cell']
    ];

    component.tableRows = tableRows;

    expect(component.tableRows).toBe(tableRows);
  });
});
