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
        }}
      >
        <Form />
        <PdfEditor />
      </AppContext.Provider>
    </div>
  );
}

export default App;
