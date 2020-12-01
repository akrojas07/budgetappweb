import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Feria';
  showErrorMessage: boolean;
  errorMessage: string;
  confirmPassword: string;

  ngOnInit() {
    this.showErrorMessage = false;
    this.errorMessage = null;
  }

  errorOccurred(message: string){
    this.showErrorMessage = true;
    this.errorMessage = message;
  }

}
