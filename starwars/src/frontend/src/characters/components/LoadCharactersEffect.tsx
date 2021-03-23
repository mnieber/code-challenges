import React from 'react';

import { EffectWithoutArgs } from 'src/utils/components';
import { useStore } from 'src/app/components/StoreProvider';

type PropsT = {};

export const LoadCharactersEffect: React.FC<PropsT> = (p: PropsT) => {
  const { charactersStore } = useStore();
  return (
    <EffectWithoutArgs
      f={() => {
        charactersStore.loadCharacters();
      }}
    />
  );
};
