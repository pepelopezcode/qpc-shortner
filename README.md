# Purchase Order Processing App

## Description

This React application streamlines the process of handling purchase orders by automating tasks such as spreadsheet data entry, post creation, label generation, and checklist completion. The app takes information from the spreadsheet and the purchase order, providing a formatted paragraph for a post, generating a label, and creating a checklist. The result is increased productivity by eliminating manual data entry and ensuring consistency in post formatting, label creation, and checklist completion.

## Features

- **Automatic Post Generation:**
  - Creates a formatted paragraph for the post using information from the spreadsheet and purchase order.

- **Label Generation:**
  - Generates a label with the necessary information from the sheets and the purchase order.

- **Checklist Completion:**
  - Fills out a checklist with the correct information, reducing manual data entry errors.

- **Print Page:**
  - Directs users to a print page where the checklist and label are ready to be printed.

## Technologies Used

- **React:** The application is built using React, providing a modular and efficient user interface.

- **pdf-lib:** Utilizes the `pdf-lib` library to dynamically modify and generate PDF documents for labels and checklists.

- **Fontkit:** Implements Fontkit to embed fonts for consistent styling in the generated PDFs.

- **Tailwind CSS:** Styles the application's user interface using Tailwind CSS, providing a utility-first and responsive design approach.
- 															

## Usage

**1:**  Copy data from spreadsheet i.e.. 28093	ca	COMPANY NAME	1234444	no	yes	desc	9/26/2023	12:30:00 PM	pepe	
 ![sheets](https://github.com/pepelopezcode/qpc-shortner/assets/98237174/dfe7e502-fab7-4aaa-8d80-a16c7fb1b99d)

**2:** Paste data into first field of the form

![form empty](https://github.com/pepelopezcode/qpc-shortner/assets/98237174/9f4e5460-14bc-4abc-ac23-9aec05970dd9)
![form with top full](https://github.com/pepelopezcode/qpc-shortner/assets/98237174/963c0e17-181a-4a27-85c1-40b31800cd7d)

**3:** Fill in the rest of the form with data from purchase order and submit

![form filled](https://github.com/pepelopezcode/qpc-shortner/assets/98237174/5569f7f8-3986-4d34-ae5a-3249a87243d2)
![form submitted](https://github.com/pepelopezcode/qpc-shortner/assets/98237174/6ef92acf-e428-4c43-8280-92acb38ad59d)

**4:** Use formatted data at bottom of form to make post then print

![checklist print](https://github.com/pepelopezcode/qpc-shortner/assets/98237174/8aa3235c-12ae-48a3-bfca-18b9610a5228)
![label print](https://github.com/pepelopezcode/qpc-shortner/assets/98237174/cf5f96b0-7ab5-4293-b37f-07b31755594b)
