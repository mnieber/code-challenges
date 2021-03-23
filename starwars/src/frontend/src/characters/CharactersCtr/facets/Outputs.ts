import { computed, observable } from 'mobx';
import { CharacterT, CharacterByIdT } from 'src/characters/types';
import { listToItemById } from 'src/utils/ids';
import { output } from 'skandha';

export class Outputs {
  @observable @output display: Array<CharacterT> = [];

  @computed get characterById(): CharacterByIdT {
    return listToItemById(this.display);
  }

  static get = (ctr: any): Outputs => ctr.outputs;
}
