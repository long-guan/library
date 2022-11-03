const bookContainer = document.querySelector(".book-container");
const formInput = document.querySelector(".form-input");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-authur");
const inputPages = document.querySelector("#input-pages");
const checkBox = document.querySelector("#input-checkbox");
const inputDate = document.querySelector("#input-date");
const confirmDelete = document.querySelector(".confirm-delete");
const totalBookDisplay = document.querySelector('.total-books');
const totalBooksRead = document.querySelector('.total-books-read');
const totalPagesDisplay = document.querySelector('.total-pages');
const totalPagesRead = document.querySelector('.total-pages-read');


let myLibrary = [];

// exit button in form
const exit = document.querySelector(".exit").addEventListener('click', ()=>{
    hideFormUnblur();
});

// + button to show form
const addBook = document.querySelector(".add-button").addEventListener('click', ()=> {
    showFormBlur();
})

// enter button in form
const submit = document.querySelector(".submit").addEventListener('click', ()=> {
    const newBook = new createBook(inputTitle.value, inputAuthor.value, inputPages.value, checkBox.checked, inputDate.value);
    myLibrary.push(newBook);
    addBookContainer();
    hideFormUnblur();
    clearForm();
})

// creates book structure and elements and appends to book-container
function addBookContainer() {
    for (const book of myLibrary) {
        if (book.display == false) {
            const newBookCont = document.createElement("div");
            newBookCont.className = "book";
            newBookCont.classList.add(book.order);
            addBookInfo(newBookCont, "title", book.title);
            addBookInfo(newBookCont, "authur", "By: " + book.author);
            addBookInfo(newBookCont, "page", book.pages + " Pages");
            addCheckBox(newBookCont, book.read);
            addBookInfo(newBookCont, "date", "Published: " + book.date);
            addSVG(newBookCont);
            newBookCont.appendChild(createConfirmPopup())
            bookContainer.appendChild(newBookCont);
            book.display = true;
        }
    }
    updateStats();
}

// creates a new DIV
function addBookInfo(newBookCont, className, info) {
    const newDiv = document.createElement("div");
    newDiv.className = className;
    const content = document.createTextNode(info);
    newDiv.appendChild(content);
    newBookCont.appendChild(newDiv);
}

function createBook(title, author, pages, checkbox, date) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = checkbox;
    this.date = date;
    this.order = myLibrary.length;
    this.display = false;
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

// creates a new checkbox
function addCheckBox(newBookCont, checkbox) {
    const newLabel = document.createElement("label");
    newLabel.className = "read-slider";
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.checked = checkbox;
    const newSpan = document.createElement("span");
    const content = document.createTextNode("Mark As Read");
    newSpan.appendChild(content);
    newLabel.appendChild(newCheckBox);
    newLabel.appendChild(newSpan);
    newBookCont.appendChild(newLabel);
    newCheckBox.addEventListener("click", updateReadStatus);
}

function updateReadStatus(evt) {
    console.log(evt.currentTarget);
    if (myLibrary[matchClassToOrder(evt)].read == false) {
        myLibrary[matchClassToOrder(evt)].read = true;
    } else {
        myLibrary[matchClassToOrder(evt)].read = false;
    }
    totalBooksRead.innerHTML = updateTotalBooksRead();
    totalPagesRead.innerHTML = updateTotalPagesRead();
    console.log(updateTotalBooksRead());
}

function matchClassToOrder(evt) {
    let order = 0;
    console.log(evt.currentTarget.parentNode.parentNode);
    for (let book of myLibrary) {
        if (book.order == evt.currentTarget.parentNode.parentNode.className.match(/\d/g)) {
            break;
        } else {
            order++;
        }
    }
    return order;
}

function addSVG(newBookCont) {
    const editDeleteCont = document.createElement("div");
    editDeleteCont.classList.add("edit-delete");
    editDeleteCont.appendChild(addEdit());
    editDeleteCont.appendChild(addDelete());
    newBookCont.appendChild(editDeleteCont);
}

