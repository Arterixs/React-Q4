import { getPlanets } from './getPlanets';

const DEFAULT_ELEM = 10;

export const getResultRequest = async (value: string, page: string, amountElem: number) => {
  if (amountElem === DEFAULT_ELEM) {
    const resultApi = await getPlanets(value, page);
    if (resultApi) {
      return { results: resultApi.results, count: resultApi.count, finalCount: resultApi.count };
    }
    return null;
  }
  const amountRequest = amountElem / DEFAULT_ELEM;
  let countLoop = 1;
  const requests = [];
  while (countLoop <= amountRequest) {
    const resultApi = getPlanets(value, String(countLoop));
    requests.push(resultApi);
    countLoop += 1;
  }
  const resultRequests = await Promise.all(requests);
  const checkResults = resultRequests.some((item) => item !== null);
  if (checkResults) {
    const result = resultRequests.map((item) => item!.results).flat();
    const countElem = resultRequests[0]!.count;
    const finalCount = Math.ceil(countElem / amountRequest);
    return { results: result, count: finalCount, finalCount: countElem };
  }
  return null;
};
