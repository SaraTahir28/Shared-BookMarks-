/**
 * @jest-environment jsdom
 */
import { renderBookmarks } from "./script.js";
describe("renderBookmarks", () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = `<section id="bookmarkList"></section>`;
    container = document.getElementById("bookmarkList");
  });

  test("renders 'No bookmarks found' for empty array", () => {
    renderBookmarks([], container);
    expect(container.innerHTML).toContain("No bookmarks found for this user");
  });
})