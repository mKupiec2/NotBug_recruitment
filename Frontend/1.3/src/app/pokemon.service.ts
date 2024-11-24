import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = "https://pokeapi.co/api/v2/pokemon/"

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<any> {
    return this.http.get(this.url)
  }

  getPokemonDetails(pokemon_name: string): Observable<any> {
    return this.http.get(`${this.url}${pokemon_name}`)
  }
}
