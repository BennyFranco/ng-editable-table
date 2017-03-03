import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryComponent } from './library/library.component';
import { EditableTableComponent } from './editable-table/editable-table.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    LibraryComponent,
    EditableTableComponent
  ],
  bootstrap: [EditableTableComponent]
})
export class AppModule { }
