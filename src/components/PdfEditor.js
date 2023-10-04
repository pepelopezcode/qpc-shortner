import React, { useEffect, useState, useContext } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { AppContext } from "./App";
import fontkit from '@pdf-lib/fontkit'



function PdfEditor() {

  const [error, setError] = useState(null);
  const { 
    workOrder, 
    companyName, 
    purchaseOrder, 
    date, 
    time, 
    done, 
    currTime, 
    currDate, 
    isExpedite, 
    qty, 
    setCombinedPdfUrl, 
    packageType,
    numberOfPackages} =
    useContext(AppContext);

    async function copyFirstPageToSecondPage(labelPdf, checklistPdf) {      
      const modifiedChecklist = await PDFDocument.load(checklistPdf);
      const modifiedBIgLabe = await PDFDocument.load(labelPdf);
     
      const [firstPage] = await modifiedChecklist.copyPages(modifiedBIgLabe, [0]);

      modifiedChecklist.addPage(firstPage);

      const copiedPdf = await modifiedChecklist.save();

      return copiedPdf;
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
        const bigLabelCalibriFont = await bigLabelPdfDoc.embedFont(fontResponse)
        const expediteBigLabelCalibriFont = await expediteBigLabelPdfDoc.embedFont(fontResponse)
        
        const inputText = (xAxis, yAxis, text, pdf, font, fontSize) => {
          pdf.drawText(`${text}`, {
            x: xAxis,
            y: yAxis,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
        };
        
        const checklistPages = checklistPdfDoc.getPages();
        const checklistFirstPage = checklistPages[0];
        
        inputText(98, 622, companyName, checklistFirstPage, checklistCalibriFont, 15);
        inputText(450, 622, purchaseOrder, checklistFirstPage, checklistCalibriFont, 15);
        inputText(150, 597, date, checklistFirstPage, checklistCalibriFont, 15);
        inputText(387, 597, time, checklistFirstPage, checklistCalibriFont, 15);
        inputText(170, 525, "GOOD", checklistFirstPage, checklistCalibriFont, 15);
        inputText(370, 375, currDate, checklistFirstPage, checklistCalibriFont, 15);
        inputText(490, 375, currTime, checklistFirstPage, checklistCalibriFont, 15);
        inputText(174, 323, workOrder, checklistFirstPage, checklistCalibriFont, 15);
        inputText(370, 115, currDate, checklistFirstPage, checklistCalibriFont, 15);
        inputText(490, 115, currTime, checklistFirstPage, checklistCalibriFont, 15);
        inputText(425, 550, numberOfPackages, checklistFirstPage, checklistCalibriFont, 15)


        const circlePackageType = (type) => {
          let xAxis = 0
          let yAxis = 0
          if (type === 'Box'){
            xAxis = 162;
            yAxis = 555;
          }else if (type === 'Pallet'){
            xAxis = 200;
            yAxis = 555;
          }else if (type === 'Crate'){
            xAxis = 240;
            yAxis = 555;
          }else {
            xAxis = 278;
            yAxis = 555;
          }
          checklistFirstPage.drawEllipse({
            x: xAxis,
            y: yAxis,
            xScale: 16,
            yScale: 11,
            borderWidth: 2,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            opacity: 0,
            borderOpacity: 1,
          })
        }

        circlePackageType(packageType)

        
        const modifiedChecklistPdfBytes = await checklistPdfDoc.save();

        

        const bigLabelPages = bigLabelPdfDoc.getPages();
        const bigLabelFirstPage = bigLabelPages[0]

        inputText(200, 724.5, companyName, bigLabelFirstPage, bigLabelCalibriFont, 32);
        inputText(85, 652, purchaseOrder, bigLabelFirstPage, bigLabelCalibriFont,28);
        inputText(285, 652, qty, bigLabelFirstPage, bigLabelCalibriFont, 28);
        inputText(145, 515, workOrder, bigLabelFirstPage, bigLabelCalibriFont, 125);

        const modifiedBigLabelBytes = await bigLabelPdfDoc.save()

        const expediteBigLabelPages = expediteBigLabelPdfDoc.getPages();
        const expediteBigLabelFirstPage = expediteBigLabelPages[0]

        inputText(200, 724.5, companyName, expediteBigLabelFirstPage, expediteBigLabelCalibriFont, 32);
        inputText(85, 652, purchaseOrder, expediteBigLabelFirstPage, expediteBigLabelCalibriFont,28);
        inputText(285, 652, qty, expediteBigLabelFirstPage, expediteBigLabelCalibriFont, 28);
        inputText(145, 515, workOrder, expediteBigLabelFirstPage, expediteBigLabelCalibriFont, 125);

        const modifiedExpediteBigLabelBytes = await expediteBigLabelPdfDoc.save()

        const chosenBigLabel = isExpedite ?  modifiedExpediteBigLabelBytes : modifiedBigLabelBytes ;

        const combinedPdfs = await copyFirstPageToSecondPage(chosenBigLabel, modifiedChecklistPdfBytes)

        const modifiedCombinedPdfBlob = new Blob([combinedPdfs], {
          type: "application/pdf",
        });

        const modifiedCombinedPdfDataUrl = URL.createObjectURL(modifiedCombinedPdfBlob);

        setCombinedPdfUrl(modifiedCombinedPdfDataUrl);
      } catch (err) {
        setError(err.message || "An error occurred while modifying the PDF.");
      }
    }

    modifyPdf();
  }, [done]);

 

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      )  : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PdfEditor;
