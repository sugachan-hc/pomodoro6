// let workTime = 25 * 60 * 1000;
// let restTime = 5 * 60 * 1000;
// let longRestTime = 15 * 60 * 1000;
let workTime = 25 * 60 * 1000;
let restTime = 5 * 60 * 1000;
let longRestTime = 15 * 60 * 1000;

let intervalCount = 2;
let numberWorkIntervals = intervalCount;
let currentMode = "Work";
let time = workTime;

let interval;

const timer = document.getElementById('timer');
const timerTitle = document.getElementById('timerTitle');
const dataPercent = document.querySelectorAll('.data-percent');
const modeEl = document.getElementById('mode');

// check later この変数名見直せ
const checkbox = document.getElementById('flexSwitchCheckChecked');


const messageCheckbox = document.getElementById('messageCheckbox');

// check later この変数名見直せ
const button01 = document.getElementById("button01");
button01.addEventListener("click", function () {
  console.log("messageCheckbox.value:", messageCheckbox.value);
  if (messageCheckbox.checked) {
    createText()
  }
}, false);

updateCountdown(time);
// countdown(time); 削除
timerTitle.innerText = "Simple Pomodoro Timer"; //追加

function countdown(pTime) {
  interval = setInterval(() => {
    pTime -= 1000;
    // time = pTime;
    if (pTime <= 0) {
      clearInterval(interval);
      numberWorkIntervals = currentMode == "Work" ? numberWorkIntervals - 1 : numberWorkIntervals;
      // if (numberWorkIntervals > 0) {
      //   swapMode();
      // }
      swapMode();
    }

    updateCountdown(pTime);

  }, 1000)
}


// function swapMode() {
//   currentMode = currentMode == "Work" ? "Rest" : "Work";
//   time = currentMode == "Work" ? workTime : restTime;

//   updateCountdown(time);
//   countdown(time);
// }

function swapMode() {
  if (currentMode == "Work") {
    if (numberWorkIntervals == 0) {
      currentMode = "LongRest";
      time = longRestTime;

    } else {
      currentMode = "Rest";
      time = restTime;
    }
  } else if (currentMode == "Rest") {
    currentMode = "Work";
    time = workTime;
  } else if (currentMode == "LongRest") {
    currentMode = "Work";
    time = workTime;
    numberWorkIntervals = intervalCount;
  }

  updateCountdown(time);
  countdown(time);
}

// function swapMode() {
//   if (numberWorkIntervals <= 0) {
//     currentMode = "Work"; // ワーク間隔がすべて終了した場合は再度"Work"モードに戻る
//     numberWorkIntervals = intervalCount;
//     time = workTime;
//   } else {
//     currentMode = currentMode == "Work" ? "Rest" : "Work";
//     numberWorkIntervals = currentMode == "Work" ? numberWorkIntervals : numberWorkIntervals - 1;
//     time = currentMode == "Work" ? workTime : restTime;
//   }

//   updateCountdown(time);
//   countdown(time);
// }

