const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completionMessage = document.getElementById("completion-message");

function addTask() {
  if (inputBox.value === "") {
    alert("Write something here!");
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
    checkAllCompleted();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
    checkAllCompleted();
  }
});

function checkAllCompleted() {
  const totalTasks = listContainer.getElementsByTagName("li").length;
  const completedTasks = listContainer.getElementsByClassName("checked").length;

  if (totalTasks > 0 && totalTasks === completedTasks) {
    completionMessage.style.display = "block";
  } else {
    completionMessage.style.display = "none";
  }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
  const data = localStorage.getItem("data");
  if (data) {
    listContainer.innerHTML = data;
    Array.from(listContainer.getElementsByTagName("li")).forEach((li) => {
      li.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
          e.target.classList.toggle("checked");
          saveData();
          checkAllCompleted();
        } else if (e.target.tagName === "SPAN") {
          e.target.parentElement.remove();
          saveData();
          checkAllCompleted();
        }
      });
    });
  }
}

showList();
