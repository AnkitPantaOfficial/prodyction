import { useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import axios from 'axios';

export default function Map() {
  const [firstHalfData, setFirstHalfData] = useState([]);
  const [secondHalfData, setSecondHalfData] = useState([]);


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = ()=>{

   
    // Define the URL of your Google Apps Script web service endpoint
    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=u2OCL0kQeDzxwLnvtGwCUh-fR4ROjb86EQAd-c1Jxc8_QQdg9CeSBh6I4L1cxbcuIT-mPb-emTZJKqS_x5cjLY_MVCyIIJWWm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPFLin2CwzIa_LaZh1ojVpVp_LN-blYJG_p4MEpn-nK_KzanIf_xTGA2IBpEKa1soiupeR-TcioG2Ejz28rpWTCP2O8gfdmySA&lib=MyDIGNa8ClhITOhHWOHKG6aIwSiYkmlJD';

    // Fetch data from the Google Apps Script web service using the fetch API
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data);

        // Set the main data in the state
        // setMainData(data.data);

        // Divide the rest of the data into two halves
        const midpoint = Math.ceil(data.data.length / 2);
        const firstHalf = data.data.slice(1, midpoint);
        const secondHalf = data.data.slice(midpoint);

        console.log(firstHalf);
        console.log(secondHalf);
          
        // Set the first and second halves in separate state variables
        setFirstHalfData(firstHalf);
        setSecondHalfData(secondHalf);
        localStorage.setItem('firstHalfData', JSON.stringify(firstHalf));
        localStorage.setItem('secondHalfData', JSON.stringify(secondHalf));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
  
  //   // Set up an interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);
  
  //   // Clean up the interval when the component unmounts
     return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    const storedFirstHalf = localStorage.getItem('firstHalfData');
    const storedSecondHalf = localStorage.getItem('secondHalfData');

    if (storedFirstHalf && storedSecondHalf) {
      console.log(storedFirstHalf)
      console.log(storedSecondHalf)
      setFirstHalfData(JSON.parse(storedFirstHalf));
      setSecondHalfData(JSON.parse(storedSecondHalf));
    }
  }, []);



  return (
    <div>
      <div className='w-full mt-9 flex justify-between'>
        <div className='space-y-2 '>
          {firstHalfData.map((ele, index) => (
            <div className='flex items-center gap-x-3 justify-evenly w-[420px] h-24 bg-[#821d16]' key={index}>
              <img width="80px" src={ele.PHOTO} alt="" />
              <div className='font-custom w-4/6 text-center text-6xl font-bold p-1 bg-white my-1'>{ele.TEAM}</div>
            </div>
          ))}
        </div>
        <div className='space-y-2 '>
          {secondHalfData.map((ele, index) => (
            <div className='flex items-center gap-x-3 justify-evenly h-24 bg-[#821d16] w-[420px]' key={index}>
              <img width="80px" src={ele.PHOTO} alt="" />
              <div className='font-custom w-2/3 text-center text-6xl font-bold p-1 bg-white my-1'>{ele.TEAM}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
