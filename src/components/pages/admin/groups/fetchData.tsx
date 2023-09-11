export const fetchData = async () => {

  const response = await fetch(`http://localhost:3000/api/admin/groups`, { cache: "no-cache" });
  const data = await response.json();
  console.log('取って来れてる？:',data)
  return data;
};
