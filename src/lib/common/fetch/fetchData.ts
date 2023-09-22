export const fetchData = async (endPoint:string) => {

  const url = process.env['BE_URL']
  const response = await fetch(`${url}/${endPoint}`, { cache: "no-cache" });
  const data = await response.json();
  return data;
};
