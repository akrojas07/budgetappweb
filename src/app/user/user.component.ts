import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValue();
  }

  getValue()
  {
    this.http.get('http://localhost:5000/api/user').subscribe(response => {
      this.values = response;
    }, error =>
    {
      console.log(error);
    });
  }
}
