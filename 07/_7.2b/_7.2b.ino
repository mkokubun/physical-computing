// 7.2b アナログLチカ

// digitalWrite()関数は、HIGH/LOWのみ
// analogWrite()関数を使うと、明るさを調整できる

// LED SocketにLEDをさし（LEDの長い足が＋、短い足が－）
// ケーブルをGroveのD3にさす
const int pinLED = 3;

// 初期設定
void setup() {
  // pinLEDで指定した番号のピンを、出力モードにする
  pinMode(pinLED, OUTPUT);
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  for(int i = 0; i < 256; i++) {    // 0～255まで繰り返す
    analogWrite(pinLED, i);         // LEDをiの強さで光らせる
    delay(5);                       // 少し待つ
  }
  for(int i = 255; i >= 0; i--) {   // 255～0まで繰り返す
    analogWrite(pinLED, i);         // LEDをiの強さで光らせる
    delay(5);                       // 少し待つ
  }
}
