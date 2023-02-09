console.log("welcome to js");
showNotes();

//if user add a note add it to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addtitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let myobj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  noteObj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  addTxt.value = "";
  addTitle.value = "";
  console.log(noteObj);
  showNotes();
});
// functon to show the notes

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach((element, index) => {
    html += ` <div class=" notesCards my-2 mx-2 card" style="width: 18rem;">   
    <div class="card-body">
      <h5 class="card-title"> ${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <button id="${index}" onClick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (noteObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "add note" section to add note`;
  }
}
//function to delete notes
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let notesCards = document.getElementsByClassName("notesCards");
  Array.from(notesCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;
    if (cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
