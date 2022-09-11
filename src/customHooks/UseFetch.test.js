import useFetch from "./useFetch";
import { renderHook } from "@testing-library/react-hooks";

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("useFetch", () => {
  it("return data after fetch", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve("hello"),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("test.com")
    );
    await waitForNextUpdate();

    expect(result.current).toStrictEqual({
      response: "hello",
      isPending: false,
      error: "",
    });
  });
});
