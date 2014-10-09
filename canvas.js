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
  
  this.particles = [];
  
  this.addParticle = function(p){
   if(!p instanceof Particle){
    throw Error("Argument 1 does not impement Particle");
   }
   
   this.particles.push(p);
   this.domElement.appendChild(p.domElement);
  }
 };
 
 
 
 window.Canvas = Canvas;
});
