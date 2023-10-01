import React, { useState, createContext } from "react";
import Form from "./Form";
import PdfEditor from "./PdfEditor";

export const AppContext = createContext();

function App() {
  const [initialInfo, setInitialInfo] = useState("");
  const [workOrder, setWorkOrder] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);
  const [endProduct, setEndProduct] = useState("");
  const [currTime, setCurrTime] = useState("");
  const [currDate, setCurrDate] = useState("");
  const [qty, setQty] = useState('');
  const [isExpedite, setIsExpedite] = useState(false);
  const [combinedPdfUrl, setCombinedPdfUrl] = useState(null);


  const handlePrint = () => {
    if (combinedPdfUrl) {
      const printWindow = window.open(combinedPdfUrl);
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          initialInfo,
          setInitialInfo,
          workOrder,
          setWorkOrder,
          companyName,
          setCompanyName,
          purchaseOrder,
          date,
          setDate,
          setPurchaseOrder,
          time,
          setTime,
          done,
          setDone,
          endProduct,
          setEndProduct,
          setCurrDate,
          setCurrTime,
          currDate,
          currTime,
          qty,
          setQty,
          setIsExpedite,
          isExpedite,
          handlePrint,
          setCombinedPdfUrl
        }}
      >
        <Form />
        <PdfEditor />
      </AppContext.Provider>
    </div>
  );
}

export default App;
