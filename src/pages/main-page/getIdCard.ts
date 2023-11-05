export const getIdCard = (url: string) => {
  const indexSlash = url.lastIndexOf('/', url.length - 2);
  const id = url.slice(indexSlash + 1, url.length - 1);
  return id;
};