// creates new SVG edit button
function addEdit() {
    const newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSVG.classList.add("edit-button");
    const newSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newSVGPath.setAttribute("fill", "currentColor");
    newSVGPath.setAttribute("d", "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z");
    newSVG.appendChild(newSVGPath);
    newSVG.addEventListener("click", showFormEdit);
    return newSVG;
}


//* start of form edit for revising the inputted book info
const formEdit = document.querySelector('.form-edit');
const editTitle = document.querySelector('#edit-title');
const editAuthur = document.querySelector('#edit-author');
const editPages = document.querySelector('#edit-pages');
const editDate = document.querySelector('#edit-date');
const editSubmit = document.querySelector('.edit-submit');
const editExit = document.querySelector('.edit-exit');

function showFormEdit() {
    console.log(this.parentNode.parentNode.className);
    formEdit.style.display = "flex";
    bookContainer.classList.add("blur");
    copyInfotoEdit(this);
    editSubmit.addEventListener("click", ()=>{
        editArrayBook(this);
        updateBookDisplay(this);
        formEdit.style.display = "none";
        bookContainer.classList.remove("blur");
    })

}

editExit.addEventListener("click", ()=>{
    formEdit.style.display = "none";
    bookContainer.classList.remove("blur");
});

//----------------------------------------------------------------------
// uses array data to display current book info in edit form
function copyInfotoEdit(book) {
    editTitle.value = myLibrary[MatchClassOrder(book)].title;
    editAuthur.value = myLibrary[MatchClassOrder(book)].author;
    editPages.value = myLibrary[MatchClassOrder(book)].pages;
    editDate.value = myLibrary[MatchClassOrder(book)].date;
}

// sets the array data to the edited book info
function editArrayBook(book) {
    myLibrary[MatchClassOrder(book)].title = editTitle.value;
    myLibrary[MatchClassOrder(book)].author = editAuthur.value;
    myLibrary[MatchClassOrder(book)].pages = editPages.value;
    myLibrary[MatchClassOrder(book)].date = editDate.value;
}

// updates the html display for book info
function updateBookDisplay(book) {
    book.parentNode.parentNode.children[0].innerHTML = myLibrary[MatchClassOrder(book)].title;
    book.parentNode.parentNode.children[1].innerHTML = myLibrary[MatchClassOrder(book)].author;
    book.parentNode.parentNode.children[2].innerHTML = myLibrary[MatchClassOrder(book)].pages;
    book.parentNode.parentNode.children[4].innerHTML = myLibrary[MatchClassOrder(book)].date;
}
// end of form edit for revising the inputted boook info*
// ------------------------------------------------------------------------

// matches the class number to the order of the array stored in myLibrary to match up the displayed info to the array info
function MatchClassOrder(btn) {
    let order = 0;
    console.log(btn.parentNode.parentNode);
    for (let book of myLibrary) {
        if (book.order == btn.parentNode.parentNode.className.match(/\d/g)) {
            break;
        } else {
            order++;
        }
    }
    console.log(order)
    return order;
}

// creates new SVG delete button
function addDelete() {
    const newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSVG.classList.add("delete-button");
    const newSVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newSVGPath.setAttribute("fill", "currentColor");
    newSVGPath.setAttribute("d", "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z");
    newSVG.appendChild(newSVGPath);
    newSVG.addEventListener("click", showConfirmDelete);
    return newSVG;
}


// displays the confirm pop up
function showConfirmDelete(evt) {
    evt.currentTarget.parentNode.nextElementSibling.style.display = "flex"; // displays confirm-delete popup
    blurBooks();
    evt.currentTarget.parentNode.nextElementSibling.children[1].children[1].addEventListener("click", ()=>{ // selects no button
        this.parentNode.nextElementSibling.style.display = "none";
        removeBlurBooks();
    });
    evt.currentTarget.parentNode.nextElementSibling.children[1].children[0].addEventListener("click", ()=>{ // selects yes button
        console.log(this.parentNode.parentNode.className);
        let index = 0;
        console.log();
        // iterates through myLibrary array to find the matching one to delete
        for (let book of myLibrary) {
            if (book.order == this.parentNode.parentNode.className.match(/\d/g)) {
                break;
            } else {
                index++;
            }
        }
        myLibrary.splice(index, 1);
        this.parentNode.parentNode.remove();
        removeBlurBooks();
        updateStats();
    });
}

