import { CharacterT } from 'src/characters/types';

export function createKeywordsFilter(keywords: string[]) {
  function _filter(characters: CharacterT[]) {
    function match(character: CharacterT) {
      return (
        !keywords.length ||
        keywords.every((keyword) =>
          character.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    return keywords.length ? characters.filter(match) : characters;
  }
  return _filter;
}
