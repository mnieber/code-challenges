// import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from 'src/app/StoreProvider';
import { ResourceView } from 'src/utils/components/ResourceView';
import { VegaLite } from 'react-vega';
import { spec } from './table';

export const MetricsOverview = observer(() => {
  const { metricsStore } = useStore();

  const barData = {
    table: metricsStore.all,
  };

  const noItems = <h2>There are no metrics</h2>;

  const updatedDiv = (
    <div className="MetricsOverview flex flex-col w-64 mx-auto mt-16">
      <h1 className="text-2xl">Metrics</h1>
      {!!metricsStore.all && <VegaLite spec={spec as any} data={barData} />}
      {!metricsStore.all && noItems}
    </div>
  );

  return (
    <ResourceView
      rs={metricsStore.metricByIdRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="text-white">{message}</div>;
      }}
    />
  );
});
