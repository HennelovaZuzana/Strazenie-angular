import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Strazenie-angular';

  public userName: string | undefined;

  constructor() {}

  validateUser (): void{
    if(this.userName) {
      console.log(this.userName)};
  }
}
