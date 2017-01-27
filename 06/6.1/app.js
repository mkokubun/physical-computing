// チャットアプリのためのサーバ側プログラム
// サーバPCに設定したNode.jsというシステムがこのJavaScriptを実行する

'use strict';                               // 厳格モードにする

// Node.jsのhttpサーバ機能を使う（定型・おまじないと思っておいて構わない）
const express = require('express');         // expressモジュールを使う
const app = express();                      // expressでアプリを作る
app.use(express.static(__dirname));         // ホームdirにあるファイルを使えるようにする
app.get('/', function (req, res) {          // アクセス要求があったら
    res.sendFile(__dirname + '/index.html');    // index.htmlを送る
});
const server = require('http').Server(app); // httpサーバを起動してアプリを実行
server.listen(80);                          // サーバの80番ポートでアクセスを待つ

const io = require('socket.io')(server);    // socket.ioモジュールをサーバにつなぐ

// クライアントから双方向通信（socket）が来た時の処理
io.on('connection', function(socket) {      // socket接続があって
    socket.on('all', function(data) {       // 'all'というイベントのsocketが来たら
        io.sockets.emit('msg', data);       // 'msg'というイベントで全員にdata配信
    });
    socket.on('others', function(data) {    // 'others'というイベントのsocketが来たら
        socket.broadcast.emit('msg', data); // 'msg'というイベントで自分以外にdata配信
    });
});