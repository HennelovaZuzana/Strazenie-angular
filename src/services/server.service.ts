import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of } from 'rxjs';
import { DruhZvierata } from 'src/entities/druhZvierata';
import { Osoba } from 'src/entities/osoba';
import { VieStazit } from 'src/entities/vieStrazit';
import { Zviera } from 'src/entities/zviera';
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

  getUserByName(name: string): Observable<Osoba> {
    return this.http.get<Osoba>(this.serverUrl + "users/" + name);
  }

  getUserById(id: number): Observable<Osoba> {
    return this.http.get<Osoba>(this.serverUrl + "users/" + id);
  }

  getAllUsers(): Observable<Osoba[]> {
    return this.http.get<Osoba[]>(this.serverUrl + "users");
  }

  sendUser(user: Osoba): Observable<Osoba> {
    return this.http.post<Osoba>(this.serverUrl + "users", user);
  }

  deleteUser(user: Osoba): Observable<boolean> {
    return this.http.delete(this.serverUrl + "users/" + user.id).pipe(
      mapTo(true),
      catchError(error => of(false))
    );
  }

  getUserAnimals(user: Osoba): Observable<Zviera[]> {
    return this.http.get<Zviera[]>(this.serverUrl + "animals/owner/" + user.id);
  }

  getUserWatch(user: Osoba): Observable<VieStazit[]> {
    return this.http.get<VieStazit[]>(this.serverUrl + "watch/user/" + user.id);
  }

  getByDruhId(speciesId: number): Observable<VieStazit[]>{
    return this.http.get<VieStazit[]>(this.serverUrl + "watch/" + speciesId);
  }
}
