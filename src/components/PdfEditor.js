import React, { useEffect, useState, useContext } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { AppContext } from "./App";

function PdfEditor() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const { workOrder, companyName, purchaseOrder, date, time, done, currTime, currDate } =
    useContext(AppContext);

  useEffect(() => {
    async function modifyPdf() {
      try {
        const url =
          "https://pepelopezcode.github.io/pdfs/qpc%20receiving%20checklist.pdf";
        const existingPdfBytes = await fetch(url).then((res) =>
          res.arrayBuffer()
        );

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const inputText = (xAxis, yAxis, text) => {
          firstPage.drawText(`${text}`, {
            x: xAxis,
            y: yAxis,
            size: 15,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        };
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        // const { width, height } = firstPage.getSize();
        inputText(87, 638, companyName);
        inputText(430, 642, purchaseOrder);
        inputText(150, 615, date);
        inputText(375, 618, time);
        inputText(160, 540, "GOOD");
        inputText(350, 385, currDate);
        inputText(460, 385, currTime);
        inputText(168, 330, workOrder);
        inputText(345, 112, currDate);
        inputText(460, 112, currTime);

        const modifiedPdfBytes = await pdfDoc.save();

        const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
          type: "application/pdf",
        });

        const modifiedPdfDataUrl = URL.createObjectURL(modifiedPdfBlob);

        setPdfUrl(modifiedPdfDataUrl);
      } catch (err) {
        setError(err.message || "An error occurred while modifying the PDF.");
      }
    }

    modifyPdf();
  }, [done]);

  const handlePrint = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl);
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : pdfUrl ? (
        <div>
          <button onClick={handlePrint}>Print Modified PDF</button>
          <a href={pdfUrl} download="modified_pdf.pdf">
            Download Modified PDF
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PdfEditor;
