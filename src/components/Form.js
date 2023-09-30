import React, { useEffect, useContext } from "react";
import { AppContext } from "./App";

function Form() {
  const {
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
    setCurrTime,
    setCurrDate,
    setQty,
    qty
  } = useContext(AppContext);

  const formatDateTime = () => {
    const dateTime = new Date();

    const formattedDate = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedTime =
      (hours % 12 || 12) +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      " " +
      amOrPm;
      setCurrDate(formattedDate);
      setCurrTime(formattedTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempWord = "";
    let tempCounter = 0;
    for (let i = 0; i < initialInfo.length; i++) {
      if (initialInfo[i] !== "\t") {
        tempWord += initialInfo[i];
      } else if (initialInfo[i] === "\t") {
        switch (tempCounter) {
          case 0:
            setWorkOrder(tempWord);
            break;
          case 2:
            setCompanyName(tempWord);
            break;
          case 3:
            setPurchaseOrder(tempWord);
            break;
          case 7:
            setDate(tempWord);
            break;
          case 8:
            setTime(tempWord);
            break;
          default:
            tempWord = "";
        }
        tempCounter++;
        tempWord = "";
      }
    }
    formatDateTime()
    setDone(!done);
  };

  useEffect(() => {
    setEndProduct(
      `ARRIVED @ ${date} ${time}<br>${companyName}<br>PO:${purchaseOrder}<br>WO:${workOrder}`
    );
  }, [done]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">My Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-3/4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="string"
              value={initialInfo}
              onChange={(e) => setInitialInfo(e.target.value)}
              placeholder="Enter initial info..."
              required
            />
            <input
              className="w-1/4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="string"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <p
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: endProduct }}
          ></p>
        </div>
      </div>
    </div>
  );
}

export default Form;
