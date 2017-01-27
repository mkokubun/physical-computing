// 8.2a スマホでLチカ
'use strict'                            // 厳格モードにする

// Johnny-fiveの準備
const five = require('johnny-five');    // johnny-fiveモジュールの読み込み
const comPort = 'COM25';                // ★要書き換え：ArduinoのCOMポート番号
const arduino = new five.Board( {port: comPort} );  // ボードの取得
let arduinoReady = false;               // Arduino準備OKのフラグ
// LEDの準備
const pinLED = 3;                       // LEDを接続したピン番号
let led;                                // LED制御用オブジェクトの用意
arduino.on('ready', function() {        // Arduinoの準備ができたら
    led = new five.Led(pinLED);         // LEDを取得
    arduinoReady = true;                // Arduino準備OK
});


// ソケット通信（socket.io）の準備
const express = require('express');         // expressモジュールを使う
const app = express();                      // expressでアプリを作る
app.use(express.static(__dirname));         // ホームdirにあるファイルを使えるようにする
app.get('/', function (req, res) {          // アクセス要求があったら
    res.sendFile(__dirname + '/index.html');    // index.htmlを送る
});
const server = require('http').Server(app); // httpサーバを起動してアプリを実行
server.listen(80);                          // サーバの80番ポートでアクセスを待つ
const io = require('socket.io')(server);    // socket.ioモジュールをサーバにつなぐ


// ソケット通信によるスマホからのコントロール
io.on('connection', function(socket) {      // socket接続があって
    socket.on('on', function() {            // 'on'というイベントのsocketが来たら
        if (arduinoReady == true) {         // Arduinoが準備OKなら
            //console.log('socket [on]');     // consoleに出力
            led.on();                       // LEDを点灯            
        }
    });
    socket.on('off', function() {           // 'off'というイベントのsocketが来たら
        if (arduinoReady == true) {         // Arduinoが準備OKなら
            //console.log('socket [off]');     // consoleに出力
            led.off();                      // LEDを消灯            
        }
    });
});
