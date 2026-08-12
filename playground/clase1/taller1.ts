const curso = "Playwright";
let alumno = "Daniel";
const notas = [15, 18, 14, 20];
function mostrarAlumno(nombre: string) {
  console.log("Alumno:", nombre);
}

mostrarAlumno(alumno);

if (notas[0] >= 11) {
  console.log("El alumno aprobó el curso de", curso);
} else {
  console.log("El alumno no aprobó el curso de", curso);
}

//aca nos devuelve el valor del indice del arreglo
for (const i in notas) {
  console.log("Nota", i, ":", notas[i]);
}
//aca ingresa directamente al valor de cada elemento del arreglo
for (const nota of notas) {
  console.log(nota);
}
