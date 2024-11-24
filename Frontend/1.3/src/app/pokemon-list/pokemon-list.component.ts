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
  current_page: number = 1
  offset_amount: number = 20

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

  private updateList(): void {
    this.pokemonService.getPokemonList((this.current_page - 1) * this.offset_amount).subscribe({
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

  public movePage(amount: number): void {
    if (!(amount < 0 && this.current_page <= 1) || (this.current_page >= 66 && amount > 0)) { 
      this.current_page += amount
      this.updateList()
    }
  }
}
