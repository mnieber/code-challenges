import React from 'react';

import { EffectWithoutArgs } from 'src/app/components/Effect';
import { useStore } from 'src/app/StoreProvider';

type PropsT = {};

export const LoadMetricsEffect: React.FC<PropsT> = (p: PropsT) => {
  const { metricsStore } = useStore();
  return (
    <EffectWithoutArgs
      f={() => {
        metricsStore.loadMetrics();
      }}
    />
  );
};
