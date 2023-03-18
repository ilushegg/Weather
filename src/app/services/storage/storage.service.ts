import { Injectable } from '@angular/core';
import { Coords } from 'src/app/models/coord';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  #keyWord: string = 'favoriteLocationId';

  constructor() { }

  addToFavorite(coord: Coords, city: string): boolean {
    if (this.getAllNameLocation().filter(loc => loc.city === city).length === 0) {
      localStorage.setItem(`${this.#keyWord} ${city}`, JSON.stringify({ ...coord, city }));
      return true;
    }
    return false;
  }

  deleteFromFavorite(city: string) {
    localStorage.removeItem(`${this.#keyWord} ${city}`);
  }

  getAllNameLocation(): { coord: Coords, city: string }[] {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      if (keys[i].includes(this.#keyWord)) {
        values.push(JSON.parse(localStorage.getItem(keys[i])!));
      }
    }
    return values;
  }


}
