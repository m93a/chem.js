Library(
 'vector',
 function(){
 
 
 
 var Vector = function(x,y){
  if(!(this instanceof Vector)){
   return new Vector(x,y);
  };
  
  
  if(typeof x == "object"){
   this.x = x.x;
   this.y = x.y;
  }else{
   this.x = x;
   this.y = y;
  }
 };
 
 VectorA = function(l,α){
  if(!(this instanceof VectorA)){
   return new VectorA(l,α);
  };
  
  this.x = l*Math.cos(α);
  this.y = l*Math.sin(α);
 };
 VectorA.prototype = Vector.prototype;
 
 Vector.prototype.set = function(x,y){
  if(typeof x == "object"){
   y = x.y;
   x = x.x;
  }
  this.x = x;
  this.y = y;
  return this;
 };
 
 Vector.prototype.setA = function(l,α){
  this.set( VectorA(l,α) );
 };
 
 Vector.prototype.add = function(x,y){
  if(typeof x == "object"){
   y = x.y;
   x = x.x;
  }
  this.x += x;
  this.y += y;
  return this;
 };
 
 Vector.prototype.addA = function(l,α){
  this.add( VectorA(l,α) );
 };
 
 Vector.prototype.times = function(x){
  this.x *= x;
  this.y *= x;
  return this;
 };
 
 Vector.prototype.abs = function(){
  return Math.sqrt(
   this.x*this.x + this.y*this.y
  );
 };
 
 Vector.prototype.dist = function(x,y){
  if(typeof x == "object"){
   y = x.y;
   x = x.x;
  }
  x = Math.abs(this.x - x);
  y = Math.abs(this.y - y);
  
  
  return Math.sqrt(
   x*x + y*y
  );
 };
 
 Vector.prototype.distA = function(l,α){
  var x = Math.abs( l*Math.cos(α)-this.x );
  var y = Math.abs( l*Math.sin(α)-this.y );
  
  return Math.sqrt(
   x*x + y*y
  );
 };
 
 Vector.prototype.dir = function(v){
  return v.y - this.y >= 0
   ? Math.acos((v.x - this.x) / this.dist(v))
   :-Math.acos((v.x - this.x) / this.dist(v))+2*Math.PI;
 };
 
 Vector.prototype.dirA = function(l,α){
  return this.dir( VectorA(l,α) );
 }
 
 Vector.prototype.norm = function(){
  this.times(1/this.abs());
  return this;
 };
 
 
 window.Vector = Vector;
});
