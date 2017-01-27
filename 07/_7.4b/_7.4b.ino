// 7.4b サーボをボリュームで動かす

// Rotary Angle Sensor（角度センサ）を Groveの A0 にさす
const int pinAngle = A0;  // 角度センサのピン番号を定義

// サーボをGroveのD3にさす
const int pinServo = 3;   // サーボのピン番号を定義
#include <Servo.h>  // サーボを使うためのライブラリの読み込み
Servo servo;        // サーボを扱うオブジェクトを宣言

// 初期設定
void setup() {
  pinMode(pinAngle, INPUT); // pinAngleで指定した番号のピンを、入力モードにする
  servo.attach(pinServo);   // サーボのピン番号を指定

  // 以下は角度センサの値を数字で見るための処理
  // 「ツール」メニュー→「シリアルモニタ」で数字が見られる
  Serial.begin(9600);
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  int angle = analogRead(pinAngle);  // pinLightの値を取得
  Serial.println(angle);            // シリアルモニタに値を出力

  // 角度の値の範囲（0～1023）をサーボの回転角度の範囲（0～179）に変換
  int servoAngle = map(angle, 0, 1023, 0, 179);
  servo.write(servoAngle);

  delay(15);    // 少し待ってから次の値を取得する
}
