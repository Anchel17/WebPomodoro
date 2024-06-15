var timerValue = document.getElementById('timer');
var body = document.getElementById('select-body');
var timerContainer = document.getElementById('container-timer');
var mainTimerMode = document.getElementById('pomodoro');
var shortTimerMode = document.getElementById('short-break');
var longTimerMode = document.getElementById('long-break');
var darkModeBtn = document.getElementById('toggle-dark-mode');
var githubBtn = document.getElementById('github');
var startBtn = document.getElementById('start-btn');
var tasksOptionButton = document.getElementById('task-list-options');
var addTaskButton = document.getElementById('add-task-btn');
var taskListElement = document.getElementById('task-list')
var timerInterval;
var isTimerActive = false;
var globalTimerMode;
var taskList = [];
var isEditMode = false;
var editedTaskId;


function initApp(){
    getTimerValue('#ba4949', '#c86d6d', '#c15c5c', 'main', '#ba4949', '#c66a6a', '#ab4343', '25:00');
    loadTaskList();
}

function getTimerValue(backgroundColor, headerBtnsColor, timerContainerColor, timerMode,
                        startBtnColor, taskOptionBtnColor, addTaskBtnColor, tempo){
    globalTimerMode = timerMode;
    startBtn.innerHTML = '<h1>START</h1>';
    
    if(isTimerActive){
        clearInterval(timerInterval);
        isTimerActive = false;
    }

    body.style.setProperty('--background-primary-color', backgroundColor);

    darkModeBtn.style.setProperty('--header-button-color', headerBtnsColor);
    githubBtn.style.setProperty('--header-button-color', headerBtnsColor);
    
    setActiveMode(timerMode);

    timerContainer.style.setProperty('--timer-background-color', timerContainerColor);

    setActiveBtnColor(timerMode);
    
    startBtn.style.setProperty('--start-btn-text-color', startBtnColor);

    tasksOptionButton.style.setProperty('--tasks-option-btn-color', taskOptionBtnColor);

    addTaskButton.style.setProperty('--add-task-btn-color', addTaskBtnColor);

    timerValue.innerText = tempo;
}

function loadTaskList(){
    if(taskList.length == 0){
        return;
    }
    taskListElement.innerHTML = '';
    taskListElement.style.display = 'flex';

    taskList.forEach(t => {
        taskListElement.innerHTML += 
                `    
            <div class="task">
                <div class="task-status">
                    <div class="task-check-title">
                        <img src="./img/check.svg" alt="check task">
                        <h2 class="title-task-from-list">${t.title}</h2>
                    </div>
                    <img src="./img/edit.svg" alt="edit task" class="edit-task" onclick="openEditModal(${t.id})">
                </div>
                <div class="task-note">
                    <p class="note-task-from-list">${t.note}</p>
                </div>
            </div>`
    })
}

function setActiveMode(timerMode){
    switch(timerMode){
        case 'main': 
            mainTimerMode.classList = ['timer-select-btn active-btn color-transition-time'];
            shortTimerMode.classList = ['timer-select-btn color-transition-time'];
            longTimerMode.classList = ['timer-select-btn color-transition-time'];
            break;
        case 'short':
            shortTimerMode.classList = ['timer-select-btn active-btn color-transition-time'];
            mainTimerMode.classList = ['timer-select-btn color-transition-time'];
            longTimerMode.classList = ['timer-select-btn color-transition-time'];
            break;
        case 'long' :
            longTimerMode.classList = ['timer-select-btn active-btn color-transition-time'];
            mainTimerMode.classList = ['timer-select-btn color-transition-time'];
            shortTimerMode.classList = ['timer-select-btn color-transition-time'];
            break;
        default:
            mainTimerMode.classList = ['timer-select-btn active-btn color-transition-time'];
    }
}

