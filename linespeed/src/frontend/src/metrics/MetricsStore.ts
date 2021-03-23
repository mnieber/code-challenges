import { action, observable, computed, makeObservable } from 'mobx';
import { forEach, flow, always, values } from 'lodash/fp';
import { MetricsByIdT, MetricsT } from 'src/metrics/types';
import { resetRS, updateRes } from 'src/utils/RST';
import * as metricsApi from 'src/metrics/api';

export class MetricsStore {
  @observable metricById: MetricsByIdT = {};
  @observable metricByIdRS: any = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action loadMetrics() {
    updateRes(
      this,
      'metricByIdRS',
      () => {
        return metricsApi.getMetrics();
      },
      (response: any) => {
        this.addMetrics(response.metrics);
      },
      (message: any) => {
        console.log(message);
        return 'Oops, there was an error getting the metrics data';
      }
    );
  }
  @action addMetrics(metrics: MetricsT[]) {
    forEach((metric) => {
      this.metricById[metric.id] = metric;
    }, metrics);
  }

  @computed get all(): MetricsT[] {
    return flow(always(this.metricById), values)();
  }
}
