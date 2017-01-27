// 8.1b JavaScriptでサーボ
'use strict'                            // 厳格モードにする

// Johnny-fiveの準備
const five = require('johnny-five');    // johnny-fiveモジュールの読み込み
const comPort = 'COM25';                // ★要書き換え：ArduinoのCOMポート番号
const arduino = new five.Board( {port: comPort} );  // ボードの取得

// サーボの準備と制御
const pinServo = 3;                     // LEDを接続したピン番号
let servo;                              // サーボ制御用オブジェクトの用意
arduino.on('ready', function() {        // Arduinoの準備ができたら
    servo = new five.Servo(pinServo);   // サーボを取得
    servo.sweep();                      // サーボを往復させる
});
