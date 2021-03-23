import { observable } from 'mobx';
import { input } from 'skandha';
import { CharacterT } from 'src/characters/types';

export class Inputs {
  @input @observable characters: Array<CharacterT> = [];

  static get = (ctr: any): Inputs => ctr.inputs;
}
