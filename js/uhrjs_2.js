// Volksentscheid Fahrrad Donation Tracker by Rose Tremlett (rosetremlett.com)

var c = document.getElementById("uhrCanv");
var ctx = c.getContext("2d");

var sections = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 44000, 46000, 48000, 50000, 52000, 54000, 56000, 58000, 60000, 62000, 64000, 66000, 68000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 88000, 90000, 92000, 94000, 96000, 98000,  100000];

var cityGrey = new Image();
cityGrey.src = "images/skyline_g.png";

var cityColor = new Image();
cityColor.src = "images/skyline.png";

var bike = new Image();
bike.src = "images/bike.png";
    
var loadAlertGrey = false;
var loadAlertColor = false;

var stage;

var frameCounter = 0;
var frames = 0;
var delayTimer = 0;
var bikePos = 0;

var numbers = [];

$(document).ready(function () {
    
loadData();
console.log(stage);

    cityGrey.onload = function(){
  loadAlertGrey = true;  
  ctx.drawImage(cityGrey,  0,  200);
  if (loadAlertColor){update();}
};

cityColor.onload = function(){
    loadAlertColor = true;
    if (loadAlertGrey){
        ctx.drawImage(cityGrey,  0,  200); 
        update();
    }
};



});

var update = function(){


window.requestAnimationFrame(update);


  if (frames < 6){
      frames +=1;
  
  }
  
  else if (frames === 6 && frameCounter < stage){
      frameCounter+=1;
      frames = 0; 
  }
      
   else if (frames === 6 && frameCounter === stage){
      
     
     
     if (delayTimer <= 300){
         
         delayTimer ++;
     } else if (delayTimer > 300) {
         frameCounter = 0;
            frames = 0;
            delayTimer = 0;
         
     }
          
            
            
           
          
      }
      

 
  

  
  if (frameCounter === 0){
      ctx.clearRect(0,  100,  1000,  500);
      ctx.drawImage(cityGrey,  0,  0);

      ctx.fillStyle = "black";
      ctx.font = "60px Arial";
      ctx.fillText("25.000€",  150,  575);
      ctx.fillText("50.000€",  415,  575);
      ctx.fillText("75.000€",  665,  575);
      ctx.beginPath();
        ctx.moveTo(10, 510);
        ctx.lineTo(990, 510);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke(); 
        drawDivides(250);
        drawDivides(500);
        drawDivides(750);
        
      
      
  } else {
            ctx.clearRect(0,  100,  1000,  500);
      ctx.drawImage(cityGrey,  0,  0);
//            ctx.fillStyle = "white";
//      ctx.fillRect(0,  500,  1000,  100);

      ctx.drawImage(
        cityColor, 
        0, 
        100, 
        (frameCounter - 1) * 20, 
        500, 
        0, 
        100, 
        (frameCounter - 1) * 20, 
        500
            );
    ctx.beginPath();
        ctx.moveTo(((frameCounter - 1) * 20), 0);
        ctx.lineTo(((frameCounter - 1) * 20), 600);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 6;
        ctx.stroke(); 
      ctx.drawImage(bike, ((frameCounter*20)-170), 390);
            ctx.fillStyle = "black";
      ctx.font = "60px Arial";
      ctx.fillText("25.000€",  150,  575);
      ctx.fillText("50.000€",  415,  575);
      ctx.fillText("75.000€",  665,  575);
      ctx.beginPath();
        ctx.moveTo(10, 510);
        ctx.lineTo(990, 510);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.stroke(); 
        drawDivides(250);
        drawDivides(500);
        drawDivides(750);
  }
};



var loadData = function() {


//load Google Sheets URL
    var exUrl = 'https://spreadsheets.google.com/feeds/list/1jP7s5-7wp9eDt4nGEdW3uh0xq2kgyIkuse1TIJS_5c0/default/public/basic?alt=json';


    $.getJSON(exUrl,  function(data){
		


		var stuff = data.feed.entry;
		var otherStuff = stuff[stuff.length-1].content.$t;

		var moreStuff = otherStuff.split(": ");
                var currentVal = parseInt(moreStuff[moreStuff.length-1]);
             
		console.log(currentVal);
                
                for (var i = 0; i < sections.length; i++){
                    var iThis = i;
                    if (currentVal >= sections[iThis]){
                        stage = iThis + 1;
                        console.log(stage);
                    }
                }


    }).error(function(e){
        prompt('error loading data');
    });

};

var drawDivides = function(xVal){
    ctx.beginPath();
    ctx.moveTo(xVal, 510);
    ctx.lineTo(xVal, 520);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke(); 
};