import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

function PdfEditor() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function modifyPdf() {
      try {
        const url = 'https://pepelopezcode.github.io/pdfs/qpc%20receiving%20checklist.pdf';
        const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        firstPage.drawText('This text was added with JavaScript!', {
          x: 150 ,
          y: 615,
          size: 15,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        const modifiedPdfBytes = await pdfDoc.save();

        // Create a Blob from the modified PDF bytes
        const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

        // Create a data URL for the modified PDF
        const modifiedPdfDataUrl = URL.createObjectURL(modifiedPdfBlob);

        setPdfUrl(modifiedPdfDataUrl);
      } catch (err) {
        setError(err.message || 'An error occurred while modifying the PDF.');
      }
    }

    modifyPdf();
  }, []);

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