import { Component, OnInit } from '@angular/core';
import { DruhZvierata } from 'src/entities/druhZvierata';
import { Osoba } from 'src/entities/osoba';
import { Strazca } from 'src/entities/strazca';
import { VieStazit } from 'src/entities/vieStrazit';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-watch-offers',
  templateUrl: './watch-offers.component.html',
  styleUrls: ['./watch-offers.component.css']
})
export class WatchOffersComponent implements OnInit {

  public offers: Strazca[] = [];
  species: DruhZvierata[] = [];
  selectedSpecies: DruhZvierata | undefined;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getSpecies().subscribe(spec => {
      this.species = spec;
      this.species.splice(0, 0, new DruhZvierata(0, "Všetky"));
      this.selectedSpecies = this.species[0];

      this.getAll();
    });
  }

  getAll(){
    this.offers = [];
    for(let i = 1; i < this.species.length; i++){
      this.serverService.getByDruhId(i).subscribe(offr => {
        this.offers = this.offers.concat(offr);
      });
    }
  }

  filterSpecies(): void {
    if (this.selectedSpecies) {
      if (this.selectedSpecies.druh === "Všetky"){
        this.getAll();
      } else {
        this.serverService.getByDruhId(this.selectedSpecies?.id).subscribe(anim => this.offers = anim);
      }
    }
  }
}


