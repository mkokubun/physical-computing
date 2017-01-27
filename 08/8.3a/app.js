// 8.3a スマホでセンシング（光）
'use strict'                            // 厳格モードにする

// Johnny-fiveの準備
const five = require('johnny-five');    // johnny-fiveモジュールの読み込み
const comPort = 'COM25';                // ★要書き換え：ArduinoのCOMポート番号
const arduino = new five.Board( {port: comPort} );  // ボードの取得
let arduinoReady = false;               // Arduino準備OKのフラグ
// 光センサの準備
const pinLight = 'A0';                  // 光センサを接続したピン番号
let light;                              // 光センセ用のオブジェクトを用意
arduino.on('ready', function() {        // Arduinoの準備ができたら
    light = new five.Sensor({           // センサオブジェクトを作る
        pin: pinLight,                  // センサを接続したピン番号
        freq: 250                       // 測定する時間間隔[ms]
    });
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


// ソケット通信によるスマホでのセンシング
io.on('connection', function(socket) {      // socket接続があって
    if (arduinoReady == true) {             // Arduinoが準備OKなら
        light.on('data', function() {       // データが測定されたら
            console.log(this.value);        // consoleに出力する
            io.sockets.emit('sensor', {     // sensorというイベント名でソケット配信
                brightness: this.value      // brightness属性に値を入れて
            });
        });
    }
});
