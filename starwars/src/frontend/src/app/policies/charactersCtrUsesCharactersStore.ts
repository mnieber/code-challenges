import { reaction } from 'mobx';
import { CharactersStore } from 'src/characters/CharactersStore';
import { CharactersCtr } from 'src/characters/CharactersCtr';
import { values } from 'lodash/fp';
import { CharacterT } from 'src/characters/types';

export const charactersCtrUsesCharactersStore = (
  charactersCtr: CharactersCtr,
  charactersStore: CharactersStore
) => {
  reaction(
    () => ({
      characters: values(charactersStore.characterById) as CharacterT[],
    }),
    ({ characters }) => {
      charactersCtr.inputs.characters = characters;
    },
    {
      fireImmediately: true,
    }
  );
};
