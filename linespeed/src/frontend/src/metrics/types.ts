export type MetricsT = {
  id: string;
  lineId: string;
  min: number;
  max: number;
  avg: number;
};

export type MetricsByIdT = {
  [id: string]: MetricsT;
};
