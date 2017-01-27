// 9.1 スマホで遠隔監視
'use strict';                           // 厳格モードにする

// Johnny-fiveの準備
const five = require('johnny-five');    // johnny-fiveモジュールの読み込み
const comPort = 'COM25';                // ★要書き換え：ArduinoのCOMポート番号
const arduino = new five.Board( {port: comPort} );  // ボードの取得
let arduinoReady = false;               // Arduino準備OKのフラグ
// サーボの準備（8.2b参照）
const pinServo = 3;                     // サーボを接続したピン番号
let servo;                              // サーボ制御用オブジェクトの用意
arduino.on('ready', function() {        // Arduinoの準備ができたら
    servo = new five.Servo({            // サーボを取得
        pin: pinServo,                  // サーボのピン番号
        invert: true                    // 回転を逆転させる
    });
    arduinoReady = true;                // Arduino準備OK
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
    // サーボの制御（8.2b参照）
    socket.on('servo', function(data) { // 'servo'というイベント名のsocketが来たら
        if (arduinoReady == true) {     // Arduinoが準備OKなら
            // console.log('socket [servo]: ' + data.angle);   // consoleに出力
            servo.to(data.angle);       // サーボを指定角度まで回す
        }
    });
    // 映像の配信
    socket.on('video', function(data) { // 'video'というイベント名のsocketが来たら
        // console.log('socket [video]');
        socket.broadcast.emit('video', data);   // 自分以外に映像を配信
    });
});
