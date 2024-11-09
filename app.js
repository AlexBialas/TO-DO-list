const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
  // Tu również dodajemy obsługę dla zdarzeń click dla elementów przywracanych z localStorage
  const data = localStorage.getItem("data");
  if (data) {
    listContainer.innerHTML = data;
    // Dodajemy event listener dla przywróconych elementów
    Array.from(listContainer.getElementsByTagName("li")).forEach((li) => {
      li.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
          e.target.classList.toggle("checked");
          saveData();
        } else if (e.target.tagName === "SPAN") {
          e.target.parentElement.remove();
          saveData();
        }
      });
    });
  }
}

showList();
