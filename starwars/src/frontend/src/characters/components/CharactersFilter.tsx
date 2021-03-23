import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { getf } from 'skandha';
import classnames from 'classnames';
import { StarOutlined } from '@ant-design/icons';
import { createKeywordsFilter } from 'src/characters/filters';
import { Filtering } from 'skandha-facets/Filtering';
import { useStore } from 'src/app/components/StoreProvider';

type PropsT = {
  className?: string;
};

export const CharactersFilter: React.FC<PropsT> = observer((props: PropsT) => {
  const { charactersCtr: ctr } = useStore();
  const filtering = getf(Filtering, ctr);
  const isFilterEnabled = filtering.isEnabled;

  const onFlagChanged = () => {
    filtering.setEnabled(!isFilterEnabled);
  };

  const flag = (
    <StarOutlined
      key={'filter'}
      className={classnames('mr-2', {
        'opacity-50': !isFilterEnabled,
      })}
      onClick={onFlagChanged}
    />
  );

  const keywordsPicker = (
    <div className="w-full">
      <input
        className="text-black"
        placeholder="Filter by keywords"
        onChange={(e) =>
          filtering.apply(createKeywordsFilter(e.target.value.split(' ')))
        }
      />
    </div>
  );

  return (
    <div
      className={classnames(
        'CharactersFilter bg-grey p-2 mt-4 flex flex-row',
        props.className
      )}
    >
      {flag}
      {keywordsPicker}
    </div>
  );
});
