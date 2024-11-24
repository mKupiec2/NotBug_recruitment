import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  getCars(): any[] {
    const cars = localStorage.getItem("cars")
    return cars ? JSON.parse(cars) : []
  }

  addCar(car: { id: number, make: string, model: string, year: number, parts: {cost: number, name: string}[]}) : void {
    const cars = this.getCars()
    if (cars.length == 0) car.id = 1
    else car.id = cars[cars.length - 1].id + 1
    cars.push(car)
    localStorage.setItem("cars", JSON.stringify(cars))
  }

  getCarInfo(id: number) {
    const cars = this.getCars()
    return cars.find(car => car.id == id)
  }

  addPart(id: number, part_name: string, part_price: number): void {
    const cars = this.getCars()
    const selected_car = cars.find(car => car.id = id)
    selected_car.parts.push({ cost: part_price, name: part_name })
    localStorage.setItem("cars", JSON.stringify(cars))

  }
}
