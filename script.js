window.addEventListener('load',function(){
 
 window.realTemperature = 1;
 window.temperature = 20;
 
 var tempmeter = document.createElement('div');
 tempmeter.id = 'tempmeter';
 document.body.appendChild(tempmeter);
 
 var canvas = Canvas('plane');
 window.a = Particle(1,1);
 a.pos.set(100,100);
 a.r = 10;
 a.domElement.style.background = "blue";
 canvas.addParticle(a);
 
 var i = 30;
 var b;
 while(i--){
  b = Particle(1,1);
  b.pos.set(1000*Math.random(),300*Math.random());
  b.r = 10;
  canvas.addParticle(b);
 }
 
 function eachPair(a,b){
  if(a.colides(b)){ console.log('bang!'); }
  
  var dist = a.dist(b);
  var dir  = a.dir(b);
  
  a.applyForceA( -5000/(dist*dist*dist), dir );
  b.applyForceA(  5000/(dist*dist*dist), dir );
  
 };
 
 
 var cotemp = 0;
 
 function each(a){
   var u = .5;
   var mx = window.innerWidth;
   var my = window.innerHeight;
  
  (a.pos.x < 0 ) && a.applyForce(  u, 0 );
  (a.pos.x > mx) && a.applyForce( -u, 0 );
  (a.pos.y < 0 ) && a.applyForce(  0, u );
  (a.pos.y > my) && a.applyForce(  0,-u );
  
  var q = (50+temperature/realTemperature)/51;
  isNaN(q) || a.vel.times(q);
  
  
  a.tick();
  
  cotemp += a.vel.abs();
 };
 
 
 function render(){
  cotemp = 0;
  canvas.particles.forEachPair(eachPair);
  canvas.particles.forEach    (each    );
  
  realTemperature = cotemp;
  tempmeter.textContent = "T=" + (realTemperature|0) + "°";
 }
 
 setInterval(render,20);
 
 
 
});
