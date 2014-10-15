Library(
 'atom',
 ['vector','particle','molecule'],
 function(){
 
 
 /*
  i = j = 0;
  while(i++<4){
   k=4*(i/2|0)+j+2;
   (i%2)&&(j+=k);
   console.log(j);
  }
  k;
 */
 
 var Atom = function(Z, X, px, py){
  if(!(this instanceof Atom)){
   return new Atom(Z, X, px, py);
  };
  
  this.Z = Z;
  this.X = X;
  
  this.r = 10;
  this.m = Z; //FIXME find approx. m = f(Z)
  
  if(
   px!=undefined &&
   py!=undefined
  ){
   this.pos = Vector(px, py);
  }else{
   this.pos = Vector(NaN,NaN);
  }
  
  this.vel   = Vector(0,0);
  this.force = Vector(0,0);
  
  this.domElement = document.createElement('div');
  this.domElement.classList.add('particle');
  this.domElement.classList.add('atom'    );
  this.domElement.particle = this;
  
 };
 
 
 
 Atom.prototype = Object.create(Particle.prototype);
 
 Atom.prototype.molecule = null;
 Atom.prototype.bonds    = null;
 
 
 
 Atom.prototype.addBond = function(a){
  if(!(a instanceof Atom)){
   throw Error("Argument 1 does not implement Atom.");
  }
  
  if(!this.molecule){
   this.molecule = Molecule();
   this.molecule.addParticle(this);
  }
  this.molecule.addParticle(a);
  
  (!this.bonds)&&(this.bonds = []);
  this.bonds.push(a);
  (!a.bonds)&&(a.bonds = []);
  a.bonds.push(this);
 };
 
 
 
 Atom.prototype.free = function(){
  if(this.molecule){
   this.molecule = null;
  }
  
  if(this.bonds){
   this.bonds.forEach(function(a){
    var i = a.bonds.indexOf(this);
    a.bonds.slice(i,++i);
   });
   this.bonds = null;
  }
 };
 
 
 
 /*Atom.prototype.tick = function(){
  var self = this;
  if(this.bonds){
   this.bonds.forEach(function(a){
    var dist = 1/self.dist(a);
    var dir  = self.dir(a);
    self.applyForceA(500*dist*dist, dir);
   });
  }
  Particle.prototype.tick.call(this);
 };*/
 
 
 window.Atom = Atom;
 
});
