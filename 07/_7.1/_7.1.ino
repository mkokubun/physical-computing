// 7.1 LEDを点滅させる（Lチカ）

// LEDのピン番号を指定
// Arduinoには信号を入出力する「ピン」がたくさんあり
// 各ピンに対して様々な命令を出すことでいろいろなことをする
// Arduino基板上にあるLEDは13番ピンにつながっている
const int pinLED = 13;

// Arduinoのプログラミングは
// setup()関数の中で初期設定をして
// loop()関数の中で様々な処理をする

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
