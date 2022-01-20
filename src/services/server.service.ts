import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DruhZvierata } from 'src/entities/druhZvierata';
import { ZvieraXMajitel } from 'src/entities/zvieraXmajitel';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  serverUrl = "http://localhost:8080/";
  
  constructor(private http: HttpClient) { }

  getAnimalsToWatch(): Observable<ZvieraXMajitel[]> {
    return this.http.get<ZvieraXMajitel[]>(this.serverUrl + "animals");
  }

  getAnimalsBySpecies(species: string): Observable<ZvieraXMajitel[]> {
    return this.http.get<ZvieraXMajitel[]>(this.serverUrl + "animals/" + species);
  }

  getSpecies(): Observable<DruhZvierata[]> {
    return this.http.get<DruhZvierata[]>(this.serverUrl + "species");
  }
}
