import collections
import uuid

import graphene
import pydantic
from graphene_pydantic import PydanticInputObjectType, PydanticObjectType
from starlette.graphql import GraphQLApp

from measurements.collector import Collector, RunningAvg, current_milli_time
from measurements.models import MeasurementModel, MetricsModel

collector_by_line_id = collections.defaultdict(
    lambda: Collector(bucket_size_ms=1000, nr_buckets=3600)
)


class MeasurementForm(PydanticInputObjectType):
    class Meta:
        model = MeasurementModel


class Metrics(PydanticObjectType):
    class Meta:
        model = MetricsModel


class MetricsQuery(graphene.ObjectType):
    metrics = graphene.List(Metrics)

    @staticmethod
    def resolve_metrics(self, info, **kwargs):
        result = []
        now = current_milli_time()
        for line_id, collector in collector_by_line_id.items():
            avg = RunningAvg()
            min_value = None
            max_value = None
            collector.shrink_buckets(now)
            for bucket in collector.buckets:
                if not bucket.avg.count:
                    continue

                avg.add(bucket.avg.value)
                min_value = (
                    bucket.min if min_value is None else min(min_value, bucket.min)
                )
                max_value = (
                    bucket.max if max_value is None else max(max_value, bucket.max)
                )

            if min_value is not None:
                result.append(
                    MetricsModel(
                        line_id=line_id, min=min_value, max=max_value, avg=avg.value
                    )
                )

        return result


class CreateSpeedMeasurement(graphene.Mutation):
    class Arguments:
        measurement_form = graphene.Argument(MeasurementForm)

    success = graphene.Boolean()

    @staticmethod
    def mutate(parent, info, measurement_form):
        collector = collector_by_line_id[measurement_form.line_id]
        success = collector.add(measurement_form.timestamp_ms, measurement_form.value)
        return dict(success=success)


class MeasurementsQuery(MetricsQuery):
    pass


class MeasurementsMutations(graphene.ObjectType):
    create_speed_measurement = CreateSpeedMeasurement.Field()
