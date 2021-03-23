import graphene
from measurements.schema import MeasurementsMutations, MeasurementsQuery

schema = graphene.Schema(query=MeasurementsQuery, mutation=MeasurementsMutations)
