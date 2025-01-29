let tasks = [];
let events = [];

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() === "") return;

    tasks.push({ task: taskInput, completed: false });
    document.getElementById("taskInput").value = ""; // Clear input field
    updateTasks();
}

function markTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTasks();
}

function updateTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    tasks.forEach((t, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span style="text-decoration: ${t.completed ? 'line-through' : 'none'}">${t.task}</span>
            <button onclick="markTask(${index})">${t.completed ? 'Undo' : 'Done'}</button>
        `;
        taskList.appendChild(li);
    });

    updateProgress();
}

function addEvent() {
    let eventInput = document.getElementById("eventInput").value;
    let eventDate = document.getElementById("eventDate").value;
    if (eventInput.trim() === "" || eventDate === "") return;

    events.push({ event: eventInput, date: eventDate });
    document.getElementById("eventInput").value = "";
    document.getElementById("eventDate").value = "";
    updateEvents();
}

function updateEvents() {
    let eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    events.forEach((e, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${e.event} - ${e.date}</span>`;
        eventList.appendChild(li);
    });
}

function updateProgress() {
    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;
    let percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById("progressText").innerText = `${percentage}% Completed`;

    // Fetch motivational quote
    fetch("/quote?progress=" + percentage)
        .then(response => response.json())
        .then(data => {
            let quoteElement = document.getElementById("motivationQuote");
            quoteElement.innerText = `"${data.quote}"`;
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
        });
}
