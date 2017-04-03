import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableTableModule } from './editable-table/editable-table.module';
import { TestingComponent } from './testing/testing.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    EditableTableModule,
  ],
  declarations: [
    TestingComponent
  ],
  bootstrap: [TestingComponent]
})
export class AppModule { }
