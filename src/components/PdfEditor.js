import { useEffect, useContext,  useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { AppContext } from "./App";
import fontkit from '@pdf-lib/fontkit'



function PdfEditor() {

  const { 
    workOrder, 
    companyName, 
    purchaseOrder, 
    date, 
    time, 
    currTime, 
    currDate, 
    isExpedite, 
    qty, 
    setCombinedPdfUrl, 
    packageType,
    numberOfPackages,
    shippingMethod,
    hardwareDescription,
    packageCondition,
    combinedPdfUrl 
  
   } = useContext(AppContext);

  const [checklistPdfDoc, setChecklistPdfDoc] = useState(null);
  const [bigLabelPdfDoc, setBigLabelPdfDoc] = useState(null);
  const [expediteBigLabelPdfDoc, setExpediteBigLabelPdfDoc] = useState(null);
  const [calibriFont, setCalibriFont] = useState(null);
 
 

  const checklistUrl = "https://pepelopezcode.github.io/pdfs/Revised%20receiving%20checklist.pdf";
  const bigLabelUrl = "https://pepelopezcode.github.io/pdfs/BIG%20LABEL.docx.pdf";
  const expediteBigLabel = "https://pepelopezcode.github.io/pdfs/EXPEDITE%20%20BIG%20LABEL.docx.pdf";
  const calibriFontUrl = "https://pepelopezcode.github.io/pdfs/calibrib.ttf"


  useEffect(() => {
    async function fetchPdfAndFont () {
      async function fetchPdf (url) {
        const response = await fetch(url);
        const pdfBytes = await response.arrayBuffer();
        return PDFDocument.load(pdfBytes);
      };

      const checklistPdf = await fetchPdf(checklistUrl);
      const bigLabelPdf = await fetchPdf(bigLabelUrl);
      const expediteBigLabelPdf = await fetchPdf(expediteBigLabel);

      checklistPdf.registerFontkit(fontkit);
      bigLabelPdf.registerFontkit(fontkit);
      expediteBigLabelPdf.registerFontkit(fontkit);

      const fontResponse = await fetch(calibriFontUrl);
      const fontBytes = await fontResponse.arrayBuffer();

      const checklistCalibriFont = await checklistPdf.embedFont(fontBytes);
      const bigLabelCalibriFont = await bigLabelPdf.embedFont(fontBytes);
      const expediteBigLabelCalibriFont = await expediteBigLabelPdf.embedFont(fontBytes);

      setChecklistPdfDoc(checklistPdf);
      setBigLabelPdfDoc(bigLabelPdf);
      setExpediteBigLabelPdfDoc(expediteBigLabelPdf);
      setCalibriFont({
        checklist: checklistCalibriFont,
        bigLabel: bigLabelCalibriFont,
        expediteBigLabel: expediteBigLabelCalibriFont,
      });
    };

    fetchPdfAndFont();
  }, []);


  async function copyFirstPageToSecondPage(labelPdf, checklistPdf) {      
      const modifiedChecklist = await PDFDocument.load(checklistPdf);
      const modifiedBIgLabe = await PDFDocument.load(labelPdf);
     
      const [firstPage] = await modifiedChecklist.copyPages(modifiedBIgLabe, [0]);

      modifiedChecklist.addPage(firstPage);

      const copiedPdf = await modifiedChecklist.save();

      return copiedPdf;
    }
    
 

  


  async function modifyPdf() {
    
        if (!checklistPdfDoc || !bigLabelPdfDoc || !expediteBigLabelPdfDoc || !calibriFont) {
          console.log('not loaded')
          return;
    }
    
    
   
        // const existingChecklistPdfBytes = await fetch(checklistUrl).then((res) => res.arrayBuffer());
        // const existingBigLabePdfBytes = await fetch(bigLabelUrl).then((res) => res.arrayBuffer());
        // const existingExpediteBigLabelPdfBytes = await fetch(expediteBigLabel).then((res) => res.arrayBuffer());

        // const checklistPdfDoc = await PDFDocument.load(existingChecklistPdfBytes);
        // const bigLabelPdfDoc = await PDFDocument.load(existingBigLabePdfBytes);
        // const expediteBigLabelPdfDoc = await PDFDocument.load(existingExpediteBigLabelPdfBytes);

        const { checklist, bigLabel, expediteBigLabel } = calibriFont;

        // checklistPdfDoc.registerFontkit(fontkit)
        // bigLabelPdfDoc.registerFontkit(fontkit)
        // expediteBigLabelPdfDoc.registerFontkit(fontkit)

        // const fontResponse = await fetch(calibriFontUrl).then((res) => res.arrayBuffer())

        // const checklistCalibriFont = await checklistPdfDoc.embedFont(fontResponse)
        // const bigLabel = await bigLabelPdfDoc.embedFont(fontResponse)
        // const expediteBigLabel = await expediteBigLabelPdfDoc.embedFont(fontResponse)
        
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
        
        inputText(98, 615, companyName, checklistFirstPage, checklist, 15);
        inputText(453, 615, purchaseOrder, checklistFirstPage, checklist, 15);
        inputText(160, 570, date, checklistFirstPage, checklist, 15);
        inputText(435, 570, time, checklistFirstPage, checklist, 15);
        inputText(180, 500, packageCondition, checklistFirstPage, checklist, 15);
        inputText(372, 85, currDate, checklistFirstPage, checklist, 15);
        inputText(492, 85, currTime, checklistFirstPage, checklist, 15);
        inputText(187, 423, hardwareDescription, checklistFirstPage, checklist, 15);
        inputText(372, 115, currDate, checklistFirstPage, checklist, 15);
        inputText(492, 115, currTime, checklistFirstPage, checklist, 15);
        inputText(530, 524, numberOfPackages, checklistFirstPage, checklist, 15)
        inputText(125, 545, shippingMethod, checklistFirstPage,checklist, 15)
        


        const circlePackageType = (type) => {
          let xAxis = 0
          let yAxis = 0
          let xScaleSize = 0
          if (type === 'Box'){
            xAxis = 170;
            yAxis = 527;
          }else if (type === 'Pallet'){
            xAxis = 215;
            yAxis = 527;
          }else if (type === 'Crate'){
            xAxis = 258;
            yAxis = 527;
          }else if (type === 'Loose'){
            xAxis = 302;
            yAxis = 527;
          }else {
            xAxis = 355;
            yAxis = 527;
          }

          xAxis === 355 ? xScaleSize = 24 : xScaleSize = 18

          checklistFirstPage.drawEllipse({
            x: xAxis,
            y: yAxis,
            xScale: xScaleSize,
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

        inputText(200, 724.5, companyName, bigLabelFirstPage, bigLabel, 32);
        inputText(85, 652, purchaseOrder, bigLabelFirstPage, bigLabel,28);
        inputText(285, 652, qty, bigLabelFirstPage, bigLabel, 28);
        inputText(145, 515, workOrder, bigLabelFirstPage, bigLabel, 125);

        const modifiedBigLabelBytes = await bigLabelPdfDoc.save()

        const expediteBigLabelPages = expediteBigLabelPdfDoc.getPages();
        const expediteBigLabelFirstPage = expediteBigLabelPages[0]

        inputText(200, 724.5, companyName, expediteBigLabelFirstPage, expediteBigLabel, 32);
        inputText(85, 652, purchaseOrder, expediteBigLabelFirstPage, expediteBigLabel,28);
        inputText(285, 652, qty, expediteBigLabelFirstPage, expediteBigLabel, 28);
        inputText(145, 515, workOrder, expediteBigLabelFirstPage, expediteBigLabel, 125);

        const modifiedExpediteBigLabelBytes = await expediteBigLabelPdfDoc.save()

        const chosenBigLabel = isExpedite ?  modifiedExpediteBigLabelBytes : modifiedBigLabelBytes ;

        const combinedPdfs = await copyFirstPageToSecondPage(chosenBigLabel, modifiedChecklistPdfBytes)
          console.log(combinedPdfs)
        const modifiedCombinedPdfBlob = new Blob([combinedPdfs], {
          type: "application/pdf",
        });


        console.log(modifiedCombinedPdfBlob)
        const modifiedCombinedPdfDataUrl = URL.createObjectURL(modifiedCombinedPdfBlob);
        

        setCombinedPdfUrl( modifiedCombinedPdfDataUrl);
      
    }
console.log(combinedPdfUrl)
  useEffect(() => {
    
    modifyPdf();
  }, [companyName, currDate, currTime, date, hardwareDescription, isExpedite, numberOfPackages, packageCondition, packageType, purchaseOrder, qty, shippingMethod, time, workOrder]);

 

  
}

export default PdfEditor;
