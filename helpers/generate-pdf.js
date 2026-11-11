import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const helperDir = path.dirname(fileURLToPath(import.meta.url));
const evidenciasDir = path.join(helperDir, "..", "reports", "evidencias");
const outputPdf = path.join(
  helperDir,
  "..",
  "reports",
  "Evidencias_Integrador.pdf",
);
const evidenceFiles = [
  "1-suite1-login.png",
  "2-suite2-01-productos-seleccionados.png",
  "2-suite2-02-carrito-productos-elegidos.png",
  "2-suite2-03-datos-cliente.png",
  "2-suite2-04-checkout.png",
  "2-suite2-05-compra-exitosa.png",
  "2-suite2-06-logout.png",
];

if (!fs.existsSync(evidenciasDir)) {
  console.log("No se encontró la carpeta de evidencias.");
  process.exit(0);
}

const files = evidenceFiles.filter((file) =>
  fs.existsSync(path.join(evidenciasDir, file)),
);

if (files.length === 0) {
  console.log("No hay imágenes para generar el PDF.");
  process.exit(0);
}

const missingFiles = evidenceFiles.filter(
  (file) => !fs.existsSync(path.join(evidenciasDir, file)),
);
if (missingFiles.length > 0) {
  throw new Error(
    `Faltan evidencias para generar el PDF: ${missingFiles.join(", ")}`,
  );
}

const doc = new PDFDocument({ autoFirstPage: false });
doc.pipe(fs.createWriteStream(outputPdf));

files.forEach((file, index) => {
  const filePath = path.join(evidenciasDir, file);
  doc.addPage({ size: "A4", margin: 40 });
  doc.fontSize(14).text(`Evidencia ${index + 1}: ${file}`, { align: "center" });
  doc.moveDown(1);
  doc.image(filePath, {
    fit: [515, 700],
    align: "center",
    valign: "center",
  });
});

doc.end();
console.log(`PDF generado exitosamente en: ${outputPdf}`);
