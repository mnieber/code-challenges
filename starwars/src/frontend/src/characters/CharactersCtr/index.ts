import { setCallbacks } from 'aspiration';
import { getm, facet, installPolicies, registerFacets } from 'skandha';
import { makeCtrObservable } from 'skandha-mobx';
import { mapDataToFacet, ClassMemberT as CMT } from 'skandha';
import { Filtering, FilteringCbs } from 'skandha-facets/Filtering';
import { getIds } from 'src/utils/ids';
import { Highlight } from 'skandha-facets/Highlight';
import { Inputs } from 'src/characters/CharactersCtr/facets/Inputs';
import { Outputs } from 'src/characters/CharactersCtr/facets/Outputs';
import {
  Selection,
  SelectionCbs,
  handleSelectItem,
} from 'skandha-facets/Selection';
import * as FacetHandlers from 'skandha-facets';
import * as FacetPolicies from 'skandha-facets/policies';

type PropsT = {};

export class CharactersCtr {
  @facet filtering: Filtering = new Filtering();
  @facet highlight: Highlight = new Highlight();
  @facet selection: Selection = new Selection();
  @facet inputs: Inputs = new Inputs();
  @facet outputs: Outputs = new Outputs();

  _setCallbacks(props: PropsT) {
    const ctr = this;

    setCallbacks(this.highlight, {
      highlightItem: {},
    });

    setCallbacks(this.filtering, {
      apply: {
        exit(this: FilteringCbs['apply']) {
          FacetPolicies.highlightIsCorrectedOnFilterChange(ctr.filtering);
        },
      },
      setEnabled: {},
    });

    setCallbacks(this.selection, {
      selectItem: {
        selectItem(this: SelectionCbs['selectItem']) {
          handleSelectItem(ctr.selection, this.itemSelectedProps);
          FacetPolicies.highlightFollowsSelection(
            ctr.selection,
            this.itemSelectedProps
          );
        },
      },
    });
  }

  _applyPolicies(props: PropsT) {
    const inputItems = [Inputs, 'characters'] as CMT;
    const itemById = [Outputs, 'characterById'] as CMT;

    const policies = [
      // selection
      FacetHandlers.selectionActsOnItems(getm(itemById)),

      // highlight
      FacetHandlers.highlightActsOnItems(getm(itemById)),

      // filtering
      FacetHandlers.filteringActsOnItems(getm(inputItems)),

      // display
      mapDataToFacet(getm([Filtering, 'filteredItems']), [Outputs, 'display']),
      mapDataToFacet(
        getm([Outputs, 'display']),
        [Selection, 'selectableIds'],
        getIds
      ),
    ];

    installPolicies<CharactersCtr>(policies, this);
  }

  constructor(props: PropsT) {
    registerFacets(this);
    this._setCallbacks(props);
    this._applyPolicies(props);
    makeCtrObservable(this);
  }
}
