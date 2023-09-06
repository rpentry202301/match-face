import { NextResponse } from "next/server";
import * as Fetchers from "../../../../../app/api/(general)/questions/route";

const data = {
  id: 1,
  deadline: "2023-12-01 18:00",
  project: {
    name: "バックエンド案件",
    detail: "販促アプリの新規開発、既存システムの保守・運用。",
  },
  answered: false,
};

export function mockGetData(status = 201) {
  if (status > 299) {
    return (
      jest
        // 置き換える関数＝PostMyAddress：POSTするfetch関数
        .spyOn(Fetchers, "POST")
        // データ取得失敗した場合
        .mockRejectedValueOnce("エラーです")
    );
  }
  return (
    jest
      .spyOn(Fetchers, "POST")
      // 成功した場合
      .mockResolvedValueOnce(NextResponse.json(data))
  );
}
