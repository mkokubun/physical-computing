// 7.3b 明るさ調整ボリューム

// Rotary Angle Sensor（角度センサ）を Groveの A0 にさす
const int pinAngle = A0;

// LED SocketにLEDをさし（LEDの長い足が＋、短い足が－）
// ケーブルをGroveのD3にさす
const int pinLED = 3;

// 初期設定
void setup() {
  pinMode(pinAngle, INPUT); // pinAngleで指定した番号のピンを、入力モードにする
  pinMode(pinLED, OUTPUT);  // pinLEDで指定した番号のピンを、出力モードにする

  // 以下は角度センサの値を数字で見るための処理
  // 「ツール」メニュー→「シリアルモニタ」で数字が見られる
  Serial.begin(9600);
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  int angle = analogRead(pinAngle); // pinAngleの値を取得
  Serial.println(angle);           // シリアルモニタに値を出力

  // 角度の値の範囲（0～1023）をLEDの明るさの範囲（0～255）に変換して
  int brightness = map(angle, 0, 1023, 0, 255);
  analogWrite(pinLED, brightness);  // LEDをbrightnessの強さで光らせる

  delay(100);                       // 少し待ってから次の値を取得する
}
