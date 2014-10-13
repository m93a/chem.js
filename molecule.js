Library(
 'molecule',
 ['particle'],
 function(){
 
 var Molecule = function(){
  if(!(this instanceof Molecule)){
   return new Molecule();
  }
  
  this.particles = Object.create(
   Canvas.prototype.particles
  );
  
 };
 
 
 Molecule.prototype.particles = [];
 
 /* * * *
  * addParticle(particle)
  * * * */
 Molecule.prototype.addParticle = function(p){
  if(!a instanceof Particle){
   throw Error("Argument 1 does not impement Atom");
  }
  
  this.particles.push(p);
  p.molecule = this;
 }
 
 
 window.Molecule = Molecule;
});
