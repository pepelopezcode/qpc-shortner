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
  const [endProduct, setEndProduct] = useState("");
  const [currTime, setCurrTime] = useState("");
  const [currDate, setCurrDate] = useState("");
  const [qty, setQty] = useState('');
  const [isExpedite, setIsExpedite] = useState(false);
  const [combinedPdfUrl, setCombinedPdfUrl] = useState(null);
  const [packageType, setPackageType] = useState('Box')
  const [numberOfPackages, setNumberOfPackages] = useState('')
  const [shippingMethod, setShippingMethod] = useState('DRIVER')
  const [packageCondition, setPackageCondition] = useState('GOOD')
  const [hardwareDescription, setHardwareDescription] = useState('')
  


  const handlePrint = () => {
      const printWindow = window.open(combinedPdfUrl);
      
      printWindow.onload = () => { printWindow.print(); };
    
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
          setCombinedPdfUrl,
          packageType, 
          setPackageType,
          numberOfPackages, 
          setNumberOfPackages,
          shippingMethod, 
          setShippingMethod,
          packageCondition, 
          setPackageCondition,
          hardwareDescription, 
          setHardwareDescription,
        }}
      >
        <Form />
        <PdfEditor />
      </AppContext.Provider>
    </div>
  );
}

export default App;