import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {
  selected_pokemon: any = null
  loading: boolean = true

  constructor(private route: ActivatedRoute, private http: HttpClient, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const pokemon_name = this.route.snapshot.paramMap.get("name")
    if (pokemon_name) {
      this.pokemonService.getPokemonDetails(pokemon_name).subscribe({
        next: (data) => {
          this.selected_pokemon = data
          this.loading = false
          console.log(data)
        },
        error: (error) => {
          console.error('Error fetching Pokemon info:', error)
          this.loading = false
        }
      })
    }
  }
}
