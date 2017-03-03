import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { TestingComponent } from './testing/testing.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    EditableTableComponent,
    TestingComponent
  ],
  bootstrap: [TestingComponent]
})
export class AppModule { }
