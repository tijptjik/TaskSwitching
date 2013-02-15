
//global vars
var rt1 = 0;
var rt2 = 0;
var rt3 = 0;
var rt4 = 0;
var rt5 = 0;
var avg = 0;
var whichTest = "0";

//set up elements of the timer
var myTime = new Date();
var starTime = myTime.getTime();
var endTime = myTime.getTime();

//preload images
if (document.images){
img = new Array();
img[1]=new Image(); img[1].src="images/rttest_stoplight_yellow.gif";
img[2]=new Image(); img[2].src="images/rttest_stoplight_red.gif";
img[3]=new Image(); img[3].src="images/rttest_stoplight_green.gif";
img[4]=new Image(); img[4].src="images/rttest_wait.gif";
img[5]=new Image(); img[5].src="images/rttest_ready.gif";
img[6]=new Image(); img[6].src="images/rttest_go.gif";
img[7]=new Image(); img[7].src="images/rttest_done.gif";
img[8]=new Image(); img[8].src="images/rttest_continue.gif";
}

//starts from the top
function startOver(){
whichTest = "0";
document.jensen.src = img[4].src;
document.stoplight.src = img[1].src;
rt1 = 0;
rt2 = 0;
rt3 = 0;
rt4 = 0;
rt5 = 0;
avg = 0;
document.rttest.test1.value = "";
document.rttest.test2.value = "";
document.rttest.test3.value = "";
document.rttest.test4.value = "";
document.rttest.test5.value = "";
document.rttest.avg.value = "";
atimer = setTimeout("test1SetUp()",2000);
}

function test1SetUp(){
document.jensen.src = img[5].src;
whichTest = "1a";
}

function test1DoIt(){
whichTest="0";
document.stoplight.src = img[2].src;
document.jensen.src = img[6].src;
btimer = setTimeout("whichTest = '1b'; lightGreen()",(Math.random()*3000) + 3000);
}

function test1Recap(){
whichTest="0";
myTime = new Date();
endTime = myTime.getTime();
document.jensen.src = img[4].src;
document.stoplight.src = img[1].src;
rt1 = (endTime - starTime)/1000;
document.rttest.test1.value = rt1.toString();
document.rttest.avg.value = rt1.toString();
ctimer = setTimeout("test2SetUp()",2000);
}

function test2SetUp(){
document.jensen.src = img[8].src;
whichTest = "2a";
}

function test2DoIt(){
whichTest="0";
document.stoplight.src = img[2].src;
document.jensen.src = img[6].src;
btimer = setTimeout("whichTest = '2b'; lightGreen()",(Math.random()*4500) + 2500);
}

function test2Recap(){
whichTest="0";
myTime = new Date();
endTime = myTime.getTime();
document.jensen.src = img[4].src;
document.stoplight.src = img[1].src;
rt2 = (endTime - starTime)/1000;
document.rttest.test2.value = rt2.toString();
document.rttest.avg.value = (rt1 + rt2)/2;
ctimer = setTimeout("test3SetUp()",2000);
}

function test3SetUp(){
document.jensen.src = img[8].src;
whichTest = "3a";
}

function test3DoIt(){
whichTest="0";
document.stoplight.src = img[2].src;
document.jensen.src = img[6].src;
btimer = setTimeout("whichTest = '3b'; lightGreen()",(Math.random()*4500) + 2500);
}

function test3Recap(){
whichTest="0";
myTime = new Date();
endTime = myTime.getTime();
document.jensen.src = img[4].src;
document.stoplight.src = img[1].src;
rt3 = (endTime - starTime)/1000;
document.rttest.test3.value = rt3.toString();
document.rttest.avg.value = (rt1 + rt2 + rt3)/3;
ctimer = setTimeout("test4SetUp()",2000);
}

function test4SetUp(){
document.jensen.src = img[8].src;
whichTest = "4a";
}

function test4DoIt(){
whichTest="0";
document.stoplight.src = img[2].src;
document.jensen.src = img[6].src;
btimer = setTimeout("whichTest = '4b'; lightGreen()",(Math.random()*4500) + 2500);
}

function test4Recap(){
whichTest="0";
myTime = new Date();
endTime = myTime.getTime();
document.jensen.src = img[4].src;
document.stoplight.src = img[1].src;
rt4 = (endTime - starTime)/1000;
document.rttest.test4.value = rt4.toString();
document.rttest.avg.value = (rt1 + rt2 + rt3 + rt4)/4;
ctimer = setTimeout("test5SetUp()",2000);
}

function test5SetUp(){
document.jensen.src = img[8].src;
whichTest = "5a";
}

function test5DoIt(){
whichTest="0";
document.stoplight.src = img[2].src;
document.jensen.src = img[6].src;
btimer = setTimeout("whichTest = '5b'; lightGreen()",(Math.random()*4500) + 2500);
}

function test5Recap(){
whichTest="0";
myTime = new Date();
endTime = myTime.getTime();
document.jensen.src = img[7].src;
document.stoplight.src = img[1].src;
rt5 = (endTime - starTime)/1000;
document.rttest.test5.value = rt5.toString();
document.rttest.avg.value = (rt1 + rt2 + rt3 + rt4 + rt5)/5;
etimer = setTimeout("whichTest='6'",3000);
}


//this function set off by either a mousedown or keypress
function buttClicked(){
if (whichTest == "1b"){test1Recap()}else{}
if (whichTest == "2b"){test2Recap()}else{}
if (whichTest == "3b"){test3Recap()}else{}
if (whichTest == "4b"){test4Recap()}else{}
if (whichTest == "5b"){test5Recap()}else{}

if (whichTest == "1a"){test1DoIt()}else{}
if (whichTest == "2a"){test2DoIt()}else{}
if (whichTest == "3a"){test3DoIt()}else{}
if (whichTest == "4a"){test4DoIt()}else{}
if (whichTest == "5a"){test5DoIt()}else{}
if (whichTest == "6"){startOver()}else{}
}

//turn the light green and setup to wait for the click or keypress
function lightGreen(){
document.stoplight.src = img[3].src;
myTime = new Date();
starTime = myTime.getTime();
}

//opens the see-the-code popup
function popup(){
see=window.open('thecode/rttest_code.html','codewind','scrollbars,resizable,width=635,height=250')
see.focus()
}

//event capture for Netscape, keypresses captured
//see the second half of this function at the bottom of html body
function whichKey(e){
buttClicked();
}
//-->
