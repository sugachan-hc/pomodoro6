// 変数
let pomodoro = 25 * 60 * 1000;  //1ポモドーロの長さ(デフォルト)
let shortBreak = 5 * 60 * 1000; //短時間休憩(デフォルト)
let longBreak = 15 * 60 * 1000; //長時間休憩(デフォルト)
let longBreakInterval = 4;
let currentMode = "Work";

let numberWorkIntervals = longBreakInterval;
let time = pomodoro;
let interval;

function getElement(id) {
  return document.getElementById(id);
}

// DOM 
const timer = getElement('timer');
const timerTitle = getElement('timerTitle');
const circle = getElement('circle');
const modeEl = getElement('mode');

const automaticWorkStart = document.getElementById('setting_automatic_work_start');
const automaticBreakStart = document.getElementById('setting_automatic_break_start');
const soundNotification = document.getElementById('setting_sound_notification');
const displayMessage = document.getElementById('setting_display_message');

const playButton = document.getElementById("play-button");
playButton.addEventListener("click", function () {
  const circle = document.getElementById("circle");
  const angle = circle.style.getPropertyValue("--angle");
  const color = circle.style.getPropertyValue("--color");

  if (angle === "360deg" && color === "red") {
    createText();
  }

}, false);

updateCountdown(time);
timerTitle.innerText = "Simple Pomodoro Timer";

// 関数
function countdown(pTime) {
  interval = setInterval(() => {
    pTime -= 1000;
    if (pTime <= 0) {
      clearInterval(interval);
      numberWorkIntervals = currentMode == "Work" ? numberWorkIntervals - 1 : numberWorkIntervals;
      swapMode();
    }

    updateCountdown(pTime);
  }, 1000)
}

function swapMode() {
  if (currentMode == "Work") {
    if (numberWorkIntervals == 0) {
      currentMode = "LongRest";
      time = longBreak;

    } else {
      currentMode = "Rest";
      time = shortBreak;
    }
  } else if (currentMode == "Rest") {
    currentMode = "Work";
    time = pomodoro;
  } else if (currentMode == "LongRest") {
    currentMode = "Work";
    time = pomodoro;
    numberWorkIntervals = longBreakInterval;
  }
  updateCountdown(time);
  countdown(time);
}

function updateCountdown(pTime) {
  if (pTime <= 0) {
    circle.style.setProperty('--angle', '360deg');
    if (soundNotification.checked) {
      document.getElementById('btn_audio').play();
    }

    // 休憩時間になったら自動で開始する:ON
    if (!automaticWorkStart.checked && currentMode == "Work") {
      pause();
    }
    // 作業時間になったら自動で開始する:ON
    if (!automaticBreakStart.checked && currentMode != "Work") {
      pause();
    }
  } else {
    let color;
    let angle;

    if (currentMode == "Work") {
      color = "red";
      angle = (pTime / pomodoro * 360) + 'deg';

    } else if (currentMode == "Rest") {
      color = "blue";
      angle = (pTime / shortBreak * 360) + 'deg';

    } else {
      color = "green";
      angle = (pTime / longBreak * 360) + 'deg';
    }

    circle.style.setProperty('--angle', angle);
    circle.style.setProperty('--color', color);

    let minutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, "0");
    let seconds = ((pTime / 1000) % 60).toString().padStart(2, "0")
    timer.innerText = minutes + ":" + seconds;
    timerTitle.innerText = timer.innerText; //追加
    modeEl.innerText = currentMode + ` ${numberWorkIntervals}`;
  }
}

function play() {
  clearInterval(interval);
  countdown(time);
  document.getElementsByClassName('pause')[0].classList.remove('d-none');
  document.getElementsByClassName('play')[0].classList.add('d-none');
}

function pause() {
  clearInterval(interval);
  let [minutes, seconds] = timer.innerText.split(":");
  time = ((minutes * 60) + seconds * 1) * 1000;
  document.getElementsByClassName('play')[0].classList.remove('d-none');
  document.getElementsByClassName('pause')[0].classList.add('d-none');
}

function stop() {
  currentMode = "Work";
  numberWorkIntervals = longBreakInterval;
  time = pomodoro;
  document.getElementsByClassName('pause')[0].classList.add('d-none');
  document.getElementsByClassName('play')[0].classList.remove('d-none');
  clearInterval(interval);
  updateCountdown(time);
}

