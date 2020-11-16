import assert from "assert";
import { validateHttpsUrl } from "../validateHttpsUrl";

describe("validateHttpsUrl", () => {
  describe("valid", () => {
    [
      "https://example.com/path/to?foo=bar&baz=piyo#hash",
      "https://localhost:8080",
      "https://127.0.0.1:8000",
      "https://user:pass@example.com/",
    ].forEach((url) => {
      it(url, () => {
        assert(validateHttpsUrl(url));
      });
    });
  });

  describe("invalid", () => {
    [
      "http://example.com",
      "ftp://example.com",
      "://example.com",
      "//example.com",
      "/path/to/foo",
      "./path/to/foo",
      "path/to/foo",
    ].forEach((url) => {
      it(url, () => {
        assert(!validateHttpsUrl(url));
      });
    });
  });

  describe("`allowHttp`", () => {
    describe("valid", () => {
      ["https://example.com", "http://example.com"].forEach((url) => {
        it(url, () => {
          assert(validateHttpsUrl(url, true));
        });
      });
    });

    describe("invalid", () => {
      [
        "ftp://example.com",
        "://example.com",
        "//example.com",
        "/path/to/foo",
        "./path/to/foo",
        "path/to/foo",
      ].forEach((url) => {
        it(url, () => {
          assert(!validateHttpsUrl(url));
        });
      });
    });
  });
});
