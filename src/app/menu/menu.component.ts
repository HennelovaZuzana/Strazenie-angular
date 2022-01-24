import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DruhZvierata } from 'src/entities/druhZvierata';
import { Osoba } from 'src/entities/osoba';
import { VieStazit } from 'src/entities/vieStrazit';
import { Zviera } from 'src/entities/zviera';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userName: string = "";
  user: Osoba | undefined;
  userAnimals: Zviera[] = [];
  userWatch: VieStazit[] = [];
  species: DruhZvierata[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private serverService: ServerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.serverService.getSpecies().subscribe(s => this.species = s);
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.serverService.getUserByName(this.userName).subscribe(u => {
      this.user = u;
      this.serverService.getUserAnimals(this.user).subscribe(a => this.userAnimals = a);
      this.serverService.getUserWatch(this.user).subscribe(w => this.userWatch = w);
    });
  }

  saveUser(): void {
    console.log(this.userAnimals);
    
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