function updateCountdown(pTime) {

  // if (numberWorkIntervals <= 0) {
  //   dataPercent[0].style.setProperty('--angle', '360deg');
  //   // dataPercent[0].style.setProperty('--color', 'red');
  //   dataPercent[0].style.setProperty('--color', 'yellow');
  //   timer.innerText = "00:00";
  //   modeEl.innerText = "END";
  // }

  if (pTime <= 0) {
    dataPercent[0].style.setProperty('--angle', '360deg');
    // dataPercent[0].style.setProperty('--color', 'red');
    // timer.innerText = "00:00";
    if (checkbox.checked) {
      document.getElementById('btn_audio').play();
    }
  } else {
    // let color = currentMode == "Work" ? "blue" : "red";
    // let angle = (pTime / (currentMode == "Work" ? workTime : restTime) * 360) + 'deg';
    let color;
    let angle;

    if (currentMode == "Work") {
      color = "red"; //done
      angle = (pTime / workTime * 360) + 'deg';
    } else if (currentMode == "Rest") {
      color = "blue"; //done
      angle = (pTime / restTime * 360) + 'deg';
    } else {
      color = "green"; //done
      angle = (pTime / longRestTime * 360) + 'deg';
    }

    dataPercent[0].style.setProperty('--angle', angle);
    dataPercent[0].style.setProperty('--color', color);

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
  console.log(numberWorkIntervals);
  let [minutes, seconds] = timer.innerText.split(":");
  time = ((minutes * 60) + seconds * 1) * 1000;
  document.getElementsByClassName('play')[0].classList.remove('d-none');
  document.getElementsByClassName('pause')[0].classList.add('d-none');
}

// function reset() {
//   currentMode = "Work";
//   numberWorkIntervals = intervalCount;
//   time = workTime;

//   document.getElementsByClassName('pause')[0].classList.remove('d-none');
//   document.getElementsByClassName('play')[0].classList.add('d-none');

//   clearInterval(interval);
//   updateCountdown(time);
//   countdown(time);
// }

function stop() {
  currentMode = "Work";
  numberWorkIntervals = intervalCount;
  time = workTime;
  document.getElementsByClassName('pause')[0].classList.add('d-none');
  document.getElementsByClassName('play')[0].classList.remove('d-none');
  clearInterval(interval);
  updateCountdown(time);
}


function setImage() {
  let bgImage;
  // ラジオボタンの値を取得する★
  // let selectedOption = document.querySelector('input[name="options"]:checked').id;
  let selectedOption = document.querySelector('input[name="setting[theme]"]:checked').id;
  console.log("Selected option:", selectedOption);

  // 選択されたオプションに応じて画像を変更する
  // let bgImage;
  switch (selectedOption) {
    case 'option1':
      bgImage = 'option1.jpg';
      break;
    case 'option2':
      bgImage = 'option2.jpg';
      break;
    case 'option3':
      bgImage = 'option3.jpg';
      break;
    default:
      bgImage = 'option1.jpg'; // デフォルトの画像を設定する場合
  }

  localStorage.setItem('bgImage', bgImage);
  // 画像を表示するimg要素のsrc属性を更新する
  // document.getElementById('bg-test1').src = bgImage;
  // document.body.style.backgroundImage = `url(${bgImage})`;
  // document.body.style.backgroundImage = "url('<%= asset_path('pic2.jpg') %>')";
  document.body.style.backgroundImage = `url(${bgImage})`;
  // console.log("pic:", url("pic1.jpg"));
  console.log("pic:", document.body.style.backgroundImage);
}



function applyNewTimes() {
  let workTimeInputMinutes = document.getElementById('work-time-minutes').value;
  let workTimeInputSeconds = document.getElementById('work-time-seconds').value;
  let workIntervalInputs = document.getElementById('work-time-intervals').value;
  let restTimeInputMinutes = document.getElementById('rest-time-minutes').value;
  let restTimeInputSeconds = document.getElementById('rest-time-seconds').value;
  let longRestTimeInputMinutes = document.getElementById('long-rest-time-minutes').value;
  let longRTimeInputSeconds = document.getElementById('long-rest-time-seconds').value;

  workTime = workTimeInputMinutes * 60 * 1000 + workTimeInputSeconds * 1000;
  restTime = restTimeInputMinutes * 60 * 1000 + restTimeInputSeconds * 1000;
  longRestTime = longRestTimeInputMinutes * 60 * 1000 + longRTimeInputSeconds * 1000;

  intervalCount = workIntervalInputs;

  numberWorkIntervals = intervalCount;
  currentMode = "Work";
  time = workTime;

  console.log(workTime, restTime, intervalCount);

  setImage();

  clearInterval(interval);
  updateCountdown(time);
  // countdown(time);
}

// ★以下の2つ使ってない
// 背景画像を切り替える関数
// function switchBackground() {
//   const newBackground = 'pic2.jpg';
//   document.body.style.backgroundImage = `url(${newBackground})`;
// }

// クリックイベントをリッスンして背景画像を切り替える
// document.addEventListener('DOMContentLoaded', function () {
//   const body = document.body;
//   body.addEventListener('click', switchBackground);
// });

function closeSettings() {
  let settingsList = document.querySelectorAll('.settings-list')[0];
  settingsList.style.right = "-20vw";
}

function openSettings() {
  let settingsList = document.querySelectorAll('.settings-list')[0];
  settingsList.style.right = "0";
}

async function createText() {
  let div_text = document.createElement('div');
  div_text.id = "text"; //アニメーション処理で対象の指定に必要なidを設定
  // div_text.id = "text" + count; //アニメーション処理で対象の指定に必要なidを設定
  // count++;
  div_text.style.position = 'absolute'; //テキストのは位置を絶対位置にするための設定
  div_text.style.whiteSpace = 'nowrap'; //画面右端での折り返しがなく、画面外へはみ出すようにする
  div_text.style.fontSize = '400px';
  div_text.style.left = (document.documentElement.clientWidth) + 'px'; //初期状態の横方向の位置は画面の右端に設定
  // var random = document.documentElement.clientHeight / 3;
  div_text.style.top = '50%';  //初期状態の縦方向の位置は画面の上端から下端の間に設定（ランダムな配置に）
  // div_text.appendChild(document.createTextNode('移動するテキスト' + count)); //画面上に表示されるテキストを設定
  div_text.style.transform = 'translateY(-50%)';

  let startMessage1 = document.getElementById('start_message1').value;
  let startMessage2 = document.getElementById('start_message2').value;
  let startMessage3 = document.getElementById('start_message3').value;

  // let arr = ['がんばるぞ！', '全集中！', 'やればできる！'];
  let arr = [startMessage1, startMessage2, startMessage3];
  div_text.appendChild(document.createTextNode(arr[Math.floor(Math.random() * arr.length)])); //画面上に表示されるテキストを設定
  document.body.appendChild(div_text); //body直下へ挿入

  div_text.style.zIndex = '9999';
  div_text.style.color = 'white';

  // div_text.fadeOut(1000);

  //ライブラリを用いたテキスト移動のアニメーション： durationはアニメーションの時間、
  //        横方向の移動距離は「画面の横幅＋画面を流れるテキストの要素の横幅」、移動中に次の削除処理がされないようawait
  // await gsap.to("#" + div_text.id, { duration: 5, x: -1 * (document.documentElement.clientWidth + div_text.clientWidth) });
  await gsap.to("#" + div_text.id, { x: -1 * (document.documentElement.clientWidth + div_text.clientWidth), duration: 3.5, ease: "linear" });

  div_text.parentNode.removeChild(div_text); //画面上の移動終了後に削除
}

window.onload = function () {
  // ボタンがクリックされたときの処理を定義
  var playButton = document.querySelector('.play');
  playButton.addEventListener('click', function () {
    play(); // play 関数を呼び出す
  });

  // ボタンがクリックされたときの処理を定義
  var pauseButton = document.querySelector('.pause');
  pauseButton.addEventListener('click', function () {
    pause(); // pause 関数を呼び出す
  });

  // ボタンがクリックされたときの処理を定義
  var stopButton = document.querySelector('.stop');
  stopButton.addEventListener('click', function () {
    stop(); // stop 関数を呼び出す
  });

  var closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', function () {
    closeSettings(); // closeSettings 関数を呼び出す
  });

  var openButton = document.querySelector('.open');
  openButton.addEventListener('click', function () {
    openSettings(); // openSettings 関数を呼び出す
  });

  var applyButton = document.querySelector('.apply');
  applyButton.addEventListener('click', function () {
    applyNewTimes(); // applyNewTimes 関数を呼び出す
  });

  setImage();
  console.log("bgImage", bgImage);
  // document.body.style.backgroundImage = `url(${bgImage})`;
};
