import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { CharacterT } from 'src/characters/types';

export type PropsT = {
  character: CharacterT;
  className: any;
  onMouseDown: any;
};

export const CharactersListViewItem: React.FC<PropsT> = observer(
  (props: PropsT) => {
    return (
      <div
        className={classnames(
          'CharactersListViewItem flex flex-row flex-1 mb-2',
          props.className
        )}
        onMouseDown={props.onMouseDown}
      >
        {props.character.name}
      </div>
    );
  }
);
