# linespeed

## Running

Run `docker compose up` and then open a browser window at localhost:3000.

## Limitations

Because of lack of time, and being relatively slow when setting up a new project, the code
does not yet meet the requirements:

- not threadsafe (in fact, the nr of threads is limited to just one thread, to ensure that a single
  in-memory data store is used)
- only a boxplot, but no table, and no mouse hover events connecting the two
- no tests yet
- the response format for querying the metrics is slightly different from the specs (the metrics
  are not nested inside a "metrics" map but placed directly in the root)

## Notes

- A histogram is made of all measurements, keeping only the measurements from the last 60 minutes
- The bin width of the histogram is one second
- Complexity of storing measurements and retrieving metrics is O(1) in space and time
