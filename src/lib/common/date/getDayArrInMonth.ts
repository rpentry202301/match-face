/**
 * 指定月の日数を取得
 * @param  {number | string} year  年
 * @param  {number | string} month 月
 * @return {number[]} 指定月の日にち一覧
 */
const getDayArrInMonth = (year: number | string, month: number | string) => {
  // エラーチェック
  if (Number.isNaN(Number(year)) || Number.isNaN(Number(month))) {
    console.error(
      'Error occured in function "getDayArrInMonth": 年、月の値が不正です。'
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

export default getDayArrInMonth;
