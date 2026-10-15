const curso = "Playwright";
let alumno = "Jose";
const notas = [15, 18, 14, 20, 10];

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
