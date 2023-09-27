import React, { useState, useEffect } from 'react'

function Form() {

    const [initialInfo, setInitialInfo] = useState('');
    const [workOrder, setWorkOrder] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [purchaseOrder, setPurchaseOrder] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [done, setDone] = useState(false)
    const [endProduct, setEndProduct] = useState('')

  
   
    const handleSubmit = (e) => {
      e.preventDefault();
      let tempWord = '';
      let tempCounter = 0
      for (let i = 0 ; i < initialInfo.length; i++) {
        if (initialInfo[i] !== '\t' ){
            tempWord += initialInfo[i]
            
        }else if (initialInfo[i] === '\t' ){
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
                  tempWord = '';
              }
              tempCounter++;
              tempWord = '';
            
        }
         
      }
      setDone(!done)
    };

    useEffect(() => {
        console.log(`ARRIVED @ ${date} ${time}\n${companyName}\nPO:${purchaseOrder}\nWO:${workOrder}`)
        setEndProduct(`ARRIVED @ ${date} ${time}<br>${companyName}<br>PO:${purchaseOrder}<br>WO:${workOrder}`)
      }, [done]);
  
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">My Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="string"
                value={initialInfo}
                onChange={(e) => setInitialInfo(e.target.value)}
                placeholder="Enter initial info..."
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

export default Form