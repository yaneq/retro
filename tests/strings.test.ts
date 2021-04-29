import { getNextRetroTitle } from "../src/lib/strings"

test("getInitials", () => {
  expect(getNextRetroTitle({ previousTitle: null })).toBe("retro #1")
  expect(getNextRetroTitle({ previousTitle: "" })).toBe("retro #1")
  expect(getNextRetroTitle({ previousTitle: "Tom Jones" })).toBe("Tom Jones #2")
  expect(getNextRetroTitle({ previousTitle: "something 3" })).toBe(
    "something 4"
  )
  expect(getNextRetroTitle({ previousTitle: "something 3 " })).toBe(
    "something 4"
  )
  expect(getNextRetroTitle({ previousTitle: "something 3 bla" })).toBe(
    "something 3 bla #2"
  )
  expect(getNextRetroTitle({ previousTitle: "something 323" })).toBe(
    "something 324"
  )
})
