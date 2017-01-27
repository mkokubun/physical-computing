// 7.3a タッチセンサでLチカ

// TouchセンサをGroveのD2にさす
const int pinTouch = 2;

// LED SocketにLEDをさし（LEDの長い足が＋、短い足が－）
// ケーブルをGroveのD3にさす
const int pinLED = 3;

// 初期設定
void setup() {
  pinMode(pinTouch, INPUT); // pinTouchで指定した番号のピンを、入力モードにする
  pinMode(pinLED, OUTPUT);  // pinLEDで指定した番号のピンを、出力モードにする
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  boolean touch = digitalRead(pinTouch);  // pinTouchの状態を取得
  if(touch == true) {
    digitalWrite(pinLED, HIGH);
  } else {
    digitalWrite(pinLED, LOW);
  }
}
