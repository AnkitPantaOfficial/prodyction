import { useEffect, useState } from 'react';

export default function Schedule() {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const Data = localStorage.getItem('color');

    if (Data) {
      setData2(JSON.parse(Data));
    }
  }, []);
  useEffect(() => {
    const Data = localStorage.getItem('schedule');

    if (Data) {
      setData(JSON.parse(Data));
    }
  }, []);


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
        const sch = data.data.slice(0,4)
        
        console.log(sch);

        setData(sch);
        localStorage.setItem('schedule', JSON.stringify(sch));
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

  return (
    <>
    <div className="  flex relative mt-40  h-60  ">
        {/* //static */}
        <div className="text-[21rem] inset-0 absolute -left-4 -top-28  font-custom text-custom">
          TODAY'S SCHEDULE
        </div>
        <div className=" relative flex w-full justify-evenly items-center right-0 ">
          {/* tournament logo */}
          <img
            width="300px"
            src="https://media.discordapp.net/attachments/1043905461193285702/1177946021741990000/7_marvals.png?ex=65745ab8&is=6561e5b8&hm=3c5fd43c780f337a89d929661fe38992207cea7ccf4c7586889457c52b7ed99e&=&format=webp&width=671&height=671"
            alt=""
          />

          <div className="text-white flex flex-col items-center mt-[4.5rem] ">
            <div className="flex w-full  justify-between ">
              {/* tournament-name */}
              <div className="relative font-bold text-[38px] left-2  font-custom top-16">
                
              </div>
              {/* group stage + match number -16 is total no. of match */}
              <div className="relative font-bold text-[38px]  font-custom top-16 bg-[#7F00FF] px-1 rounded-md ">
              6K PAID LEAGUE
              </div>
            </div>
            <div className="font-custom text-[13rem] font-bold ">
            TODAY'S SCHEDULE
            </div>
          </div>
        </div>
      </div>
      <div className='mt-20 flex justify-center ' >
         {/* MATCH-1 */}
         {
          data && data.map((ele,index)=>(
            <div className='h-[563px] w-[360px] mx-7 '> 
            <div className='h-[87px] bg-black text-center text-5xl font-medium text-white font-custom'
             style={{clipPath:"polygon(0% 0.32%, 28.4% 0.32%, 30.19% 6.07%, 63.6% 5.37%, 65.43% 0.32%, 96.05% 0.32%, 100% 19.35%, 100% 44.09%, 98.02% 50.16%, 98.02% 70.91%, 100% 77.42%, 100% 100%, 2.58% 100%, 0% 89.25%, 0% 56.77%, 1.77% 51.34%, 1.77% 26.6%, 0% 19.35%)"}}>
              {/* Match Number */}
              <div className='pt-[10px]' >MATCH {ele.MATCH}</div>
            </div>
            <div className='h-[392px]'  style={{clipPath:"polygon(0% 0%, 100.25% 0%, 100% 17.52%, 97.98% 19.19%, 97.98% 53.66%, 100% 55.65%, 100.25% 100.22%, 0% 100.22%, 0% 72.34%, 1.97% 71.4%, 1.97% 56.76%, 0% 54.77%)"}}>
             {/* Match Image */}
              <img height="416px" src={ele.LOGO} alt="" />
              {/* Map Name */}
              <div className='relative bottom-[46px] left-[136px] text-white font-custom text-[45px]' >{ele.MAP}</div>
            </div>
            <div className='bg-[#c1c1c1] h-[61px] text-center text-[50px] font-semibold text-black font-custom' style={{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 83.99% 100%, 83% 92.42%, 51.23% 92.42%, 50% 100%, 2.46% 100%, 0% 84.47%)"}}>
              <div>{new Date(ele.TIME).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
          )

          

          )
         }
        
        
      </div>
    </>
  )
}