function setActiveBtnColor(timerMode){
    switch(timerMode){
        case 'main': 
            mainTimerMode.style.setProperty('--timer-active-button-color', '#a44e4e');
            break;
        case 'short':
            shortTimerMode.style.setProperty('--timer-active-button-color', '#417b80');
            break;
        case 'long' :
            longTimerMode.style.setProperty('--timer-active-button-color', '#426c8a');
            break;
        default:
            mainTimerMode.style.setProperty('--timer-active-button-color', '#a44e4e');
    }            
}

startBtn.addEventListener('click', () =>{
    if(timerValue.innerText == "00:00"){
        return;
    }

    if(isTimerActive){
        clearInterval(timerInterval);
        startBtn.innerHTML = '<h1>START</h1>';
        startBtn.classList = ['text-color-transition-time'];
        isTimerActive = !isTimerActive;
        return; 
    }
    
    isTimerActive = !isTimerActive;
    startBtn.innerHTML = '<h1>PAUSE</h1>';
    startBtn.classList = ['text-color-transition-time active-start-btn'];

    let minutes = timerValue.innerText.split(':')[0];
    let seconds = timerValue.innerText.split(':')[1];

    if(minutes[0] == '0'){
        minutes = minutes[1];
    }

    if(seconds[0] == '0'){
        seconds = seconds[1];
    }

    function updateTimerDisplay(){
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

        timerValue.innerText = `${displayMinutes}:${displaySeconds}`;
    }

    function countdown() {
        if (seconds == 0) {
            if (minutes == 0) {
                clearInterval(timerInterval);
                isTimerActive = false;
                playAlarm();
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }

    clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(countdown, 1000);
})

document.getElementById('form').addEventListener('submit', function(){
    event.preventDefault();
    
    const title = document.getElementById('modal-title').value;
    const note = document.getElementById('modal-note').value;
    
    if (title.trim() === '') {
        alert('Title is required!');
        return;
    }
    
    if(isEditMode){
        taskList.forEach(t => {
            if(t.id == editedTaskId){
                t.title = title;
                t.note = note;
            }
        });
        isEditMode = false;
        loadTaskList();
        document.getElementById('modal-background').style.display = 'none';
        return;
    }

    saveTask(title, note);
    document.getElementById('modal-background').style.display = 'none';
})

document.getElementById('cancel-button').addEventListener('click', function(){
    document.getElementById('modal-background').style.display = 'none';
})

addTaskButton.addEventListener('click', function(){
    document.getElementById('modal-background').style.display = 'flex';
})

function playAlarm(){
    let audio;
    switch(globalTimerMode){
        case 'main':
            audio = new Audio('./sounds/mainAlarm.mp3');
            break;
        case 'short':
            audio = new Audio('./sounds/shortAlarm.mp3');
            break;
        case 'long':
            audio = new Audio('./sounds/longAlarm.mp3');
            break;
        default:
            audio = new Audio('./sounds/mainAlarm.mp3');
    }

    audio.play();
}

function soundEffect(){
    if(timerValue.innerText != '00:00'){
        new Audio('./sounds/timerButton.mp3').play();
    }
}

function saveTask(title, note){
    const task = new Task(taskList.length + 1, title, note);

    taskList.push(task);

    taskListElement.style.display = 'flex';

    taskListElement.innerHTML += 
                `    
            <div class="task">
                <div class="task-status">
                    <div class="task-check-title">
                        <img src="./img/check.svg" alt="check task">
                        <h2 class="title-task-from-list">${task.title}</h2>
                    </div>
                    <img src="./img/edit.svg" alt="edit task" class="edit-task" onclick="openEditModal(${task.id})">
                </div>
                <div class="task-note">
                    <p class="note-task-from-list">${task.note}</p>
                </div>
            </div>
            `
}

function openEditModal(taskId){
    isEditMode = true;
    document.getElementById('modal-background').style.display = 'flex';

    let task = taskList.find(t => t.id == taskId);
    console.log(task)

    document.getElementById('modal-title').value = task.title;
    document.getElementById('modal-note').value = task.note;

    editedTaskId = taskId;
}