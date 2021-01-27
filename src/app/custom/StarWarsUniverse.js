import Starship from './Starship';
import { parseConsData, pasePassData } from '../utils';

export default class StarWarsUniverse {
  constructor() {
    this.starship = [];
  }
  async _getStarshipCount() {
    const response = await fetch('https://swapi.dev/api/starships/');

    const data = await response.json();

    return data.count;
  }

  _validateData(ship) {
    // console.log(ship);
    const consumable = ship.consumables;
    const passenger = ship.passengers;

    if (
      ![undefined, null, 'n/a', '0'].includes(passenger) &&
      ![undefined, null, 'unknown'].includes(consumable)
    ) {
      return ship;
    }
  }

  get theBestStarship() {
    return this.starship.sort((a, b) => b.maxDaysInSpace - a.maxDaysInSpace)[0];
  }

  async _createStarship() {
    const ships = [];
    let response = await fetch('https://swapi.dev/api/starships/');

    let data = await response.json();

    ships.push(data);
    while (data.next) {
      response = await fetch(`${data.next}`);

      data = await response.json();

      ships.push(data);
    }

    ships
      .map((data) => data.results.map((ship) => ship))
      .flat()
      .filter((ship) => this._validateData(ship))
      .map((ship) =>
        this.starship.push(
          new Starship(
            ship.name,
            parseConsData(ship.consumables),
            pasePassData(ship.passengers)
          )
        )
      );
  }

  async init() {
    await this._getStarshipCount();
    await this._createStarship();
  }
}
