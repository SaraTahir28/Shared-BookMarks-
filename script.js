
import { getUserIds, getData, setData,clearData } from "./storage.js";

const userSelect = document.getElementById("userSelect");
const bookmarkListSection = document.getElementById("bookmarkList");
const bookmarkForm = document.getElementById("bookmarkForm");
const urlInput = document.getElementById("urlInput");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const resetDataBtn = document.getElementById("resetDataBtn")

// Populate the user dropdown
function populateUserDropdown() {
  const users = getUserIds();
  userSelect.innerHTML = '<option value="">-- Select user --</option>';

  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

// Render bookmarks for a given user
function renderBookmarks(bookmarks,container) {
  container.innerHTML = "";

  if (!bookmarks || bookmarks.length === 0) {
    container.innerHTML = "<p>No bookmarks found for this user</p>";
    return;
  }

  // Sort bookmarks in reverse chronological order
  bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const list = document.createElement("ul");
  bookmarks.forEach((bookmark) => {
    const item = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title || bookmark.url;
    link.target = "_blank";

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const timeStamp = document.createElement("small");
    timeStamp.textContent = `Added: ${new Date(bookmark.createdAt).toLocaleString()}`;

    item.appendChild(link);
    item.appendChild(description);
    item.appendChild(timeStamp);
    list.appendChild(item);
  });

  container.appendChild(list);
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const userId = userSelect.value;
  if (!userId) {
    alert("Please select a user before adding a bookmark.");
    return;
  }

  if (!urlInput.value || !titleInput.value || !descriptionInput.value) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  const newBookmark = {
    url: urlInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
    createdAt: new Date().toISOString(),
  };

  const bookmarks = getData(userId) || [];
  bookmarks.push(newBookmark);
  setData(userId, bookmarks);

  bookmarkForm.reset();
  renderBookmarks(bookmarks,bookmarkListSection);
}
//reset all user data
function resetAllUserData() {
  const users = getUserIds();
  users.forEach(userId => clearData(userId));
}

document.addEventListener("DOMContentLoaded", () => { //Wrap DOM-dependent code in DOMContentLoaded → code runs only after the DOM exists → no null errors.
  populateUserDropdown()

if(bookmarkForm)bookmarkForm.addEventListener("submit", handleFormSubmit);//bookmark eventlistener

if(userSelect)userSelect.addEventListener("change", () => {
  const bookmarks = getData(userSelect.value) || [];
    renderBookmarks(bookmarks, bookmarkListSection);
  });

if(descriptionInput)descriptionInput.addEventListener("keydown", (event) => { //descriptioninput event listener.
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // prevents creating a new line
    bookmarkForm.requestSubmit(); // submits the form 
  }
});
if(resetDataBtn)resetDataBtn.addEventListener("click", () => {
  resetAllUserData();
  alert("All user data has been cleared.");
  bookmarkListSection.innerHTML = "<p>Select a user to view their bookmarks.</p>";
});
})

export { renderBookmarks,populateUserDropdown};