function setImage() {
  let bgImage;
  let selectedOption = document.querySelector('input[name="setting[theme]"]:checked').id;

  switch (selectedOption) {
    case 'option1': bgImage = 'option1.jpg'; break;
    case 'option2': bgImage = 'option2.jpg'; break;
    case 'option3': bgImage = 'option3.jpg'; break;
    default: bgImage = 'option1.jpg';
  }

  localStorage.setItem('bgImage', bgImage);
  document.body.style.backgroundImage = `url(${bgImage})`;
}

// DOM要素の値を取得
function getElementValue(id) {
  return document.getElementById(id).value;
}

// 設定反映
function applySettings() {
  // DOM
  let pomodoroMinutes = getElementValue('setting_work_minute');
  let pomodoroSeconds = getElementValue('setting_work_second');

  let shortBreakMinutes = getElementValue('setting_short_break_minute');
  let shortBreakSeconds = getElementValue('setting_short_break_second');

  let longBreakMinutes = getElementValue('setting_long_break_minute');
  let longBreakSeconds = getElementValue('setting_long_break_minute');

  let pomodoroIntervals = getElementValue('setting_work_interval');

  // 画面表示部分
  pomodoro = pomodoroMinutes * 60 * 1000 + pomodoroSeconds * 1000;
  shortBreak = shortBreakMinutes * 60 * 1000 + shortBreakSeconds * 1000;
  longBreak = longBreakMinutes * 60 * 1000 + longBreakSeconds * 1000;
  longBreakInterval = pomodoroIntervals;
  currentMode = "Work";

  numberWorkIntervals = longBreakInterval;
  time = pomodoro;

  // 背景画像セット
  setImage();

  clearInterval(interval);
  updateCountdown(time);
}

function closeSettings() {
  let settingsList = document.querySelectorAll('.settings-list')[0];
  settingsList.style.right = "-33vw";
  let width = window.innerWidth; // 現在のウィンドウの幅を取得
  if (width > 768) {
    width = width / 3
  }
  settingsList.style.right = `-${width}px`; // 現在のウィンドウの幅分だけ右に移動
}

function openSettings() {
  let settingsList = document.querySelectorAll('.settings-list')[0];
  settingsList.style.right = "0";
}

// 応援メッセージを動的に作成する
async function createText() {
  const message1 = getElementValue('start_message1');
  const message2 = getElementValue('start_message2');
  const message3 = getElementValue('start_message3');
  const messages = [message1, message2, message3];

  const divText = document.createElement('div');
  divText.id = "text";
  divText.style.cssText = `
    position: absolute;
    white-space: nowrap;
    font-size: 400px;
    left: ${document.documentElement.clientWidth}px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9999;
    color: white;
    font-family: "Hachi Maru Pop", cursive;
    font-weight: 400;
    font-style: normal;
  `;

  divText.textContent = messages[Math.floor(Math.random() * messages.length)];
  document.body.appendChild(divText); //body直下へ挿入

  await gsap.to("#" + divText.id, { x: -1 * (document.documentElement.clientWidth + divText.clientWidth), duration: 3.5, ease: "linear" });

  divText.parentNode.removeChild(divText); //画面上の移動終了後に削除
}

window.onload = function () {
  var playButton = document.querySelector('.play');
  playButton.addEventListener('click', function () {
    play(); // play 関数を呼び出す
  });

  var pauseButton = document.querySelector('.pause');
  pauseButton.addEventListener('click', function () {
    pause(); // pause 関数を呼び出す
  });

  var stopButton = document.querySelector('.stop');
  stopButton.addEventListener('click', function () {
    stop(); // stop 関数を呼び出す
  });

  var openButton = document.querySelector('.open');
  openButton.addEventListener('click', function () {
    openSettings(); // openSettings 関数を呼び出す
  });

  var closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', function () {
    closeSettings(); // closeSettings 関数を呼び出す
  });

  var applyButton = document.querySelector('.apply');
  applyButton.addEventListener('click', function () {
    applySettings(); // applySettings 関数を呼び出す
  });

  // 画面ロードした際に実行したい関数
  setImage();
  applySettings();
};

//for debug
// openSettings();


