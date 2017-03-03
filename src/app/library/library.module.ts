import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [LibraryComponent],
  exports: [LibraryComponent],
  bootstrap: [LibraryComponent]
})
export class LibraryModule { }
