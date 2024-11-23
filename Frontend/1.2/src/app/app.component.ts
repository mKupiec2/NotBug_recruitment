import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, combineLatest } from 'rxjs';
import { filter, mergeMap, toArray, map } from 'rxjs/operators'
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '1.2';
  average_age!: number;
  people;
  ages;
  locations;

  constructor(service: AppService) {
    this.people = from(service.getPeople())
    this.ages = from(service.getAges())
    this.locations = from(service.getLocations())   
  }

  ngOnInit(): void {
    const combined = this.people.pipe(
      mergeMap(person => 
        combineLatest([
          this.ages.pipe(filter(age => age.person == person.id)),
          this.locations.pipe(filter(location => location.person == person.id))
        ]).pipe(
          map(([age, location]) => ({
            ...person,
            age: age.age,
            country: location.country
          }))
        )
      )
    )

    combined.pipe(
      filter(person => person.country == "Poland"),
      toArray(),
      map(people_in_poland => {
        const total_age = people_in_poland.reduce((sum, person) => sum + person.age, 0)
        return total_age / people_in_poland.length
      })
    ).subscribe(average_age => {
      this.average_age = average_age
    })
  }

  getAvgAge() {
    
  }
}
