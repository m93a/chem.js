Script(
 ['canvas','atom'],
 function(){
 
 console.log(window.Canvas,window.Atom);
 
 window.realTemperature = 1;
 window.temperature = NaN;
 
 var tempmeter = document.createElement('div');
 tempmeter.id = 'tempmeter';
 document.body.appendChild(tempmeter);
 
 window.canvas = Canvas('plane');
 
 window.a = Atom(1,1);
 a.pos.set(400,100);
 a.domElement.style.background = "blue";
 canvas.addParticle(a);
 
 var i = 10;
 while(--i>0){
  window.b = Atom(1,1);
  b.pos.set(400*Math.random(),200*Math.random());
  canvas.addParticle(b);
  switch(Math.random()*5%5|0){
   case 0:
    b.domElement.style.background = "blue";
    break;
   case 1:
    b.domElement.style.background = "red";
    break;
   case 2:
    b.domElement.style.background = "yellow";
    break;
   case 3:
    b.domElement.style.background = "green";
    break;
   case 4:
    b.domElement.style.background = "grey";
    break;
  }
 }
 
 function eachPair(a,b){
  
  var dist = a.dist(b);
  var dir  = a.dir(b);
  
  a.applyForceA(  300/(dist*dist) - 5000/(dist*dist*dist), dir );
  b.applyForceA( -300/(dist*dist) + 5000/(dist*dist*dist), dir );
  
  
  if(a.colides(b)){
   var avg = Vector(a.vel);
   avg.add(b.vel);
   avg.times(.5);
   a.vel.set(avg);
   b.vel.set(avg);
  }
  
 };
 
 
 var cotemp = 0;
 
 function each(a){
   var u = .5;
   var mx = window.innerWidth;
   var my = window.innerHeight;
  
  (a.pos.x < 0 ) && (a.vel.x =  Math.abs(a.vel.x),a.pos.x=0 );
  (a.pos.x > mx) && (a.vel.x = -Math.abs(a.vel.x),a.pos.x=mx);
  (a.pos.y < 0 ) && (a.vel.y =  Math.abs(a.vel.y),a.pos.y=0 );
  (a.pos.y > my) && (a.vel.y = -Math.abs(a.vel.y),a.pos.y=my);
  
  var q = (50+temperature/20/a.vel.abs())/51;
  isNaN(q) || a.vel.times(q);
  
  //FIXME Temporary; add decay
  if(a.vel.abs()>20){
   a.vel.norm();
   a.vel.times(20);
  }
  
  
  a.tick();
  
  cotemp += a.vel.abs();
 };
 
 
 function render(){
  cotemp = 0;
  canvas.particles.forEachPair(eachPair);
  canvas.particles.forEach    (each    );
  canvas.tick();
  
  //TODO real temperature http://goo.gl/IZZwuZ
  realTemperature = cotemp/canvas.particles.length;
  tempmeter.textContent = "T=" + (realTemperature*20|0) + "K";
 }
 
 setInterval(render,20);
 
 
 
});
