import { Component, OnInit } from '@angular/core';
import { DruhZvierata } from 'src/entities/druhZvierata';
import { ZvieraXMajitel } from 'src/entities/zvieraXmajitel';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-animals-to-watch',
  templateUrl: './animals-to-watch.component.html',
  styleUrls: ['./animals-to-watch.component.css']
})
export class AnimalsToWatchComponent implements OnInit {

  public animals: ZvieraXMajitel[] = [];
  selectedSpecies: DruhZvierata | undefined;
  species: DruhZvierata[] = [];

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
