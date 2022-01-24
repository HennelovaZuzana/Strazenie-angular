import { Component, OnInit } from '@angular/core';
import { DruhZvierata } from 'src/entities/druhZvierata';
import { Osoba } from 'src/entities/osoba';
import { ZvieraXMajitel } from 'src/entities/zvieraXmajitel';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-watch-offers',
  templateUrl: './watch-offers.component.html',
  styleUrls: ['./watch-offers.component.css']
})
export class WatchOffersComponent implements OnInit {

  public animals: ZvieraXMajitel[] = [];
  species: DruhZvierata[] = [];
  selectedSpecies: DruhZvierata | undefined;
  users: Osoba[] = [];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getSpecies().subscribe(spec => {
      this.species = spec;
      this.species.splice(0, 0, new DruhZvierata(0, "Všetky"));
      this.selectedSpecies = this.species[0];
    });
    this.serverService.getAnimalsToWatch().subscribe(anim => this.animals = anim);
  }

  filterSpecies(): void {
    if (this.selectedSpecies) {
      if (this.selectedSpecies.druh === "Všetky"){
        this.serverService.getAnimalsToWatch().subscribe(anim => this.animals = anim);
      } else {
        this.serverService.getAnimalsBySpecies(this.selectedSpecies?.druh).subscribe(anim => this.animals = anim);
      }
    }
  }
}


