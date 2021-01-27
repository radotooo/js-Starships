import Starship from './Starship';
import { parseConsData, pasePassData } from '../utils';

export default class StarWarsUniverse {
  constructor() {
    this.starships = [];
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
      [undefined, null, 'n/a', '0'].includes(passenger) ||
      [undefined, null, 'unknown'].includes(consumable)
    ) {
      return false;
    } else {
      return true;
    }
  }

  get theBestStarship() {
    return this.starships.sort(
      (a, b) => b.maxDaysInSpace - a.maxDaysInSpace
    )[0];
  }

  async _createStarship(count) {
    const ships = [];
    for (let index = 0; index < count; index++) {
      let response = await fetch(`https://swapi.dev/api/starships/${index}`);

      if (response.status != 404) {
        let data = await response.json();
        ships.push(data);
      }
    }
    ships
      .filter((ship) => this._validateData(ship))
      .map((ship) =>
        this.starships.push(
          new Starship(
            ship.name,
            parseConsData(ship.consumables),
            pasePassData(ship.passengers)
          )
        )
      );
  }

  async init() {
    const count = await this._getStarshipCount();
    await this._createStarship(count);
  }
}
