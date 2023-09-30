import React, { useEffect, useState, useContext } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { AppContext } from "./App";
import fontkit from '@pdf-lib/fontkit'



function PdfEditor() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const { workOrder, companyName, purchaseOrder, date, time, done, currTime, currDate } =
    useContext(AppContext);

  useEffect(() => {
    async function modifyPdf() {
      try {
        const checklistUrl = "https://pepelopezcode.github.io/pdfs/qpc%20receiving%20checklist.pdf";
        const bigLabelUrl = "https://pepelopezcode.github.io/pdfs/BIG%20LABEL.docx.pdf";
        const expediteBigLabel = "https://pepelopezcode.github.io/pdfs/EXPEDITE%20%20BIG%20LABEL.docx.pdf";
        const calibriFontUrl = "https://pepelopezcode.github.io/pdfs/calibrib.ttf"

        const existingChecklistPdfBytes = await fetch(checklistUrl).then((res) =>
          res.arrayBuffer()
        );

        const checklistPdfDoc = await PDFDocument.load(existingChecklistPdfBytes);

        checklistPdfDoc.registerFontkit(fontkit)
        const fontResponse = await fetch(calibriFontUrl).then((res) => res.arrayBuffer())
        const calibriFont = await checklistPdfDoc.embedFont(fontResponse)
        
        const inputText = (xAxis, yAxis, text) => {
          firstPage.drawText(`${text}`, {
            x: xAxis,
            y: yAxis,
            size: 15,
            font: calibriFont,
            color: rgb(0, 0, 0),
          });
        };
        const checklistPages = checklistPdfDoc.getPages();
        const firstPage = checklistPages[0];
        // const { width, height } = firstPage.getSize();
        inputText(98, 622, companyName);
        inputText(450, 622, purchaseOrder);
        inputText(150, 597, date);
        inputText(387, 597, time);
        inputText(170, 525, "GOOD");
        inputText(370, 375, currDate);
        inputText(490, 375, currTime);
        inputText(174, 323, workOrder);
        inputText(370, 115, currDate);
        inputText(490, 115, currTime);

        const modifiedChecklistPdfBytes = await checklistPdfDoc.save();

        const modifiedChecklistPdfBlob = new Blob([modifiedChecklistPdfBytes], {
          type: "application/pdf",
        });

        const modifiedPdfDataUrl = URL.createObjectURL(modifiedChecklistPdfBlob);

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
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PdfEditor;
