import React, { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import * as xlsx from 'xlsx';

export default function TournamentBanner() {
  const [Fulldata, setFulldata] = useState([]);
  const [Data, setData] = useState([]);


  useEffect(() => {
    const fetchData = ()=>{

   
    // Define the URL of your Google Apps Script web service endpoint
    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=9bWzlnD9zwp2NHMxz3CFa7OihDXG6O8meqAj50GBHObX6ROqGJvvxBtODy21011TWaKl30clqjVnWITjM39M7Cw2oILyD2tam5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJw34xL7qg_vegiBD0Lt4wanWUegb0pgWKQfPc5lsuGnfGnQrQ-Xy6nlMFVFMkSwyRa7XQsLg7lB3SI5CI4Rplk8T0al5xC6AA&lib=MyDIGNa8ClhITOhHWOHKG6aIwSiYkmlJD';

    // Fetch data from the Google Apps Script web service using the fetch API
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const sch = data.data.slice(4,8)
        
        console.log(sch);

        setData(sch);
        localStorage.setItem('color', JSON.stringify(sch));
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
    const Data = localStorage.getItem('MatchData');

    if (Data) {
      setFulldata(JSON.parse(Data));
    }
  }, []);

  useEffect(() => {
    // Function to fetch and process Excel data
    const fetchData = () => {
      // Replace 'your_excel_link_here' with the actual link to your Excel file
      fetch('https://script.google.com/macros/s/AKfycbz_-_5VFES00VsB2Ad3eKetjDhOOg1lAvd9ppHUvAhAJkQzvzA0mgqB87Pmsy5ZMS32/exec')
        .then(response =>{
          if(!response.ok)
          {
            throw new Error ("Could")
          }
          return response.json()
        }).then(data=>{
          console.log(data.data);
          setFulldata(data.data)
          localStorage.setItem('MatchData',JSON.stringify(data.data))
        })
         .catch((error) => {
          console.error("Error fetching Excel data:", error);
        });
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    // Function to fetch and process Excel data
    const fetchData = () => {
      // Replace 'your_excel_link_here' with the actual link to your Excel file
      fetch('https://script.google.com/macros/s/AKfycbz_-_5VFES00VsB2Ad3eKetjDhOOg1lAvd9ppHUvAhAJkQzvzA0mgqB87Pmsy5ZMS32/exec')
        .then(response =>{
          if(!response.ok)
          {
            throw new Error ("Could")
          }
          return response.json()
        }).then(data=>{
          console.log(data.data);
          setFulldata(data.data)
          localStorage.setItem('MatchData',JSON.stringify(data.data))
        })
         .catch((error) => {
          console.error("Error fetching Excel data:", error);
        });
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>

      {Fulldata.length > 0 && Fulldata[1]  && Data[0] && (
        <>
         
        <div className='h-screen flex justify-center items-center '>
          {/* Display tournament information */}
          
          <div style={{ backgroundColor: `${Data[0].MAP}` }} className='w-36 h-36  mr-1'>
            <img width="144px" height="141px" src={Fulldata[1].TournamentLogo} alt="" />
          </div>
          <div className='h-[142px] flex flex-col justify-center'>
            <div  style={{ backgroundColor: `${Data[1].MAP}` }} className='-space-y-2 flex flex-col justify-center h-[114px] w-auto   text-white border border-l-4 border-b-4 border-l-[#1b1b3d] border-b-[#1b1b3d]'>
              <div className='font-custom font-semibold text-7xl'>{Fulldata[1].Group}</div>
              <div className='font-custom text-4xl'>{Fulldata[1].Match}</div>
            </div>
            <div className='flex items-center justify-center h-7 w-96 bg-white border border-l-4 border-l-[#1b1b3d]'>
              <div className='font-custom text-3xl mt-1'>{Fulldata[1].TournamentName}</div>
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}
