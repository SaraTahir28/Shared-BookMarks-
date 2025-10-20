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
  test("renders multiple bookmarks in reverse chronological order", () => {
  const bookmarks = [
    { url: "https://first.com", title: "first", description: "first bookmark", createdAt: "2025-09-01T12:00:00Z" },
    { url: "https://second.com", title: "second", description: "Second bookmark", createdAt: "2025-10-01T12:00:00Z" },
  ];

  renderBookmarks(bookmarks, container);

  const links = container.querySelectorAll("a");
  expect(links[0].textContent).toBe("second"); // newest first
  expect(links[1].textContent).toBe("first");
});

})
