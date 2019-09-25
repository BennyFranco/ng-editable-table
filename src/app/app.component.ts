import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBasic = true;
  showBootstrap = false;
  showSemantic = false;

  changeStyle(style: string) {
    switch (style) {
      case 'basic':
        this.showBasic = true;
        this.showBootstrap = false;
        this.showSemantic = false;
        break;
      case 'bootstrap':
        this.showBasic = false;
        this.showBootstrap = true;
        this.showSemantic = false;
        break;
      case 'semantic':
        this.showBasic = false;
        this.showBootstrap = false;
        this.showSemantic = true;
        break;
    }
  }
}
