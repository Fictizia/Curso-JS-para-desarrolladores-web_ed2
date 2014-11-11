function persona(primerNombre){
this.primerNombre=primerNombre;
}
persona.prototype.diHola=function(){
alert("Hola soy"+this.primerNombre);
}

function Estudiante(primerNombre, asunto)
{
    
    persona.call(this, primerNombre);
    this.asunto=asunto;
};

var persona1= new persona("Beatriz" );
var persona2= new persona("Angel" );
var funcionsaludar= persona1.diHola;
Estudiante.prototype= Object.create(persona.prototype)
Estudiante.prototype.constructor=Estudiante;
Estudiante.prototype.diHola=function(){alert("Hola soy "+this.primerNombre+"yo estoy estudiando"+this.asunto+".")}
Estudiante.prototype.diAdios=function(){alert("adios")}


