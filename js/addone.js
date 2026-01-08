var listener={};
Object.defineProperty(createjs.MovieClip.prototype, "prevFrame", {value:function(){this.gotoAndStop(Math.max(this.currentFrame-1,0))}});
Object.defineProperty(createjs.MovieClip.prototype, "nextFrame", {value:function(){this.gotoAndStop(Math.min(this.currentFrame+1,this.totalFrames-1))}});
Object.defineProperty(createjs.MovieClip.prototype, "hitTest", {value:function(a,b,w,h){
	return Math.abs(a.x - a.parent.x - b.x - b.parent.x) / 2 < w && Math.abs(a.y -a.parent.y - b.y - b.parent.y) / 2 < h;
}});
Object.defineProperty(createjs.MovieClip.prototype, "hitTestPoint", {value:function(a){
	var _this=this;
	var b = _this.getCenter();
	var obj = { a:a, b:b, t:{ x:int(_this.x), y:int(_this.y)} };
	obj.rx = Math.abs(obj.a.x-obj.b.x);
	obj.ry = Math.abs(obj.a.y-obj.b.y);
	obj.hit = obj.rx < obj.b.b.width && obj.ry < obj.b.b.height;
	//log( obj );
	return obj.hit;
}});
Object.defineProperty(createjs.MovieClip.prototype, "hitTestCenter", {value:function(mc){
	var _this=this;
	var a = mc.getCenter();
	var b = _this.getCenter();
	var obj = { a:a, b:b, t:{ x:int(_this.x), y:int(_this.y)} };
	obj.rx = Math.abs(obj.a.x-obj.b.x);
	obj.ry = Math.abs(obj.a.y-obj.b.y);
	obj.hit = obj.rx < obj.b.b.width && obj.ry < obj.b.b.height;
	//log( obj );
	return obj.hit;
}});
Object.defineProperty(createjs.MovieClip.prototype, "getCenter", {value:function(){
	var _this=this, obj;
	var b = _this.nominalBounds;
	obj = { x:int(b.x+b.width/2+_this.x), y:int(b.y+b.height/2+_this.y), b:b, ox: _this.x, oy:_this.y };
	return obj;
}});
Object.defineProperty(window.__proto__, "root", {get:function (){ return stage.getChildAt(0)}});
Object.defineProperty(createjs.MovieClip.prototype, "on", {value:function (a,b){
	var _this=this;
	if (isMobile) {
		if (a!="click") a = a + "m";
		if (!listener[a]) listener[a]=[];
		else listener[a].push({a:_this, b:b});
		_this.root.ct.text = a+"";
	}
	_this.addEventListener(a,b);
}});
Object.defineProperty(window.__proto__, "isiOS", {get:function (){ return navigator.userAgent.match(/iPhone|iPad|iPod/i);}});
Object.defineProperty(window.__proto__, "isAndroid", {get:function (){ return navigator.userAgent.match(/Android/i);}});
Object.defineProperty(window.__proto__, "isMobile", {get:function (){ return isiOS || isAndroid;}});
Object.defineProperty(window.__proto__, "nextmc", {get:function (){ return stage.getChildAt(0).nextmc;}});
Object.defineProperty(window.__proto__, "int", {value:parseInt});
Object.defineProperty(window.__proto__, "number", {value:parseFloat});
Object.defineProperty(window.__proto__, "log", {value:console.log});
Object.defineProperty(window.__proto__, "drawPie", {value:drawPie});
Object.defineProperty(window.__proto__, "Play", {value:function() { stage.children[0].play(); }});
Object.defineProperty(window.__proto__, "Check", {value:function(n) { stage.children[0].Check(n); }});
Object.defineProperty(Math.__proto__, "round2", {value:function(n,s) { return Math.round(n * Math.pow(10, s)) / Math.pow(10, s); }});

function playSound(id, loop) {
	//return createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);
	return createjs.Sound.play(id, {loop:loop});
	
}
function Draw(mc){
	var g = new createjs.Graphics();
	g.setStrokeStyle(1);
	g.beginStroke("#000000");
	g.beginFill("0xff000011");
	g.drawCircle(0,0,30);
}

function drawPie(data, mc, radius = 80, color = ["#f66", "#6c6", "#66f", "#fc6", "#ccc"]) {
  var g = mc.graphics;
  
  //var g = shape.Graphics;
  var total = data.reduce(function (a, b) { return a + b; }, 0);

  var cx = 0;   // 以 MovieClip 自己的 (0,0) 為中心
  var cy = 0;
  var r  = radius;

  var startAngle = -Math.PI / 2;   // 從正上方開始

  var colors = color;

  data.forEach(function (value, idx) {
    var sliceAngle = value / total * Math.PI * 2;
    var endAngle = startAngle + sliceAngle;

    g.beginFill(colors[idx % colors.length]);
    g.moveTo(cx, cy);
    g.arc(cx, cy, r, startAngle, endAngle);
    g.lineTo(cx, cy);
    g.endFill();

    startAngle = endAngle;
  });
};
