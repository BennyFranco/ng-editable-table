import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableTableComponent } from './editable-table.component';
import { EditableTableService } from './editable-table.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    EditableTableComponent,
  ],
  providers: [EditableTableService],
  exports: [EditableTableComponent],
})
export class EditableTableModule { }
