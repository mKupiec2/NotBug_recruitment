import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pokemon-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  pokemonList: any[] = []
  loading: boolean = true

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe({
      next: (data) => {
        this.pokemonList = data.results
        this.loading = false
      },
      error: (error) => {
        console.error("Error fetching from the API: ", error)
        this.loading = false
      }
    })
  }
}
