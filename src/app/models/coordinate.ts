export class Point {
    constructor(
      public type: string,
      public coordinates: number[]
    ) { }
  }
  
  export class Coordinate {
    constructor(
      public latitude: number,
      public longitude: number,
    ) {}
  
    static fromGeoposition({coords: {latitude, longitude}}: Position): Coordinate {
      return new Coordinate(latitude, longitude);
    }; 
  }