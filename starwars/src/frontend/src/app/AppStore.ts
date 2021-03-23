import { makeObservable, observable } from 'mobx';
import { CharactersStore } from 'src/characters/CharactersStore';
import { AuthStore } from 'src/auth/AuthStore';
import { CharactersCtr } from 'src/characters/CharactersCtr';
import { charactersCtrUsesCharactersStore } from 'src/app/policies';

export class AppStore {
  @observable charactersStore: CharactersStore;
  @observable charactersCtr: CharactersCtr;
  @observable authStore: AuthStore;

  constructor() {
    makeObservable(this);

    this.charactersStore = new CharactersStore();
    this.authStore = new AuthStore();
    this.charactersCtr = new CharactersCtr({});

    this.applyPolicies();
  }

  applyPolicies() {
    charactersCtrUsesCharactersStore(this.charactersCtr, this.charactersStore);
  }
}
