
import { getUserIds, getData, setData,clearData } from "./storage.js"; //handle reading, writing, and clearing bookmarks in localStorage.
//DOM references to key HTML elements so you can interact with them in JavaScript.
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
  userSelect.innerHTML = '<option value="">Select user</option>';

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
    container.innerHTML = "<p>No bookmarks found for this user</p>"; //innerhtml because we want to insert and HTML P element and not simple text.
    return;
  }

  // Sort bookmarks in reverse chronological order
  bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); //createdAt is our ISOtimestamp string that we covert into a dateObject,if diff is +, b comes first else its a.

  const list = document.createElement("ul");
  bookmarks.forEach((bookmark) => {    //loop through each bookmark array and for each create a li element.
    const item = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title || bookmark.url;
    link.target = "_blank"; //blank is a target attribute that tells browser to open the link in new window.

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
  event.preventDefault(); //preventing page reload

  const userId = userSelect.value; //validating all input are made.
  if (!userId) {
    alert("Please select a user before adding a bookmark.");
    return;
  }

  if (!urlInput.value || !titleInput.value || !descriptionInput.value) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  const newBookmark = { //creating a new bookmark object
    url: urlInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
    createdAt: new Date().toISOString(), 
  };

  const bookmarks = getData(userId) || []; //getting existing bookmarks from the user through local storage.
  bookmarks.push(newBookmark);
  setData(userId, bookmarks);

  bookmarkForm.reset(); //reset all user inputs
  renderBookmarks(bookmarks,bookmarkListSection);//passing bookmarks section makes the function reusabale and flexible as we are not hardcoding the htmlelement inside the function.
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

if(descriptionInput)descriptionInput.addEventListener("keydown", (event) => { //reacts when any key is pressed down
  if (event.key === "Enter" && !event.shiftKey) { //also checks that shift is not pressed.
    event.preventDefault(); // prevents creating a new line which is default behavior for an enter key.
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