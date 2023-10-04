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
    qty,
    setIsExpedite,
    isExpedite,
    handlePrint,
    setPackageType,
    packageType,
    numberOfPackages,
    setNumberOfPackages,
    shippingMethod, 
    setShippingMethod
  } = useContext(AppContext);

  const formatDateTime = () => {
    const dateTime = new Date();

    const formattedDate = `${
      dateTime.getMonth() + 1
    }/${dateTime.getDate()}/${dateTime.getFullYear()}`;

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
    formatDateTime();
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
        <h2 className="text-2xl font-semibold mb-4 caret-transparent">My Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="initial-info"
              value={initialInfo}
              onChange={(e) => setInitialInfo(e.target.value)}
              placeholder="Enter initial info..."
              required
            />
          </div>
          <div className="mb-4 caret-transparent">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Enter quantity on PO"
              required
            />
          </div>
          <div className="mb-4 caret-transparent">
            <input
              type="checkbox"
              id="expedite"
              value="Expedite"
              name="Expedite"
              onChange={() => {
                setIsExpedite(!isExpedite);
              }}
              className="form-checkbox custom-checkbox border rounded text-blue-500 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="expedite" className="ml-2 text-gray-700">Expedite</label>
          </div>
          <div className="mb-4 caret-transparent">
            <label htmlFor="selectShipping">Shipping Method</label>
            <select
              name="shippingMethod"
              id="selectShipping"
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="border rounded-md custom-select"
            >
              <option value="DRIVER">DRIVER</option>
              <option value="FEDEX">FEDEX</option>
              <option value="UPS">UPS</option>
            </select>
          </div>
          <div className="mb-4 caret-transparent">
            <label htmlFor="selectPackageType">Package Type</label>
            <select
              name="package"
              id="selectPackageType"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="border rounded-md  custom-select"
            >
              <option value="Box">Box</option>
              <option value="Pallet">Pallet</option>
              <option value="Crate">Crate</option>
              <option value="Loose">Loose</option>
            </select>
          </div>
          <div className="mb-4  caret-transparent">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="number-of-packages"
              value={numberOfPackages}
              onChange={(e) => setNumberOfPackages(e.target.value)}
              placeholder="Enter number of packages"
              required
            />
          </div>
          <div className="mb-4 caret-transparent">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 caret-transparent"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 caret-transparent"
          type="button"
          onClick={() => {
            handlePrint();
          }}
        >
          Print
        </button>
        <div className="mt-4 select-all">
          <p
            className="whitespace-pre-line caret-transparent"
            dangerouslySetInnerHTML={{ __html: endProduct }}
          ></p>
        </div>
      </div>
    </div>
  );
}

export default Form;
