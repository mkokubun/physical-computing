// チャットアプリのためのサーバ側プログラム
// サーバPCに設定したNode.jsというシステムがこのJavaScriptを実行する

'use strict';                            // 厳格モードにする

// Node.jsのhttpサーバ機能を使う（定型・おまじないと思っておいて構わない）
const express = require('express');         // expressモジュールを使う
const app = express();                      // expressでアプリを作る
const server = require('http').Server(app); // httpサーバを起動
server.listen(80);                          // サーバの80番ポートでアクセスを待つ
app.get('/', function (req, res) {          // アクセス要求があったら
    res.sendFile(__dirname + '/index.html');    // index.htmlを送る
});
app.use(express.static(__dirname));         // ホームdirのファイルを使えるようにする

// socket.ioモジュールをサーバにつなぐ
const io = require('socket.io')(server);

// クライアントから双方向通信（socket）が来た時の処理
io.on('connection', function(socket) {      // socket接続があって
    socket.on('all', function(data) {       // 'all'というイベント名のsocketが来たら
        io.sockets.emit('msg', data);       // msgというイベント名で全員にdataを配信
    });
    socket.on('others', function(data) {    // 'others'というイベント名のsocketが来たら
        socket.broadcast.emit('msg', data); // msgというイベント名で自分以外にdataを配信
    });
});