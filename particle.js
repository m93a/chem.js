Library(
 'particle',
 ['vector'],
 function(){
 
 
 
 var Particle = function(r,m,px,py,vx,vy){
  if(!(this instanceof Particle)){
   return new Particle(r,m,px,py,vx,vy);
  };
  
  this.r = r>=1 ? r : 1;
  this.m = m>0  ? m : NaN;
  
  this.pos = Vector(px||NaN, py||NaN);
  this.vel = Vector(vx||0,   vy||0  );
  
  this.force = Vector(0,0);
  this.canvas = null;
  
  this.domElement = document.createElement('div');
  this.domElement.classList.add('particle');
  
 };
 
 Particle.prototype.dist = function(p){
  return this.pos.dist(p.pos);
 };
 Particle.prototype.dir = function(p){
  return this.pos.dir(p.pos);
 }
 
 Particle.prototype.colides = function(p){
  return (this.pos.dist(p.pos) - this.r - p.r) <= 0;
 };
 
 Particle.prototype.applyForce = function(x,y){
  this.force.add(x,y);
  return this;
 };
 
 Particle.prototype.applyForceA = function(l,α){
  this.force.addA(l,α);
  return this;
 };
 
 Particle.prototype.tick = function(){
  this.force.times(1/this.m);
  this.vel.add(this.force);
  this.pos.add(this.vel);
  this.force.times(0);
  
  this.domElement.style.left = this.pos.x+"px";
  this.domElement.style.top  = this.pos.y+"px";
 }
 
 
 window.Particle = Particle;
});
