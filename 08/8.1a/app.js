// 8.1a JavaScriptでLチカ

// Arduino IDE でプログラミングはせず、JavaScriptでArduinoを制御する。
// チャットを作った時に使った Node.js を使う。
// これができると、つまり、Arduino が Web につながる。

// あらかじめArduinoをPCに接続し、
// Arduino IDE で'StandardFirmata.ino'を開き、Arduinoに書き込んでおく。

'use strict';                            // 厳格モードにする

// Johnny-fiveの準備
const five = require('johnny-five');    // johnny-fiveモジュールの読み込み
const comPort = 'COM25';                // ★要書き換え：ArduinoのCOMポート番号
const arduino = new five.Board( {port: comPort} );  // ボードの取得

// LEDの準備と制御
const pinLED = 3;                       // LEDを接続したピン番号
let led;                                // LED制御用オブジェクトの用意
arduino.on('ready', function() {        // Arduinoの準備ができたら
    led = new five.Led(pinLED);         // LEDを取得
    led.blink(100);                     // LEDを点滅（間隔をmsで指定）
});
