// 7.4a サーボモーターを動かす

// ロボットや動きのあるアート作品には欠かせないサーボモーター
// 画面（GUI）だけでないインタラクションにぜひ使おう

// サーボをGroveのD3にさす
const int pinServo = 3;   // サーボのピン番号を定義
#include <Servo.h>  // サーボを使うためのライブラリの読み込み
Servo servo;        // サーボを扱うオブジェクトを宣言

// 初期設定
void setup() {
  servo.attach(pinServo);   // サーボのピン番号を指定（通常と少し異なる方法）
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  for(int i = 0; i < 180; i++) {    // 0～179まで繰り返す
    servo.write(i);                 // サーボの角度をiにする
    delay(5);                       // 少し待つ
  }
  for(int i = 179; i >= 0; i--) {   // 179～0まで繰り返す
    servo.write(i);                 // サーボの角度をiにする
    delay(5);                       // 少し待つ
  }
}