// removes book from myLibrary array by iterating through and matching
function removeFromLibArray() {
    let index = 0;
    console.log();
    for (let book in myLibrary) {
        if (book.order == this.parentNode.parentNode.className.match(/\d/g)) {
            return index;
        } else {
            index++;
        }
    }
}

// blurs all the book contents
function blurBooks() {
    const allTitle = document.querySelectorAll('.title');
    allTitle.forEach(book => book.classList.add('blur'));
    const allAuthur = document.querySelectorAll('.authur');
    allAuthur.forEach(authur => authur.classList.add('blur'));
    const allPage = document.querySelectorAll('.page');
    allPage.forEach(page => page.classList.add('blur'));
    const allDate = document.querySelectorAll('.date');
    allDate.forEach(date => date.classList.add('blur'));
    const allReadSlider = document.querySelectorAll('.read-slider');
    allReadSlider.forEach(slider => slider.classList.add('blur'));
    const allEditDelete = document.querySelectorAll('.edit-delete');
    allEditDelete.forEach(editDelete => editDelete.classList.add('blur'));
}

// removes blur from book contents
function removeBlurBooks() {
    const allTitle = document.querySelectorAll('.title');
    allTitle.forEach(book => book.classList.remove('blur'));
    const allAuthur = document.querySelectorAll('.authur');
    allAuthur.forEach(authur => authur.classList.remove('blur'));
    const allPage = document.querySelectorAll('.page');
    allPage.forEach(page => page.classList.remove('blur'));
    const allDate = document.querySelectorAll('.date');
    allDate.forEach(date => date.classList.remove('blur'));
    const allReadSlider = document.querySelectorAll('.read-slider');
    allReadSlider.forEach(slider => slider.classList.remove('blur'));
    const allEditDelete = document.querySelectorAll('.edit-delete');
    allEditDelete.forEach(editDelete => editDelete.classList.remove('blur'));
}

function removeSVG(evt) {
    console.log(evt.currentTarget);
    evt.currentTarget.parentNode.parentNode.remove();
    hideConfirmDelete();
}

// creates individual confirm popup for each book
function createConfirmPopup() {
    const newContainer = document.createElement('div');
    newContainer.classList.add("confirm-delete");
    const newDiv = document.createElement('div');
    const content = document.createTextNode("Are you sure you want to delete this book?");
    newDiv.appendChild(content);
    const newDiv2 = document.createElement('div');
    const yesButton = document.createElement("button");
    yesButton.classList.add("confirm-yes");
    const yesContent = document.createTextNode("Yes");
    yesButton.appendChild(yesContent);
    const noButton = document.createElement("button");
    const noContent = document.createTextNode("No");
    noButton.appendChild(noContent);
    noButton.classList.add("confirm-no");
    newDiv2.appendChild(yesButton);
    newDiv2.appendChild(noButton);
    newContainer.appendChild(newDiv);
    newContainer.appendChild(newDiv2);
    return newContainer;
}


//* start of update for stats
function updateStats() {
    totalBookDisplay.innerHTML = myLibrary.length;
    totalBooksRead.innerHTML = updateTotalBooksRead();
    totalPagesDisplay.innerHTML = updateTotalPages();
    totalPagesRead.innerHTML = updateTotalPagesRead();
}

function updateTotalBooksRead() {
    let booksRead = 0;
    for (let book of myLibrary) {
        if (book.read == true) {
            booksRead++;
        }
    }
    return booksRead;
}

function updateTotalPages() {
    let totalPages = 0;
    for (let book of myLibrary) {
        totalPages += parseInt(book.pages);
    }
    return totalPages;
}

function updateTotalPagesRead() {
    let totalPagesRead = 0;
    for (let book of myLibrary) {
        if (book.read == true) {
            totalPagesRead += parseInt(book.pages);
        }
    }
    return totalPagesRead;
}

//* end of update for stats
