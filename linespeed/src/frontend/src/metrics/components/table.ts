export const spec = {
  width: 400,
  height: 200,
  mark: 'bar',
  encoding: { y: { field: 'lineId', type: 'nominal', title: 'Line number' } },
  layer: [
    {
      mark: { type: 'rule' },
      encoding: {
        x: {
          field: 'min',
          type: 'quantitative',
          scale: { zero: false },
          title: null,
        },
        x2: { field: 'max' },
      },
    },
    {
      mark: { type: 'tick', color: 'black', size: 14 },
      encoding: {
        x: { field: 'avg', type: 'quantitative' },
      },
    },
  ],
  data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
};
