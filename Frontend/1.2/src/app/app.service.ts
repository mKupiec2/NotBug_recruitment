
export class AppService {
  getPeople() {
    return [
      {
        id: 1,
        name: "Jan Kowalski"
      },
      {
        id: 2,
        name: "John Doe"
      },
      {
        id: 3,
        name: "Jarek Kaczka"
      }
    ]
  }
  getAges() {
    return [
      {
        person: 1,
        age: 18
      },
      {
        person: 2,
        age: 24
      },
      {
        person: 3,
        age: 666
      }
    ]
  }
  getLocations() {
    return [
      {
        person: 1,
        country: "Poland"
      },
      {
        person: 2,
        country: "Poland"
      },
      {
        person: 3,
        country: "USA"
      }
    ]
  }
}