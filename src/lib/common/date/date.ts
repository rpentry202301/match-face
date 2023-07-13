export const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 0~23時までの配列
export const timeArr = () => {
  const times: number[] = [];
  for (let i = 0; i < 24; i++) {
    times.push(i);
  }
  return times;
};

/**
 * 指定月の日数を取得
 * @param  {number | string} year  年
 * @param  {number | string} month 月
 * @return {number[]} 指定月の日にち一覧
 */
export const getDayArrInMonth = (
  year: number | string,
  month: number | string
) => {
  // エラーチェック
  if (Number.isNaN(Number(year)) || Number.isNaN(Number(month))) {
    console.log(
      'Error occured in function "getDayArrInMonth": 年または月の引数の値が不正です。'
    );
    return ["error"];
  }
  // 指定月の日数取得
  const lastDay = new Date(Number(year), Number(month), 0).getDate();

  // 指定月の日にち配列を出力
  const dayArr: number[] = [];
  for (let i = 1; i <= lastDay; i++) {
    dayArr.push(i);
  }

  return dayArr;
};

export const getThis_NextYear = () => {
  const year = new Date().getFullYear();
  return [year, year + 1];
};
