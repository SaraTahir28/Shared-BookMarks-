/**
 * @jest-environment jsdom  //tells jest to use jsdom simulating a browser like DOM in node.js.
 */
import { renderBookmarks } from "./script.js";
describe("renderBookmarks", () => {
  let container; //initiate container element which resets after each test- holds Dom element where we render bookmarks

  beforeEach(() => {  //runs before each test
    document.body.innerHTML = `<section id="bookmarkList"></section>`; //inserts a section element in document body and assigns it to the container.
    container = document.getElementById("bookmarkList");
  });

  test("renders 'No bookmarks found' for empty array", () => { //handles empty data correctly
    renderBookmarks([], container);
    expect(container.innerHTML).toContain("No bookmarks found for this user");
  });
  test("renders multiple bookmarks in reverse chronological order", () => {
  const bookmarks = [
    { url: "https://first.com", title: "first", description: "first bookmark", createdAt: "2025-09-01T12:00:00Z" },
    { url: "https://second.com", title: "second", description: "Second bookmark", createdAt: "2025-10-01T12:00:00Z" },
  ];

  renderBookmarks(bookmarks, container);

  const links = container.querySelectorAll("a"); //selects all a elements in the container.
  expect(links[0].textContent).toBe("second"); // newest first
  expect(links[1].textContent).toBe("first");
});

})
