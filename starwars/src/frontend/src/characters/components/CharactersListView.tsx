import { getf } from 'skandha';
import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/app/components/StoreProvider';
import { ResourceView } from 'src/utils/components';
import { CharactersListViewItem } from 'src/characters/components';
import classnames from 'classnames';
import { Selection } from 'skandha-facets/Selection';
import { Highlight } from 'skandha-facets/Highlight';

export const CharactersListView = observer(() => {
  const { charactersStore } = useStore();
  const { charactersCtr: ctr } = useStore();
  const selection = getf(Selection, ctr);
  const highlight = getf(Highlight, ctr);

  const characterDivs = flow(
    always(ctr.outputs.display),
    map((character) => (
      <CharactersListViewItem
        key={character.id}
        character={character}
        className={classnames({
          'CharactersListViewItem--selected':
            character && selection.ids.includes(character.id),
          'CharactersListViewItem--highlighted':
            character && highlight.id == character.id,
        })}
        onMouseDown={(e: any) => {
          selection.selectItem({
            itemId: character.id,
            isShift: e.shiftKey,
            isCtrl: e.ctrlKey,
          });
        }}
      />
    ))
  )();

  const noItems = <h2>There are no characters</h2>;

  const updatedDiv = (
    <div className="CharactersListView flex flex-col w-full">
      {!!characterDivs.length && characterDivs}
      {!characterDivs.length && noItems}
    </div>
  );

  return (
    <ResourceView
      rs={charactersStore.characterByIdRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="text-white">{message}</div>;
      }}
    />
  );
});
