import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { EditableTableComponent } from './editable-table/editable-table.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [
    LibraryComponent,
    EditableTableComponent
  ],
  bootstrap: [LibraryComponent]
})
export class AppModule { }
