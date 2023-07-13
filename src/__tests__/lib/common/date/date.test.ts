import {
  getDayArrInMonth,
  getThis_NextYear,
  monthArr,
  timeArr,
} from "@/lib/common/date/date";

describe("lib/common/date/date.tsテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("年の配列", () => {
    const thisYear = new Date().getFullYear();
    expect(getThis_NextYear()).toEqual([thisYear, thisYear + 1]);
  });
  it("月の配列(1~12)", () => {
    expect(monthArr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
  describe("日の配列", () => {
    describe("正常系", () => {
      it("31日", () => {
        expect(getDayArrInMonth(2023, 7)).toEqual(thirty_oneDays);
      });
      it("30日", () => {
        expect(getDayArrInMonth(2023, 6)).toEqual(thirtyDays);
      });
      it("2月", () => {
        expect(getDayArrInMonth(2023, 2)).toEqual(februaryDays);
      });
      it("うるう年", () => {
        expect(getDayArrInMonth(2024, 2)).toEqual(leapYearDays);
      });
      it("うるう年の例外(100で割り切れて400で割り切れない)", () => {
        expect(getDayArrInMonth(2100, 2)).toEqual(februaryDays);
      });
      it("stringで年/月を指定", () => {
        expect(getDayArrInMonth("2023", "7")).toEqual(thirty_oneDays);
      });
    });
    describe("異常系", () => {
      it("引数'年'の形式が不正", () => {
        const spyLog = jest.spyOn(global.console, "log")
        expect(getDayArrInMonth("hoge", 7)).toEqual(["error"]);
        expect(spyLog).toHaveBeenCalledWith('Error occured in function "getDayArrInMonth": 年または月の引数の値が不正です。');
      });
      it("引数'月'の形式が不正", () => {
        const spyLog = jest.spyOn(global.console, "log")
        expect(getDayArrInMonth("hoge", 7)).toEqual(["error"]);
        expect(spyLog).toHaveBeenCalledWith('Error occured in function "getDayArrInMonth": 年または月の引数の値が不正です。');
      });
    });
  });
  it("時間の配列(0~23)", () => {
    expect(timeArr()).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ]);
  });
});

const thirty_oneDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const thirtyDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

const februaryDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,
];

const leapYearDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29,
];
