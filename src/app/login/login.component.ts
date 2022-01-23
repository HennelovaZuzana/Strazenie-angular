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
  public registrationUser: Osoba = new Osoba("", "", "");

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

  registerUser() {
    if (this.registrationUser.meno.length > 0 && this.registrationUser.adresa.length > 0 && this.registrationUser.kontakt.length > 0){
      let regUser: Osoba | undefined;
      this.serverService.sendUser(this.registrationUser).subscribe(u => regUser = u);
      this.users.push(this.registrationUser)
    }
  }
}
