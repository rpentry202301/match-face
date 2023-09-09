export const fetchData = async () => {
  const url = process.env["BE_URL"];

  const response = await fetch(`${url}/groups`, { cache: "no-cache" });
  const rowData = await response.json();
  const data = rowData.groupList;
  return data;
};
