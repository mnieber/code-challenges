import { action, makeObservable, observable } from 'mobx';
import { forEach } from 'lodash/fp';
import { RST, resetRS, updateRes } from 'src/utils/RST';
import * as charactersApi from 'src/characters/api';

import { CharacterT, CharacterByIdT } from 'src/characters/types';

export class CharactersStore {
  @observable characterById: CharacterByIdT = {};
  @observable characterByIdRS: RST = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action loadCharacters = () => {
    updateRes(
      this,
      'characterByIdRS',
      () => {
        return charactersApi.getCharacters();
      },
      (response: any) => {
        this.addCharacters(response.characters);
      },
      (message: any) => {
        console.log(message);
        return 'Oops, there was an error getting the characters data';
      }
    );
  };

  @action addCharacters = (characters: CharacterT[]) => {
    forEach((character: CharacterT) => {
      this.characterById[character.id] = character;
    }, characters);
  };
}
