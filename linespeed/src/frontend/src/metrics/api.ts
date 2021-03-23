import { always, flow, map } from 'lodash/fp';
import { doQuery } from 'src/app/client';

export function getMetrics() {
  const query = `{
    metrics {
      lineId,
      min,
      max,
      avg
    }
  }`;
  return doQuery(query, {}).then((response) => {
    return {
      metrics: flow(
        always(response.metrics),
        map((x: any) => ({ ...x, id: x.lineId }))
      )(),
    };
  });
}
