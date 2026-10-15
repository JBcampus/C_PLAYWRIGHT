const curso = "Playwright";

let alumno = "Carlos";

const notas = [15, 18, 9, 20]; 

function mostrarAlumno(nombre) {
    console.log("Alumno:", nombre);
}

mostrarAlumno(alumno);

if (notas[1] >= 11) {
    console.log("Aprobado");
} else {
    console.log("Desaprobado");
}

for (const i in notas) {
    console.log("Nota", i, ":", notas[i]); // --->  "Nota2:9"
}

for (const nota of notas) {
    console.log(nota);
}
