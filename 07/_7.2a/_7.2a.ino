// 7.2a GroveでLチカ

// Arduinoにかぶせることで、電子回路の知識やハンダ付けしなくとも
// センサやアクチュエータを簡単につなげられるGroveを使う

// LED SocketにLEDをさし（LEDの長い足が＋、短い足が－）
// ケーブルをGroveのD3にさす
const int pinLED = 3;

// 以下、7.1と全く同じ
// 初期設定
void setup() {
  // pinLEDで指定した番号のピンを、出力モードにする
  pinMode(pinLED, OUTPUT);
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  digitalWrite(pinLED, HIGH); // pinLEDにHIGHの信号を出力（LEDが光る）
  delay(100);                 // 100ms待つ
  digitalWrite(pinLED, LOW);  // pinLEDにLOWの信号を出力（LEDが消える）
  delay(100);                 // 100ms待つ
}
