/*var canvas=document.getElementById('game');
var ctx=canvas.getContext("2d");
if(!ctx){
	alert('不支持');
}
else{
	startGame();
}
function startGame(){
	SpriteSheet.load(
	{
		ship:{sx:0,sy:0,w:37,h:42,frames:3}
	},function(){
		SpriteSheet.draw(ctx,"ship",0,0);
		SpriteSheet.draw(ctx,"ship",100,50);
		SpriteSheet.draw(ctx,"ship",150,100,1);
	});

}*/

var sprites={
	ship:{sx:0,sy:0,w:37,h:42,frames:1}
};
var startGame=function(){

	Game.setBoard(0,new Starfield(20,0.4,100,true));
	Game.setBoard(1,new Starfield(50,0.6,100));
	Game.setBoard(2,new Starfield(100,1.0,50));
	Game.setBoard(3,new TitleScreen("Alien Invasion",
		"Press space to start playing!",
		playGame));
     
}
var playGame=function (){
		  Game.setBoard(3,new PlayerShip);
};
window.addEventListener("load", function(){
	Game.initialize("game",sprites,startGame);
});

//星空
var Starfield=function(speed,opacity,numStars,clear){
	var stars=document.createElement("canvas");
	stars.height=Game.height;
	stars.width=Game.width;
	starsCtx=stars.getContext("2d");
	var offset=0;

	if(clear){
		starsCtx.fillStyle="#000";
		starsCtx.fillRect(0, 0, stars.width, stars.height);
	}
	starsCtx.fillStyle="#fff";
	starsCtx.globalAlpha=opacity;
	for(var i=0;i<numStars;i++){
		starsCtx.fillRect(Math.floor(Math.random()*stars.width),
						 Math.floor(Math.random()*stars.width),
						 2,
						 2);
	}


	//巧妙的地图循环
	this.draw=function(ctx){
		var intOffset=Math.floor(offset);
		var remaining=stars.height-intOffset;
		if(intOffset>0){
			ctx.drawImage(stars,
						  0, remaining, 
						  stars.width, intOffset,
						  0,0,
						  stars.width,intOffset);
		};
		if(remaining>0){
			ctx.drawImage(stars,
						  0, 0, 
						  stars.width, remaining,
						  0,intOffset,
						  stars.width,remaining);
		};
	};


	this.step=function(dt){
		offset+=dt*speed;
		offset=offset%stars.height;
	};
}


//猪脚
var PlayerShip=function(){
	this.w=SpriteSheet.map['ship'].w;
	this.h=SpriteSheet.map['ship'].h;
	this.x=Game.width/2-this.w/2;
	this.y=Game.height-10-this.h;
	this.vx=0;
	this.maxVel=200;
	this.step=function(dt){
		if(Game.keys['left']){this.vx=-this.maxVel;}
		else if(Game.keys['right']){this.vx=this.maxVel;}
		else {this.vx=0;}
		this.x+=this.vx*dt;
		if(this.x<0){this.x=0;}
		else if(this.x>Game.width-this.w){this.x=Game.width-this.w;}
	};
	this.draw=function(ctx){
		SpriteSheet.draw(ctx,'ship',this.x,this.y,0);
	}
}

