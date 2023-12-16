import React, { useState, useEffect } from 'react';


export const ComingUpNext = (props) => {
  const [Fulldata, setFulldata] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const Data = localStorage.getItem('color');

    if (Data) {
      setData2(JSON.parse(Data));
    }
  }, []);

  useEffect(() => {
    const Data = localStorage.getItem('MatchData');

    if (Data) {
      setFulldata(JSON.parse(Data));
    }
    console.log(Fulldata, "me")
  }, [Fulldata]);

  useEffect(() => {
    // Function to fetch and process Excel data
    const fetchData = () => {
      // Replace 'your_excel_link_here' with the actual link to your Excel file
      fetch('https://script.google.com/macros/s/AKfycbz_-_5VFES00VsB2Ad3eKetjDhOOg1lAvd9ppHUvAhAJkQzvzA0mgqB87Pmsy5ZMS32/exec')
        .then(response => {
          if (!response.ok) {
            throw new Error("Could")
          }
          return response.json()
        }).then(data => {
          console.log(data.data);
          setFulldata(data.data)
          localStorage.setItem('MatchData', JSON.stringify(data.data))
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
      {
        Fulldata.length > 0 && Fulldata[1] && data2 && (
          <>
            <div className=" flex relative mt-40  h-60  ">
              {/* //static */}
              <div className="text-[21rem] inset-0 absolute -left-4 -top-28 font-custom text-custom">
                COMING UP NEXT
              </div>
              <div className=" relative flex w-full justify-evenly items-center right-0 ">
                {/* tournament logo */}
                <img
                  width="300px"
                  src={Fulldata[1].TournamentLogo}
                  alt=""
                />

                <div className="text-white flex flex-col items-center mt-[4.5rem] ">
                  <div className="flex w-full  justify-between ">
                    {/* tournament-name */}
                    <div className="relative font-bold text-[41px] left-2  font-custom top-16">
                      {Fulldata[1].TournamentName}
                    </div>
                    {/* group stage + match number -16 is total no. of match */}
                    <div style={{ backgroundColor: `${data2[0].MAP}` }} className="relative font- text-[38px]  font-custom top-16 bg-yellow-500 px-2 rounded-md ">
                      {Fulldata[1].Match}
                    </div>
                  </div>
                  <div className="font-custom text-[13rem] text-white font-bold ">
                    COMING UP NEXT
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full mt-20 flex justify-center items-center' >
            {Fulldata[2].TournamentName === 'Erangel' && Fulldata[2].TournamentLogo && (
            <img
              src={Fulldata[2].Group}
              alt=""
            />
            )}
            {Fulldata[3].TournamentName === 'Minamar' && Fulldata[3].TournamentLogo && (
            <img
              src={Fulldata[3].Group}
              alt=""
            />
            )}
            {Fulldata[4].TournamentName === 'Shanok' && Fulldata[4].TournamentLogo && (
            <img
              src={Fulldata[4].Group}
              alt=""
            />
            )}
            {Fulldata[5].TournamentName === 'Vikendi' && Fulldata[5].TournamentLogo && (
            <img
              src={Fulldata[5].Group}
              alt=""
            />
            )}

             
            </div>
          </>
        )
      }

    </>
  )
}
