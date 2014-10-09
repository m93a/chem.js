window.addEventListener('load',function(){
 
 
 var canvas = Canvas('plane');
 window.a = Particle(1,1);
 a.pos.set(100,100);
 a.r = 10;
 canvas.addParticle(a);
 
 window.b = Particle(1,1);
 b.pos.set(500,200);
 b.r = 10;
 canvas.addParticle(b);
 
 function render(){
  var x;
  
  if(a.colides(b)){ alert('bang!'); }
  
  x = a.dist(b);
  a.applyForceA(
   /*500/(x*x)*/ - 10000/(x*x*x),
   a.dir(b)
  );
  
  x = b.dist(a);
  b.applyForceA(
   /*500/(x*x)*/ - 10000/(x*x*x),
   b.dir(a)
  );
  
  a.tick();
  b.tick();
 }
 setInterval(render,50);
 
 
 
});
