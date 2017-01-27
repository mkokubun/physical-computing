＜three.js＞
JavaScriptで3Dを扱うためのthree.jsライブラリです。
本来は、http://threejs.org/ からDLしてindex.htmlとフォルダに配置します。
　・three.js-master.zip を解凍
　・three.js-master\build 内にある three.js を使う
　　（three.min.js も機能は全く同じもので、容量を小さくしたものです。どちらを使っても構いません。）

＜huchan.blend＞
3DCGソフトBlenderで作成されたヒューちゃんのCGモデルです。
Blenderは以下から無償でダウンロードしインストールできます。
　https://www.blender.org/
　https://blender.jp/
Blenderの詳しい使い方は、ネットや書籍で自習してください。

＜huchan.json＞
Blenderを使って、json形式でエクスポートしたヒューちゃんのモデルです。
three.jsでは、json形式という形式の3DCGモデルを読み込めます。
エクスポートの詳しい方法は「Blender json」などのキーワードで検索してみてください。

＜StereoEffect.js＞
サイドバイサイド立体視を可能にする StereoEffect.js ライブラリです。
Googleが公開しています。
本来は、https://vr.chromeexperiments.com/ からDLしてindex.htmlと同フォルダに配置します。
　・cardboard.zip を解凍
　・www\cardboard\js\third-party\threejs 内にある StereoEffect.js を使う

＜DeviceOrientationControls.js＞
スマホの動きでVRを実現する DeviceOrientationControls.js ライブラリです。
Googleが公開しています。
本来、https://vr.chromeexperiments.com/ からDLしてindex.htmlと同フォルダに配置します。
　・cardboard.zip を解凍
　・www\cardboard\js\third-party\threejs 内にある DeviceOrientationControls.js を使う

＜earthmap.jpg＞
旧のオブジェクトに貼り付ける地球のテクスチャです。
http://planetpixelemporium.com/earth.html からDLした earthmap1k.jpg をもとに
画像のサイズを1024×512に変換したものです。
このサイトにはコレ（地球のカラー画像）以外にも、凹凸（bump map）や光沢（specular map）のためのテクスチャもあり、three.jsを使って、山脈の凹凸を再現したり、輝く海を再現したりもできます。詳しくは調べてみてください。