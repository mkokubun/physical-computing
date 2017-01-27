// 7.3d サウンド・ライト（音を光に）

// Sound Sensor（音センサ）を Groveの A0 にさす
const int pinSound = A0;

// LED SocketにLEDをさし（LEDの長い足が＋、短い足が－）
// ケーブルをGroveのD3にさす
const int pinLED = 3;

// 初期設定
void setup() {
  pinMode(pinSound, INPUT); // pinSoundで指定した番号のピンを、入力モードにする
  pinMode(pinLED, OUTPUT);  // pinLEDで指定した番号のピンを、出力モードにする

  // 以下は角度センサの値を数字で見るための処理
  // 「ツール」メニュー→「シリアルモニタ」で数字が見られる
  Serial.begin(9600);
}

// メインの処理、この中の命令が繰り返し実行される
void loop() {
  int sound = analogRead(pinSound);  // pinLightの値を取得
  Serial.println(sound);            // シリアルモニタに値を出力

  // 音センサの値の範囲（0～1023）をLEDの明るさの範囲（0～255）に変換
  int brightness = map(sound, 0, 1023, 0, 255);
  analogWrite(pinLED, brightness);  // LEDをbrightnessの強さで光らせる

  delay(15);    // 少し待ってから次の値を取得する
}
