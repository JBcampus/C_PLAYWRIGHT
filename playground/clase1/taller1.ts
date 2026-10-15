// variables const & let, this one allows to reassign a value.
const curso = "Playwright";
let alumno = "Carlos";
//list
const notas = [15, 18, 14, 20]; //list
// Javascriptconsole.log 
function mostrarAlumno(nombre) {
    console.log("Alumno:", nombre);
}
mostrarAlumno(alumno);
if (notas[0] >= 11) {
    console.log("Aprobado");
} else {
    console.log("Desaprobado");
}
for (const i in notas) {
    console.log("Nota", i, ":", notas[i]);
}
for (const nota of notas) {
    console.log(nota);
}