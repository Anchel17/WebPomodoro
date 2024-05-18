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


function getDefaultTimerValue(){
    body.removeAttribute('class');
    body.style.setProperty('--background-primary-color', '#ba4949');

    darkModeBtn.style.setProperty('--header-button-color', '#c86d6d');
    githubBtn.style.setProperty('--header-button-color', '#c86d6d');

    mainTimerMode.classList = ['timer-select-btn active-btn color-transition-time'];
    shortTimerMode.classList = ['timer-select-btn color-transition-time'];
    longTimerMode.classList = ['timer-select-btn color-transition-time'];

    timerContainer.style.setProperty('--timer-background-color', "#c15c5c");

    mainTimerMode.style.setProperty('--timer-active-button-color', '#a44e4e');

    startBtn.style.setProperty('--start-btn-text-color', '#ba4949');

    tasksOptionButton.style.setProperty('--tasks-option-btn-color', '#c66a6a');

    addTaskButton.style.setProperty('--add-task-btn-color', '#ab4343');

    timerValue.innerText = '25:00';
}

function getShortTimerValue(){
    body.className = 'short-timer-color';
    body.style.setProperty('--background-primary-color', '#38858a');

    darkModeBtn.style.setProperty('--header-button-color', '#5c9b9f');
    githubBtn.style.setProperty('--header-button-color', '#5c9b9f');

    shortTimerMode.classList = ['timer-select-btn active-btn color-transition-time'];
    mainTimerMode.classList = ['timer-select-btn color-transition-time'];
    longTimerMode.classList = ['timer-select-btn color-transition-time'];

    timerContainer.style.setProperty('--timer-background-color', '#4c9196');

    shortTimerMode.style.setProperty('--timer-active-button-color', '#417b80');

    startBtn.style.setProperty('--start-btn-text-color', '#609da1');

    tasksOptionButton.style.setProperty('--tasks-option-btn-color', '#609da1');

    addTaskButton.style.setProperty('--add-task-btn-color', '#337a7f');

    timerValue.innerText = '05:00';
}

function getLongTimerValue(){
    body.className = 'long-timer-color';
    body.style.setProperty('--background-primary-color', '#397097');

    darkModeBtn.style.setProperty('--header-button-color', '#5d8aaa');
    
    githubBtn.style.setProperty('--header-button-color', '#5d8aaa');

    longTimerMode.classList = ['timer-select-btn active-btn color-transition-time'];
    mainTimerMode.classList = ['timer-select-btn color-transition-time'];
    shortTimerMode.classList = ['timer-select-btn color-transition-time'];

    timerContainer.style.setProperty('--timer-background-color', '#4d7fa2');

    longTimerMode.style.setProperty('--timer-active-button-color', '#426c8a');

    startBtn.style.setProperty('--start-btn-text-color', '#397097');

    tasksOptionButton.style.setProperty('--tasks-option-btn-color', '#5d8aaa');

    addTaskButton.style.setProperty('--add-task-btn-color', '#34678b');

    timerValue.innerText = '15:00'
}