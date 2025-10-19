
import { getUserIds,getData,setData,clearData } from "./storage.js";

const userSelect = document.getElementById('userSelect');
const bookmarkListSection = document.getElementById('bookmarkList');
const bookmarkForm = document.getElementById('bookmarkForm');
const urlInput = document.getElementById('urlInput');
const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');

function populateUserDropdown() {
  const users = getUserIds();//Get user IDs from storage.js
  userSelect.innerHTML = '<option value="">-- Select user --</option>'; //keep default option

  // Add one <option> for each user
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}
function renderBookmarks(){
  bookmarkListSection.innerHTML ="";
  if(!bookmarks || bookmarks.length === 0){
    bookmarkListSection.innerHTML ="<p>No bookmarks found for this user</p>";
    return  //stops the function here so the rest of the code doesn't run
  }
  const list = document.createElement("ul")
  bookmarks.forEach((bookmark) => {
    const item = document.createElement("li"); 
    const link = document.createElement("a"); // <a> element (hyperlink).
    link.href = bookmark.url;
    link.textContent = bookmark.title || bookmark.url; //visiblecontent
    link.target = "_blank"; //target attribute on a tag -blank means open the url in a new tab

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    item.appendChild(link);
    item.appendChild(description); //each <li> contains the clickable link and its description
    list.appendChild(item); //li gets appended to ul.
  
})
}