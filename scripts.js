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
var timerInterval;
var isTimerActive = false;
var globalTimerMode;


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