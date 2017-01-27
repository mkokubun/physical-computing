// 9.2 遠隔監視と警告
'use strict';                               // 厳格モードにする

// Johnny-fiveの準備
const five = require('johnny-five');        // johnny-fiveモジュールの読み込み
const comPort = 'COM25';                    // ★要書き換え：ArduinoのCOMポート番号
const arduino = new five.Board( {port: comPort} );  // ボードの取得
let arduinoReady = false;                   // Arduino準備OKのフラグ
// サーボ、LEDの準備
const pinServo = 3;                         // サーボを接続したピン番号
let servo;                                  // サーボ制御用オブジェクトの用意
const pinLED = 5;                           // LEDを接続したピン番号
let led;                                    // LED用オブジェクトの用意
const pinBuzzer = 6;                        // ブザーを接続したピン番号
let buzzer;                                 // ブザー用オブジェクトの用意
arduino.on('ready', function() {            // Arduinoの準備ができたら
    servo = new five.Servo({                // サーボを取得
        pin: pinServo,                      // サーボのピン番号
        invert: true                        // 回転を逆転させる
    });
    led = new five.Led(pinLED);             // LEDを取得
    buzzer = new five.Piezo(pinBuzzer);     // ブザー（ピエゾ素子）を取得
    arduinoReady = true;                    // Arduino準備OK
});

// ソケット通信（socket.io）の準備（6.1参照）
const express = require('express');         // expressモジュールを使う
const app = express();                      // expressでアプリを作る
app.use(express.static(__dirname));         // ホームdirにあるファイルを使えるようにする
app.get('/', function (req, res) {          // アクセス要求があったら
    res.sendFile(__dirname + '/index.html');    // index.htmlを送る
});
const server = require('http').Server(app); // httpサーバを起動してアプリを実行
server.listen(80);                          // サーバの80番ポートでアクセスを待つ
const io = require('socket.io')(server);    // socket.ioモジュールをサーバにつなぐ

// ソケット通信による監視・制御
io.on('connection', function(socket) {  // socket接続があって
    // サーボの制御
    socket.on('servo', function(data) { // 'servo'というイベント名のsocketが来たら
        if (arduinoReady == true) {     // Arduinoが準備OKなら
            // console.log('socket [servo]: ' + data.angle);   // consoleに出力
            servo.to(data.angle);       // サーボを指定角度まで回す
        }
    });
    // 映像の配信
    socket.on('video', function(data) {     // 'video'というイベント名のsocketが来たら
        // console.log('socket [video]');
        socket.broadcast.emit('video', data);   // 自分以外に映像を配信
    });
    // 警告の処理
    socket.on('alarm', function(data) { // 'alarm'というイベント名のsocketが来たら
        if (arduinoReady == true) {     // Arduinoが準備OKなら
            // console.log('socket [alarm]');
            if (data.light == true) {   // データのlight属性がtrueなら
                led.blink(100);         // LEDを点滅させる
            } else {                    // そうでなければ（blink属性がfalseなら）
                led.stop();             // LEDの点滅を止めて
                led.off();              // LEDを消す
            }
            if (data.sound == true) {   // データのsound属性がtrueなら
                buzzer.play({           // ブザー音を鳴らす
                    song: 'B C B C B C B C B C B C B C ',   // 曲（音程）
                    beats: 1 / 4,                           // 一拍の長さ
                    tempo: 100                              // テンポ[bpm]
                });
            } else {
                buzzer.off();           // ブザー音を消す
            }
        }
    });
});
