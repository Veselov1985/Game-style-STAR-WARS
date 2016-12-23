window.onload= function () {

controlAudio(0);

var emptyImg=['http://www.e-reading.club/cover/92/92342.png'];

var images=['https://kde.link/test/0.png','https://kde.link/test/1.png','https://kde.link/test/2.png','https://kde.link/test/3.png','https://kde.link/test/4.png',
'https://kde.link/test/5.png','https://kde.link/test/6.png','https://kde.link/test/7.png','https://kde.link/test/9.png'];

var audio;
var arrView=[];
var count;
var imageCount;

   var newGame=document.getElementById('newGame');
     newGame.style.display='none';


  document.getElementById('newGame').onclick= function(e) {

  if(document.getElementById('win')) document.getElementById('win').style.display='none';

  startNewGame ();
}



function startNewGame () {
  imageCount=0;
  count=0;
  var box=document.getElementById("boxcard");
  box.style.display='';


  fetch('https://kde.link/test/get_field_size.php', {
	method: 'GET',
	mode: 'cors',
	})
    .then(function(response) {
       if (response.status !== 200) {
        return;
      }
      response.json().then(function(data) {
        buildApp(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}


startNewGame();







  function buildApp(data) {
    var height=data.height;
    var width=data.width;
    imageCount=height*width/2;
var imagesDataArr =getDataArr(images,imageCount);
mixArr(imagesDataArr);
buildHtml(imagesDataArr,width);

document.onclick= function(event) {
var target = event.target;
  dooItEvents(target,event);



}




  }






//  .............func-s helper



//........mix Arr

function mixArr(arr) {

  function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }


    var r;
    var v;
    for (var i = 0; i < arr.length-1; i++) {
        r = random(0, arr.length-1);
        v = arr[r];
        arr[r] = arr[arr.length-1];
        arr[arr.length-1] = v;
    }
    return arr;
}


//......build getDataArr from server


function getDataArr (img,val) {

var arr=[];
var i=0;
while (val) {
  arr.push(img[i]);
  arr.push(img[i]);
  i++;
  if(i>img.length-1) i=0;
  val--;
}


return arr;


}



//  build Html

function buildHtml(arr,width) {
  var html='';

for(var i=0;i<arr.length;i++) {

html+='<div id='+i+'><img data-img="'+arr[i] +'" src="'+emptyImg[0]+'"></div>'

}
var box=document.getElementById("boxcard");
box.style.width=125*width+"px";

box.innerHTML=html;

}

//  build events ()

function dooItEvents(e,event) {

  if(e.tagName=="A") start(event);
  if(e.tagName=="IMG" && e.getAttribute('src').indexOf('kde.link')>-1) return;
  if(e.tagName=="IMG" && !e.classList.contains('opacity')  ) imageView(e);
}


//event  start game

function start(e) {
  audio.pause();
e.preventDefault() ;
var box  = document.getElementById('boxcard');
box.classList.remove("view");

}



//image control view

function imageView(e) {
  if(arrView.length==2) return;
if( arrView.length<2) {
  changAttr(e)
  arrView.push(e);
  controlAudio(1);
}
if(arrView.length==2){
  compareImg(arrView);

}

}



// change attr    src and data-img

function changAttr(e) {
 var oldImg=e.getAttribute('src');
 var newImg = e.getAttribute('data-img');
  e.setAttribute('src',newImg);
  e.setAttribute('data-img',oldImg);

}

// compareImg


function  compareImg (arr) {
if(arr[0].getAttribute('src')==arr[1].getAttribute('src')) {
  win(arrView);
}else {
controlAudio(3);
  setTimeout(loose,500,arrView);
}

}

// Clear loose chois images


function loose(arr) {
changAttr(arr[0]);
changAttr(arr[1])
  arrView=[];

}

//chois same (equal) images

function win(arr){
  controlAudio(2);
arr[0].classList.add('opacity');
arr[1].classList.add('opacity');
    arrView=[];
    count++;
if(count==imageCount) endGameWin();
}


// game over


function endGameWin () {
  controlAudio(4);
  var checknew =document.getElementById('win');
if(checknew) {
  checknew.style.display='';
  document.getElementById('boxcard').style.display='none';
  return;
  }
  var old=document.getElementById('boxcard');
  old.style.display='none';
  var body=document.body;
  var elem=document.createElement('div');
  elem.setAttribute('id','win');
  var text=document.createTextNode('Congratulations you win');
  elem.appendChild(text);
  body.appendChild(elem);
  newGame.style.display="";
 var start=document.getElementById('start');
 start.style.display='none';
}



// sound control


function controlAudio(id) {
  var audios =document.getElementsByTagName('audio');
  if (audio ) audio.pause();
  audios[id].play();
  audio=audios[id];


}





}
