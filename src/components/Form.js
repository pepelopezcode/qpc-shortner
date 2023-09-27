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
      <div>
        <h2>My Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="string"
              id="string"
              value={initialInfo}
              onChange={(e) => setInitialInfo(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p dangerouslySetInnerHTML={{ __html: endProduct }}></p>
      </div>
    );
}

export default Form