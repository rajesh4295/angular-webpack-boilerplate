import { Component } from '@angular/core';
import "../assets/styles/global.less";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    name = 'Angular 10 & Webpack 4';
    
}
