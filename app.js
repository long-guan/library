const bookContainer = document.querySelector(".book-container");

const addBook = document.querySelector(".add-button").addEventListener('click', ()=> {
    addBookContainer();
    console.log('working');
})

function addBookContainer() {
    const newBook = document.createElement("div");
    newBook.className = "book";
    addBookInfo(newBook, "title", "Book Title");
    addBookInfo(newBook, "authur", "Book Author");
    addBookInfo(newBook, "page", "# of Pages")
    addCheckBox(newBook);
    addBookInfo(newBook, "date", "Date Published")
    addSVG(newBook);
    bookContainer.appendChild(newBook);
}

function addBookInfo(newBook, className, info) {
    const newTitle = document.createElement("div");
    newTitle.className = className;
    const content = document.createTextNode(info);
    newTitle.appendChild(content);
    newBook.appendChild(newTitle);
}

function addCheckBox(newBook) {
    const newLabel = document.createElement("label");
    newLabel.className = "read-slider";
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox"
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
    const newSVG = document.createElement("SVG");
    newSVG.classList.add("edit-button");
    const newSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newSVGPath.setAttribute("d", d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z");
    newSVGPath.style.fill = "currentColor";
    newSVG.appendChild(newSVGPath)
    editDeleteCont.appendChild(newSVG);
    newBook.appendChild(editDeleteCont);
}
