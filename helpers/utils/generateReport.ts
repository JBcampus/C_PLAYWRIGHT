import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { glob } from "glob";

async function generateReport() {
  const doc = new PDFDocument({
    margin: 30,
    autoFirstPage: false,
  });

  const reportPath =
    "reports/AutomationExerciseReport.pdf";

  doc.pipe(fs.createWriteStream(reportPath));

  const screenshots = await glob(
    "screenshots/*.png"
  );

  for (const screenshot of screenshots) {
    doc.addPage();

    const testName = path
      .basename(screenshot)
      .replace(".png", "")
      .replace(/_/g, " ");

    doc.fontSize(18);
    doc.text("Automation Exercise Report");

    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Test: ${testName}`);

    doc.moveDown();

    doc.image(screenshot, {
      fit: [500, 400],
      align: "center",
      valign: "center",
    });
  }

  doc.end();

  console.log("PDF creado correctamente");
}

generateReport();