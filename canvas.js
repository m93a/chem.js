Library(
 'canvas',
 ['particle'],
 function(){
 
 
 
 var Canvas = function(id){
  if(!(this instanceof Canvas)){
   return new Canvas(id);
  };
  
  this.domElement = document.createElement('div');
  this.domElement.id = id;
  document.body.appendChild(this.domElement);
  
  this.particles = Object.create(Canvas.prototype.particles);
  
  
 };
 
 
 
 Canvas.prototype.particles = [];
 
 /* * * *
  * addParticle(particle)
  * * * */
 Canvas.prototype.addParticle = function(p){
  if(!p instanceof Particle){
   throw Error("Argument 1 does not impement Particle");
  }
  
  this.particles.push(p);
  this.domElement.appendChild(p.domElement);
 }
 
 
 
 /* * * *
  * particles.forEachPair(itself, callback)
  * * * */
 Canvas.prototype.particles.forEachPair = function(x,f){
  if(typeof x == "function"){
   f = x;
   x = false;
  }
  
  var i = -1, j;
  var l = this.length;
  var a, b;
  
  while(++i<l){
   a = this[i];
   j = -1;
   while(++j<l){
    b = this[j];
    if(a!==b||x){
     f(a,b);
    }
   }
  }
 };
 
 
 Canvas.prototype.tick = function(){
  this.particles.forEachPair(function(a,b){
   
   a.colisions && a.colides(b) && a.colisions.push(b);
   
  })
 };
 
 
 window.Canvas = Canvas;
});
