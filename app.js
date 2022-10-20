const bookContainer = document.querySelector(".book-container");
const formInput = document.querySelector(".form-input");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-authur");
const inputPages = document.querySelector("#input-pages");
const checkBox = document.querySelector("#input-checkbox");
const inputDate = document.querySelector("#input-date");


let myLibrary = [];

// exit button in form
const exit = document.querySelector(".exit").addEventListener('click', ()=>{
    hideFormUnblur();
});

const deleteBook = document.querySelector(".delete-button").addEventListener("click", ()=> {
    console.log(event.target.parentNode.parentNode);
    event.target.remove(event.target.parentNode.parentNode);
})

// + button to show form
const addBook = document.querySelector(".add-button").addEventListener('click', ()=> {
    showFormBlur();
})

// enter button in form
const submit = document.querySelector(".submit").addEventListener('click', ()=> {
    const newBook = new createBook(inputTitle.value, inputAuthor.value, inputPages.value, checkBox.checked, inputDate.value);
    myLibrary.push(newBook);
    addBookContainer(newBook);
    hideFormUnblur();
    clearForm();
})

function createBook(title, author, pages, checkbox, date) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.checkbox = checkbox;
    this.date = date;
}

function clearForm() {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    checkBox.checked = false;
    inputDate.value = "";
}

// shows form and blurs background
function showFormBlur() {
    formInput.style.display = "flex";
    bookContainer.classList.add("blur");
}

// hide form and unblurs background
function hideFormUnblur() {
    formInput.style.display = "none";
    bookContainer.classList.remove("blur");
}

// creates book structure and elements
function addBookContainer(input) {
    const newBook = document.createElement("div");
    newBook.className = "book";
    console.log(input.title);
    addBookInfo(newBook, "title", input.title);
    addBookInfo(newBook, "authur", "By: " + input.author);
    addBookInfo(newBook, "page", input.pages + " Pages");
    addCheckBox(newBook, input.checkbox);
    addBookInfo(newBook, "date", "Published: " + input.date);
    addSVG(newBook);
    bookContainer.appendChild(newBook);
}

// creates a new DIV
function addBookInfo(newBook, className, info) {
    const newDiv = document.createElement("div");
    newDiv.className = className;
    const content = document.createTextNode(info);
    newDiv.appendChild(content);
    newBook.appendChild(newDiv);
}

// creates a new checkbox
function addCheckBox(newBook, checkbox) {
    const newLabel = document.createElement("label");
    newLabel.className = "read-slider";
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox"
    newCheckBox.checked = checkbox;
    const newSpan = document.createElement("span");
    const content = document.createTextNode("Mark As Read");
    newSpan.appendChild(content);
    newLabel.appendChild(newCheckBox);
    newLabel.appendChild(newSpan);
    newBook.appendChild(newLabel);
}

function addSVG(newBook) {
    const editDeleteCont = document.createElement("div");
    editDeleteCont.classList.add("edit-delete");
    editDeleteCont.appendChild(addEdit());
    editDeleteCont.appendChild(addDelete());
    newBook.appendChild(editDeleteCont);
}

// creates new SVG edit button
function addEdit() {
    const newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSVG.classList.add("edit-button");
    const newSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newSVGPath.setAttribute("fill", "currentColor");
    newSVGPath.setAttribute("d", "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z");
    newSVG.appendChild(newSVGPath);
    return newSVG;
}

// creates new SVG delete button
function addDelete() {
    const newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSVG.classList.add("delete-button");
    const newSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newSVGPath.setAttribute("fill", "currentColor");
    newSVGPath.setAttribute("d", "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z");
    newSVG.appendChild(newSVGPath);
    return newSVG;
}
