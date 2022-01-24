import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Osoba } from 'src/entities/osoba';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userName: string = "";
  user: Osoba | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serverService: ServerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.serverService.getUserByName(this.userName).subscribe(u => this.user = u);
  }

  saveUser(): void {
    if (this.user){
      this.serverService.sendUser(this.user).subscribe();
      this.router.navigateByUrl("/menu/" + this.user.meno);
    }
  }

  deleteUser(): void {
    if (this.user){
      if (confirm("Naozaj si prajete zmazať svoj účet?")) {
        this.serverService.deleteUser(this.user).subscribe();
        this.router.navigateByUrl("");
      }
    }
  }

}
