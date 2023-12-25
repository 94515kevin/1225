var face_colors = "ede0d4-e6ccb2-ddb892-b08968-7f5539-9c6644".split("-").map(a=>"#"+a)
var eye_colors = "10002b-240046-3c096c-5a189a-7b2cbf-9d4edd-c77dff-e0aaff".split("-").map(a=>"#"+a)
var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[] 
var v_y=[]  //移動速度
var v_x=[]
var txts
var face_move_var = false //
var lang = navigator.language
//var myRec = new p5.SpeechRec(lang)
var face_Rot_var = false
var sound1
function preload(){
  sound1 = loadSound("alex-productions-christmas-is-coming.mp3") //先把音樂檔載入到sound1程式碼中
} 



function setup() {
  createCanvas(windowWidth, windowHeight);

//文字框的設定
inputElement = createInput("熊熊熊我是熊")//產生一個文字方塊
inputElement.position(450,10)//把文字方塊放到(10,10)
inputElement.size(170,40)//文字框的寬與高
//以下的style可以google搜尋html input css找到相關資料
inputElement.style("font-size","20px")//文字框內的文字大小
inputElement.style("color","#bc6c25")//文字框內的文字顏色
inputElement.style("background","#a8dadc")//文字框的背景顏色
inputElement.style("border","none")//文字框沒有框線

//"移動"按鈕的設定
btnMoveElement = createButton("移動")//產生一個按鈕，按鈕上有"移動"字
btnMoveElement.position(570,80)//按鈕的位置
btnMoveElement.size(80,40)//按鈕的寬與高

btnMoveElement.style("font-size","20px")//按鈕內的文字大小
btnMoveElement.style("color","#bc6c25")//按鈕內的文字顏色
btnMoveElement.style("background","#a8dadc")//按鈕的背景顏色
btnMoveElement.mousePressed(face_move)//按鈕按下後會執行face_move函數

btnStopElement = createButton("暫停")
btnStopElement.position(750,80)//按鈕的位置
btnStopElement.size(80,40)//按鈕的寬與高
btnStopElement.style("font-size","20px")//按鈕內的文字大小
btnStopElement.style("color","#bc6c25")//按鈕內的文字顏色
btnStopElement.style("background","#a8dadc")//按鈕的背景顏色
btnStopElement.mousePressed(face_stop)//按鈕按下後會執行face_stop函數


btnVoiceElement = createButton("音樂")
btnVoiceElement.position(950,10)//按鈕的位置
btnVoiceElement.size(80,40)//按鈕的寬與高
btnVoiceElement.style("font-size","20px")//按鈕內的文字大小
btnVoiceElement.style("color","#bc6c25")//按鈕內的文字顏色
btnVoiceElement.style("background","#a8dadc")//按鈕的背景顏色
btnVoiceElement.mousePressed(voice_go)//按鈕按下後會執行voice_go函數

//radio的設定，多個選項，只能選一個(單選題)
radioElement=createRadio()
radioElement.option("暫停")
radioElement.option("旋轉")
radioElement.option("移動")
radioElement.position(680,10)//選鈕的位置
radioElement.size(200,40)
radioElement.style("font-size","20px")//選鈕內的文字大小
radioElement.style("color","#bc6c25")//選鈕內的文字顏色
radioElement.style("background-color","#a8dadc")//選鈕的背景顏色



  // for(var i=0;i<20;i=i+1){
  //   drawface(face_colors[int(random(face_colors.length))],eye_colors[int(random(eye_colors.length))])
  // }  
}
function draw() {
  background("#70798c");
  mode = radioElement.value()
  for(var i=0;i<pos_x.length;i=i+1){//依照pos_x內有幾筆資料，就會產生幾個物件
    push()
      txts = inputElement.value(); //把文字框的文字內容
      translate(pos_x[i],pos_y[i])
      if(mode=="旋轉"){
      rotate(sin(frameCount/20))
      }
      else{
        if(mode=="移動"){
          face_move_var=false
        }
      }
      drawface(colors[i],0,sizes[i])
    pop()
    if(face_move_var || mode=="移動"){
      pos_y[i] = pos_y[i] + v_y[i]
    }
    //pos_y[i] = pos_y[i] + v_y[i]
    //pos_x[i] = pos_x[i] + v_x[i]
    if(pos_y[i]>height || pos_y[i]<0){//判斷有沒有碰到上下邊，碰到上下邊時，就要刪除所有陣列的該筆資料
      pos_x.splice(i,1)//把碰掉邊的陣列元素刪除，把第一筆資料刪除一筆資料
      pos_y.splice(i,1)
      sizes.splice(i,1)
      colors.splice(i,1)
      v_y.splice(i,1)
      v_x.splice(i,1)
      }
    }
  }



function drawface(face_clr=255,eye_clr=0,size=1){
  push()
   
  // translate(random(width),random(height))  //原點(0,0)移動到(200,200)
  scale(size)//先宣告放大縮小的比例尺
  //文字框的顯示格式
  fill("#cdb4db")//設定文字的顏色
  textSize(50)//文字大小
  text(txts,-100,250)//顯示文字，文字內容為txts，放在位置座標為(50,200)
// text(txts,-100,200)
  fill(face_clr)

// 繪製熊耳
fill(face_clr);
ellipse(80, -80 , 80, 80);
ellipse(-80, -80, 80, 80);

  // 繪製熊頭的輪廓
  fill(face_clr);
  stroke(0);
  ellipse(0, 0, 200, 200);


// 繪製眼睛
fill(255);
ellipse(-40, -30, 40, 40);
ellipse(40, -30, 40, 40);
fill(0);
ellipse(-40, -30, 20, 20);
ellipse(40, -30, 20, 20);

// 繪製鼻子
fill(255, 100, 100);
triangle(0,20,20,50,-20,50);
//text("x:"+mouseX+",Y:"+ mouseY,100,100 )

        
pop()
}

function mousePressed(){
  if(mouseY>60) //設定y軸為0~60間的座標值都不產生新的物件
  //產生一個新的物件
  pos_x.push(mouseX)//放一筆新的資料到pos_x陣列內，資料為按下滑鼠的x軸
  pos_y.push(mouseY)//放一筆新的資料到pos_y陣列內，資料為按下滑鼠的y軸
  sizes.push(random(0.3,1))//放一筆新的資料到sizes陣列內，資料為產生一個亂數，為物件的大小
  colors.push(face_colors[int(random(face_colors.length))])//放一筆新的資料到colors陣列內
  v_y.push(-1,1)
  v_x.push(-1,1)
}

function face_move(){
 face_move_var = true
}

function face_stop(){
 face_move_var = false  
}



function voice_go(){
 if (sound1.isPlaying()){
     sound1.stop();
 }
 else{
  sound1.play();
 }
 }

 