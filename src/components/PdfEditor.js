import React, { useEffect, useState, useContext } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { AppContext } from "./App";
import fontkit from '@pdf-lib/fontkit'



function PdfEditor() {
  const [checklistPdfUrl, setChecklistPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const { workOrder, companyName, purchaseOrder, date, time, done, currTime, currDate } =
    useContext(AppContext);

    async function copyFirstPageToSecondPage(labelPdf, checklistPdfDoc) {

      const [firstPage] = await labelPdf.copyPages(labelPdf, [0]);
    
      checklistPdfDoc.insertPage(1, firstPage);
    }

  useEffect(() => {
    async function modifyPdf() {
      try {
        const checklistUrl = "https://pepelopezcode.github.io/pdfs/qpc%20receiving%20checklist.pdf";
        const bigLabelUrl = "https://pepelopezcode.github.io/pdfs/BIG%20LABEL.docx.pdf";
        const expediteBigLabel = "https://pepelopezcode.github.io/pdfs/EXPEDITE%20%20BIG%20LABEL.docx.pdf";
        const calibriFontUrl = "https://pepelopezcode.github.io/pdfs/calibrib.ttf"

        const existingChecklistPdfBytes = await fetch(checklistUrl).then((res) => res.arrayBuffer());
        const existingBigLabePdfBytes = await fetch(bigLabelUrl).then((res) => res.arrayBuffer());
        const existingExpediteBigLabelPdfBytes = await fetch(expediteBigLabel).then((res) => res.arrayBuffer());

        const checklistPdfDoc = await PDFDocument.load(existingChecklistPdfBytes);
        const bigLabelPdfDoc = await PDFDocument.load(existingBigLabePdfBytes);
        const expediteBigLabelPdfDoc = await PDFDocument.load(existingExpediteBigLabelPdfBytes);


        checklistPdfDoc.registerFontkit(fontkit)
        bigLabelPdfDoc.registerFontkit(fontkit)
        expediteBigLabelPdfDoc.registerFontkit(fontkit)

        const fontResponse = await fetch(calibriFontUrl).then((res) => res.arrayBuffer())

        const checklistCalibriFont = await checklistPdfDoc.embedFont(fontResponse)
        const bigLabelCalibriFont = await checklistPdfDoc.embedFont(fontResponse)
        const expediteBigLabelCalibriFont = await checklistPdfDoc.embedFont(fontResponse)
        
        const inputText = (xAxis, yAxis, text, pdf, font) => {
          pdf.drawText(`${text}`, {
            x: xAxis,
            y: yAxis,
            size: 15,
            font: font,
            color: rgb(0, 0, 0),
          });
        };
          //stopped here gonna make everything for the big labels
        const checklistPages = checklistPdfDoc.getPages();
        const checklistFirstPage = checklistPages[0];
        
        inputText(98, 622, companyName, checklistFirstPage, checklistCalibriFont);
        inputText(450, 622, purchaseOrder, checklistFirstPage, checklistCalibriFont);
        inputText(150, 597, date, checklistFirstPage, checklistCalibriFont);
        inputText(387, 597, time, checklistFirstPage, checklistCalibriFont);
        inputText(170, 525, "GOOD", checklistFirstPage, checklistCalibriFont);
        inputText(370, 375, currDate, checklistFirstPage, checklistCalibriFont);
        inputText(490, 375, currTime, checklistFirstPage, checklistCalibriFont);
        inputText(174, 323, workOrder, checklistFirstPage, checklistCalibriFont);
        inputText(370, 115, currDate, checklistFirstPage, checklistCalibriFont);
        inputText(490, 115, currTime, checklistFirstPage, checklistCalibriFont);

        const modifiedChecklistPdfBytes = await checklistPdfDoc.save();


        const modifiedChecklistPdfBlob = new Blob([modifiedChecklistPdfBytes], {
          type: "application/pdf",
        });

        const modifiedChecklistPdfDataUrl = URL.createObjectURL(modifiedChecklistPdfBlob);

        setChecklistPdfUrl(modifiedChecklistPdfDataUrl);
      } catch (err) {
        setError(err.message || "An error occurred while modifying the PDF.");
      }
    }

    modifyPdf();
  }, [done]);

  const handlePrint = () => {
    if (checklistPdfUrl) {
      const printWindow = window.open(checklistPdfUrl);
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : checklistPdfUrl ? (
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
