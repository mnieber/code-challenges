export type CharacterT = {
  id: string;
  name: string;
};

export type CharacterByIdT = { [id: string]: CharacterT };
