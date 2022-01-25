import { Component, OnInit } from '@angular/core';
import { DruhZvierata } from 'src/entities/druhZvierata';
import { Osoba } from 'src/entities/osoba';
import { VieStazit } from 'src/entities/vieStrazit';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-watch-offers',
  templateUrl: './watch-offers.component.html',
  styleUrls: ['./watch-offers.component.css']
})
export class WatchOffersComponent implements OnInit {

  public offers: VieStazit[] = [];
  species: DruhZvierata[] = [];
  selectedSpecies: DruhZvierata | undefined;
  user: Osoba | undefined;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getSpecies().subscribe(spec => {
      this.species = spec;
      this.species.splice(0, 0, new DruhZvierata(0, "Všetky"));
      this.selectedSpecies = this.species[0];
    });
    this.serverService.getByDruhId(0).subscribe(offr => {
      offr.forEach(offer => {
        this.serverService.getUserById(offer.osobaId).subscribe(os => this.user = os);
        const newOff = new VieStazit(offer.id, offer.cena, offer.poznamka, offer.druhId, offer.osobaId, offer.druh, this.user?.meno, this.user?.adresa, this.user?.kontakt )
        this.offers.push(newOff);
      });
    });

  }

  filterSpecies(): void {
    if (this.selectedSpecies) {
      if (this.selectedSpecies.druh === "Všetky"){
        this.serverService.getByDruhId(0).subscribe(anim => this.offers = anim);
      } else {
        this.serverService.getByDruhId(this.selectedSpecies?.id).subscribe(anim => this.offers = anim);
      }
    }
  }
}


