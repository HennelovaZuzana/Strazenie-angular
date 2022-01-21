import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Osoba } from 'src/entities/osoba';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: string = "";
  public users: Osoba[] = [];
  public found: boolean = true;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.serverService.getAllUsers().subscribe(u => this.users = u);
  }

  validateUser(): void{
    if(this.userName.length > 0) {
      for (let user of this.users){
        if (user.meno === this.userName){
          this.found = true;
          this.router.navigateByUrl("/menu/" + this.userName);
          break;
        }
      }
      this.found = false;
    }
  }
}
