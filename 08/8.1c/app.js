// 8.1c JavaScriptで光センサ
'use strict'                            // 厳格モードにする

// Johnny-fiveの準備
const five = require('johnny-five');    // johnny-fiveモジュールの読み込み
const comPort = 'COM25';                // ★要書き換え：ArduinoのCOMポート番号
const arduino = new five.Board( {port: comPort} );  // ボードの取得

// 光センサの準備と計測
const pinLight = 'A0';                  // 光センサを接続したピン番号
let light;                              // 光センセ用のオブジェクトを用意
arduino.on('ready', function() {        // Arduinoの準備ができたら
    light = new five.Sensor({           // センサを取得
            pin: pinLight,              // センサを接続したピン番号
            freq: 250                   // 測定する時間間隔[ms]
    });

    // （おまじない）任意のタイミングでも測定できようにするための1行
    //arduino.repl.inject( {pot: light} );

    light.on('data', function() {       // データが測定されたら
        console.log(this.value);        // 値をログに出力する
    });
});

