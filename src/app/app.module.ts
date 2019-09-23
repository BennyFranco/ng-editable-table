import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EditableTableModule } from './editable-table/editable-table.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EditableTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
