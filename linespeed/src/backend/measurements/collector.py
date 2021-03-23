import time
from dataclasses import dataclass


def current_milli_time():
    return round(time.time() * 1000)


@dataclass
class RunningAvg:
    sum: float = 0
    count: int = 0

    @property
    def value(self):
        return self.sum / self.count if self.count else None

    def add(self, value):
        self.sum += value
        self.count += 1


class Bucket:
    def __init__(self, timestamp_ms):
        self.timestamp_ms = timestamp_ms
        self.avg = RunningAvg()
        self.min = None
        self.max = None

    def add(self, value):
        self.avg.add(value)
        self.min = value if self.min is None else min(self.min, value)
        self.max = value if self.max is None else max(self.max, value)


class Collector:
    def __init__(self, bucket_size_ms, nr_buckets):
        self.bucket_size_ms = bucket_size_ms
        self.nr_buckets = nr_buckets
        self.buckets = []

    def shrink_buckets(self, now):
        min_timestamp_ms = now - self.nr_buckets * self.bucket_size_ms
        while self.buckets and (self.buckets[0].timestamp_ms < min_timestamp_ms):
            self.buckets.pop(0)

    def grow_buckets(self, now):
        while (
            self.buckets and (self.buckets[-1].timestamp_ms + self.bucket_size_ms) < now
        ):
            bucket = Bucket(self.buckets[-1].timestamp_ms + self.bucket_size_ms)
            self.buckets.append(bucket)

    def add(self, timestamp_ms, value):
        now = current_milli_time()
        bucket_nr = int((now - timestamp_ms) / self.bucket_size_ms)
        if bucket_nr > self.nr_buckets:
            return False

        self.shrink_buckets(now)
        if not self.buckets:
            self.buckets.append(Bucket(timestamp_ms))
        self.grow_buckets(now)
        self.buckets[-1 - bucket_nr].add(value)
        return True
