import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {qpcChecklist} from './pdfs'

const PdfEditor = () => {
  const [pdfDataUri, setPdfDataUri] = useState(null);

  const fillPdfForm = async () => {
    try {
      // Fetch the PDF with form fields
      const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf';
    //   const formBytes = await fetch(formUrl).then((res) => {res.arrayBuffer()});
      const formBytes = qpcChecklist.arrayBuffer()
      console.log(formBytes)

      // Fetch the Ubuntu font
      const fontUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
      const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

      // Load the PDF with form fields
      const pdfDoc = await PDFDocument.load(formBytes);

      // Embed the Ubuntu font
      pdfDoc.registerFontkit(fontkit);
      const ubuntuFont = await pdfDoc.embedFont(fontBytes);

      // Get two text fields from the form
      const form = pdfDoc.getForm();
      const nameField = form.getTextField('CharacterName 2');
      const ageField = form.getTextField('Age');

      // Fill the text fields with some fancy Unicode characters
      nameField.setText('Ӎӑȑїõ');
      ageField.setText('24 ŷȇȁŗš');

      // Update the field appearances with the Ubuntu font
      form.updateFieldAppearances(ubuntuFont);

      // Save the PDF with filled form fields as a Blob
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const dataUri = URL.createObjectURL(blob);
      setPdfDataUri(dataUri);
    } catch (error) {
      console.error('Error filling PDF form:', error);
    }
  };

  useEffect(() => {
    fillPdfForm();
  }, []);

  return (
    <div>
      {pdfDataUri && (
        <a href={pdfDataUri} download="filled.pdf">
          Download Filled PDF
        </a>
      )}
    </div>
  );
};

export default PdfEditor;