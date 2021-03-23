import os
import random
import sys
import time

import requests


def current_milli_time():
    return round(time.time() * 1000)


def report(x: str):
    print(x, file=sys.stderr)


def post_random_speed_event():
    line_id = int(random.random() * 10)
    timestamp_ms = current_milli_time()
    speed = random.normalvariate(2000, 20)
    query = f"""
mutation createSpeedMeasurement {{
  createSpeedMeasurement(measurementForm: {{
    lineId: "{line_id}",
    timestampMs: {timestamp_ms},
    value: {speed}
  }}) {{
    success
  }}
}}
"""
    requests.post(
        os.environ["LINESPEED_SERVICE_HOST"] + "/graphql", json=dict(query=query)
    )


def main():
    while True:
        time.sleep(random.random())
        post_random_speed_event()


if __name__ == "__main__":
    report("linespeed: Posting measurement events\n")
    main()
