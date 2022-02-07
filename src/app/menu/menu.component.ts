import { newArray } from '@angular/compiler/src/util';
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
  editedAnimal: Zviera | undefined;
  editedOffer: VieStazit | undefined;

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

  setNewAnimal() {
    if (this.user?.id) {
      this.editedAnimal = new Zviera(this.user?.id, -1, "", "samec", "", new Date(), new Date());
    }
  }

  setSelectedAnimal(animal: Zviera) {
    this.editedAnimal = new Zviera(animal.majitelId, animal.druhZvierataId, animal.meno, animal.pohlavie,
      animal.poznamka, animal.strazenieOd, animal.strazenieDo, animal.id);
    
  }

  saveAnimal() {
    if(this.editedAnimal){
      this.serverService.sendAnimal(this.editedAnimal).subscribe(anim => {
        if (this.editedAnimal?.id) {
          const newArr: Zviera[] = [];
          for (let animal of this.userAnimals){
            if (animal.id === anim.id){
              newArr.push(anim);
            } else {
              newArr.push(animal);
            }
          }
          this.userAnimals = newArr;
        } else {
          this.userAnimals.push(anim);
        }
      });
      
      
    }
  }

  deleteAnimal() {
    if (this.editedAnimal){
      
      if (confirm("Naozaj si prajete zmazať toto zviera?")) {
        this.serverService.deleteAnimal(this.editedAnimal).subscribe()
        const newArr: Zviera[] = [];
        for (let animal of this.userAnimals) {
          if (animal.id != this.editedAnimal.id){
            newArr.push(animal);
          }
        }
        this.userAnimals = newArr;
      }
    }
  }

  changeDate(event: string): Date{
    return new Date(event);
  }

  setNewOffer() {
    if(this.user?.id){
      this.editedOffer = new VieStazit(0, "", -1, this.user?.id, undefined, undefined, this.user.meno, this.user.adresa, this.user.kontakt);
    }
  }

  setSelectedOffer(offer: VieStazit) {
    this.editedOffer = new VieStazit(offer.cena, offer.poznamka, offer.druhId, offer.osobaId, 
                            offer.id, offer.druh, offer.majitelMeno, offer.majitelAdresa, offer.majitelKontakt);
  }

  saveOffer() {
    if (this.editedOffer){
      this.serverService.sendOffer(this.editedOffer).subscribe(offer => {
        if (this.editedOffer?.id) {
          const newArr: VieStazit[] = [];
          for (let o of this.userWatch){
            if (o.id === offer.id){
              newArr.push(offer);
            } else {
              newArr.push(o);
            }
          }
          this.userWatch = newArr;
        } else {
          this.userWatch.push(offer);
        }
      });
    }
  }

  deleteOffer() {
    if (this.editedOffer){
      if (confirm("Naozaj si prajete zmazať túto ponuku?")) {
        this.serverService.deleteOffer(this.editedOffer).subscribe();
        const newArr: VieStazit[] = [];
          for (let o of this.userWatch){
            if (o.id != this.editedOffer.id){
              newArr.push(o);
            }
          }
          this.userWatch = newArr;
      }
    }
  }

}
