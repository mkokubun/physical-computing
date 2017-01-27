// 7.4c サーボでアナログ照度計

// 光センサーで測った明るの分だけサーボモーターを動かす
// サーボモーターが、アナログのメーターになる

// Light Sensor（光センサ）を Groveの A0 にさす
const int pinLight = A0;  // 光センサのピン番号を定義

// サーボをGroveのD3にさす
const int pinServo = 3;   // サーボのピン番号を定義
#include <Servo.h>  // サーボを使うためのライブラリの読み込み
Servo servo;        // サーボを扱うオブジェクトを宣言

// 初期設定
void setup() {
  pinMode(pinLight, INPUT); // pinLightで指定した番号のピンを、入力モードにする
  servo.attach(pinServo);   // サーボのピン番号を指定

  // 以下は角度センサの値を数字で見るための処理
  // 「ツール」メニュー→「シリアルモニタ」で数字が見られる
  Serial.begin(9600);
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  int light = analogRead(pinLight);  // pinLightの値を取得
  Serial.println(light);            // シリアルモニタに値を出力

  // 明るさの値の範囲（0～764）をサーボの回転角度の範囲（0～179）に変換
  // 明るい時（lightの値が大きい時）サーボを右に（angleの値を小さく）する
  int servoAngle = map(light, 0, 764, 179, 0);
  servo.write(servoAngle);

  delay(15);    // 少し待ってから次の値を取得する
}
