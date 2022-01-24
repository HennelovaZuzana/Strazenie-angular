import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  title: string = "List of species"
  species: string[]=["test animal"]

  constructor(
    public druh: string,
    public druhID: number
    ) {}

  ngOnInit(): void {
  }

}
