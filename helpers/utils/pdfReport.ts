import PDFDocument from "pdfkit";
import fs from "fs";

export async function createPdfReport(
  testName: string,
  screenshotPath: string,
  status: string
) {
  const doc = new PDFDocument();

  const pdfFile =
    `reports/${testName.replace(/[^a-z0-9]/gi, "_")}.pdf`;

  doc.pipe(fs.createWriteStream(pdfFile));

  doc.fontSize(20).text("Playwright Automation Report");

  doc.moveDown();

  doc.fontSize(14).text(`Test: ${testName}`);
  doc.text(`Status: ${status}`);

  doc.moveDown();

  if (fs.existsSync(screenshotPath)) {
    doc.image(screenshotPath, {
      fit: [500, 400],
      align: "center",
    });
  }

  doc.end();
}