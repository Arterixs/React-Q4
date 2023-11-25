export const getUpdateParams = (page: string, value: string) => {
  const updateParams = {
    page,
    search: value,
  };
  return updateParams;
};
