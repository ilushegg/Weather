import { Injectable } from '@angular/core';
import { Coords } from 'src/app/models/coord';
import { v4 as guid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  #keyWord: string = 'favoriteLocationId';

  constructor() { }



  addToFavorite(coord: Coords, city: string) {
    let id = guid();
    localStorage.setItem(`${this.#keyWord} ${id}`, JSON.stringify({...coord, city}));
  }


  getAllNameLocation(): {coord: Coords, city: string}[] {
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
