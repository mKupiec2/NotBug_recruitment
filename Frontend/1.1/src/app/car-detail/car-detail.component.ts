import { Component } from '@angular/core';
import { CarService } from '../car.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent {
  selected_car: any = null
  name: string = ""
  cost: number | null = null

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  updateCar(): void {
    const car_id = this.route.snapshot.paramMap.get("id")
    if (car_id) {
      this.selected_car = this.carService.getCarInfo(Number(car_id))
    }
  }

  ngOnInit(): void {
    this.updateCar()
  }

  resetForm(): void {
    this.name = ""
    this.cost = null
  }

  addPart(): void {
    if (this.name && this.cost) {
      this.carService.addPart(this.selected_car.id, this.name, this.cost)
      this.updateCar()
      this.resetForm()
    }
  }
}
