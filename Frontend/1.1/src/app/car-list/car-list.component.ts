import { Component } from '@angular/core';
import { CarService } from '../car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-list',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  make = ""
  model = ""
  year: number | null = null
  cars: { id: number, make: string, model: string, year: number, parts: {cost: number, name: string}[]}[] = []

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.updateCars()
  }

  updateCars(): void {
    this.cars = this.carService.getCars()
  }

  resetForm(): void {
    this.make = ""
    this.model = ""
    this.year = null
  }

  addCar(): void {
    if (this.make && this.model && this.year) {
      this.carService.addCar({ id: -1, make: this.make, model: this.model, year: this.year, parts: []})
      this.updateCars()
      this.resetForm()
    }
  }
}
