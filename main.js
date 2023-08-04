//HTMLに配置したパーツをそれぞれ取り込む
const time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

// 開始した時間
let startTime;
// 停止した時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

// 時間を表示する関数
function displayTime() {
    //new Date=Dateオブジェクトを生成（現在時刻　ー　ストップウォッチを開始した時刻　＋　〃を停止した時刻）
  const currentTime = new Date(Date.now() - startTime + stopTime);

  //　時・分・秒・ミリ秒をそれぞれ取得できるように割り振る　
  //なぜかhの値を−９にしないと０にならない　なぜかmsの表示が１桁にならない、３桁になる
  //定数　h ＝　文字列（進行中の時間.時間のプロパティを取得.）
  const h = String(currentTime.getHours()-9);
  const m = String(currentTime.getMinutes());
  const s = String(currentTime.getSeconds());
  const ms = String(currentTime.getMilliseconds());

  //HTMLのTimeに上記で取得した時刻を表示（textContent）する
  time.textContent = `${h}:${m}:${s}:${ms}`;
  //タイムアウトの処理　後々この関数で行う「時間を測り続ける処理」を止めるために設定しておく
  timeoutID = setTimeout(displayTime,0);　　
}

// addEventListenerで、スタートボタンがクリックされたら時間を進めると共に、スタートボタンとリセットボタンを非活性化する
//無名関数（第二引数に直接関数を記述する）が使われている。
startButton.addEventListener('click', function() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  startTime = Date.now();//開始時刻に現在時刻を代入
  displayTime();//display関数を呼び出すことで、カウントされている時間を表示する
});

// ストップボタンがクリックされたら時間を止めると共に、ストップボタンだけ非活性化する
stopButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearTimeout(timeoutID);//setTimeoutで実行したタイマー処理を終了させるものが、clearTimeout
  stopTime += (Date.now() - startTime);//表示時刻を累積させるためのコード　
});

// リセットボタンがクリックされたら時間を0に戻すと共に、スタートボタンだけ活性化する
resetButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  time.textContent = '0:0:0:0';　//時間の表示を０に戻す
  stopTime = 0; //リセットボタンが押されたら、０を代入して最初の状態に戻す
});