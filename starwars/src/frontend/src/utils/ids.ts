export const getIds = (x: any[]) => x.map((item) => item.id);

export function listToItemById(qsList: Array<any>, key: string = 'id') {
  const result: any = {};
  qsList.forEach((item) => {
    result[item[key]] = item;
  });
  return result;
}
