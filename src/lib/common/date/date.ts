export const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 0~24時までの配列
export const timeArr = () => {
  const times: number[] = [];
  for (let i = 0; i < 24; i++) {
    times.push(i);
  }
  return times;
};
