// 7.3c 自動調光

// Light Sensor（光センサ）を Groveの A0 にさす
const int pinLight = A0;

// LED SocketにLEDをさし（LEDの長い足が＋、短い足が－）
// ケーブルをGroveのD3にさす
const int pinLED = 3;

// 初期設定
void setup() {
  pinMode(pinLight, INPUT); // pinLightで指定した番号のピンを、入力モードにする
  pinMode(pinLED, OUTPUT);  // pinLEDで指定した番号のピンを、出力モードにする

  // 以下は角度センサの値を数字で見るための処理
  // 「ツール」メニュー→「シリアルモニタ」で数字が見られる
  Serial.begin(9600);
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  int light = analogRead(pinLight);  // pinLightの値を取得
  Serial.println(light);            // シリアルモニタに値を出力

  // 明るさの値の範囲（0～764）をLEDの明るさの範囲（0～255）に変換
  // 暗い時（lightの値が小さい時）LEDを明るく（brightnessの値を大きく）する
  int brightness = map(light, 0, 764, 255, 0);
  analogWrite(pinLED, brightness);  // LEDをbrightnessの強さで光らせる

  delay(100);                       // 少し待ってから次の値を取得する
}
