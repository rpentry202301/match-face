import { fetchData } from "@/components/pages/admin/groups/fetchData";

describe("fetchData.tsx", () => {
  it("データを取得してきているか", async () => {
    const mockData = { example: "data" };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await fetchData();

    expect(result).toEqual(mockData);
  });
});
