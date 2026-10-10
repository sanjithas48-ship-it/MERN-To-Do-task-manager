
let tasks = [];

let currentFilter = "all";


// Show today's date

function showDate() {

    let today = new Date();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    document.getElementById("day").innerText =
        days[today.getDay()];

    document.getElementById("date").innerText =
        today.toLocaleDateString();
}

showDate();


// Add Task

function addTask() {

    let input = document.getElementById("taskInput");

    let text = input.value.trim();

    if (text === "") {

        alert("Please enter a task!");

        return;
    }

    let task = {

        id: Date.now(),

        text: text,

        completed: false

    };

    tasks.push(task);

    input.value = "";

    displayTasks();

}


// Complete Task

function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

    });

    displayTasks();
}


// Delete Task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    displayTasks();
}


// Filter Tasks

function filterTasks(filter) {

    currentFilter = filter;

    document
        .querySelectorAll(".filters button")
        .forEach(function(button) {

            button.classList.remove("active");

        });

    event.target.classList.add("active");

    displayTasks();
}


// Display Tasks

function displayTasks() {

    let list = document.getElementById("taskList");

    let empty = document.getElementById("emptyMessage");

    list.innerHTML = "";


    let filteredTasks = tasks;


    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(function(task) {

            return !task.completed;

        });

    }


    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {

            return task.completed;

        });

    }


    if (filteredTasks.length === 0) {

        empty.style.display = "block";

    } else {

        empty.style.display = "none";

    }


    filteredTasks.forEach(function(task) {

        let div = document.createElement("div");

        div.className = "task";

        if (task.completed) {

            div.classList.add("completed");

        }


        div.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="task-text">
                    ${task.text}
                </span>

            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>

        `;


        list.appendChild(div);

    });


    updateStats();

}


// Update Statistics

function updateStats() {

    let total = tasks.length;

    let completed =
        tasks.filter(function(task) {

            return task.completed;

        }).length;

    let pending = total - completed;


    document.getElementById("total").innerText = total;

    document.getElementById("completed").innerText = completed;

    document.getElementById("pending").innerText = pending;

}


// Enter key

document
    .getElementById("taskInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    });


displayTasks();
