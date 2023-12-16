import React from 'react'
import { useEffect, useState } from "react";

export default function OverallMvp() {
  const [TopPlayers, setTopPlayers] = useState([]);
  const [Fulldata1, setFulldata1] = useState([]);
  const [Photo, setPhoto] = useState([]);

  
  const findPhoto = (playerName) => {
    const player = Photo.find((p) => p.Name === playerName);
    const defaultImageUrl = 'https://media.discordapp.net/attachments/1043905461193285702/1177634952439930971/black.png?ex=65733904&is=6560c404&hm=ce8e11d29ac48de2a7cf75484719eeaccd45b62fe807645437c732d9235580a7&=&format=webp&width=671&height=671';

    return player && player.Photo ? player.Photo : defaultImageUrl;
};

useEffect(() => {
    const Data = localStorage.getItem('sMatchData');

    if (Data) {
        setFulldata1(JSON.parse(Data));
    }
}, []);

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
                setFulldata1(data.data)
                localStorage.setItem('sMatchData', JSON.stringify(data.data))
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
    const Data = localStorage.getItem('EOTopfraggers');

    if (Data) {
        setTopPlayers(JSON.parse(Data));
    }
}, []);

useEffect(() => {
  // Function to fetch and process Excel data
  const fetchData = () => {
      // Fetch MVPMatch data
      fetch('https://script.googleusercontent.com/macros/echo?user_content_key=sTV0XmBfE_ynefA4Ygfl41e3uIGPJOuskvEX0GEHWBheQA49nbisXvoGrpcRq7z4Giwu3wR8rqi_CHd641w3JBfyk-nBbvTxm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnICjXwtQXdFxLw66LwBYoiFq1YM7G3MDfeLYH3fStepPJzOchzpHLJxN2Nz7z6pRgkwBjP-jB0HZZoHoNPOMN4D3pUVRQ58Fgw&lib=MyDIGNa8ClhITOhHWOHKG6aIwSiYkmlJD')
          .then(response => {
              if (!response.ok) {
                  throw new Error("Could not fetch MVPMatch data");
              }
              return response.json();
          })
          .then(data => {
            
              console.log(data.data);
                          data.data.shift();

                          // Sort the players by kills and team kills
                          const sortedPlayers = data.data.sort((a, b) => {
                              if (a["Kills"] > b["Kills"]) {
                                  return -1;
                              } else if (a["Kills"] < b["Kills"]) {
                                  return 1;
                              } else {
                                  // If kills are tied, compare team kills
                                  return b["TeamKills"] - a["TeamKills"];
                              }
                          });

                          // Get the top 4 players
                          const top4Players = sortedPlayers.slice(0, 1);

                          console.log(top4Players[0]);
                          setTopPlayers(top4Players);
                          localStorage.setItem('EOTopfraggers', JSON.stringify(top4Players));
           

              }
          )
          .catch((error) => {
              console.error("Error fetching MVPMatch data:", error);
          });
  };

  fetchData();

  const intervalIdMVPMatch = setInterval(fetchData, 2000);

  // Clean up the interval when the component unmounts
  return () => {
      clearInterval(intervalIdMVPMatch);
  };
}, []);
useEffect(() => {
  const Data = localStorage.getItem('photoMatchData');

  if (Data) {
      setPhoto(JSON.parse(Data));
  }
}, []);

  return (
   <>
   {
                Fulldata1.length > 0 && Fulldata1[1] && (
                  <>
                      <div className="   flex relative mt-10  h-60   ">
                    {/* //static */}
                    <div className="text-[28rem] inset-0 absolute -left-4 -top-20  font-custom text-custom">
                    EVENT FRAGGER
                    </div>
                    <div className=" relative flex w-full justify-items-start items-center right-0 top-32 ">
                        {/* tournament logo */}
                        <img
                            width="300px"
                            src={Fulldata1[1].TournamentLogo}
                            alt=""
                        />
    
                       
                    </div>
                </div>

{
  TopPlayers && TopPlayers[0] &&  (
    <div >
      <div className='flex relative justify-center z-30 -top-10 -right-10 ' >
        <img className="relative right-6" src={findPhoto(TopPlayers[0].PlayerName)} alt="" />
        

      </div>
      <div className='flex flex-col relative -top-[10.75rem] justify-center items-center' > 
        <div className='flex justify-around  w-[1773px]'>
            <div className='flex justify-evenly tracking-[0.1em] items-center w-[727px] h-[63px]  relative z-50 bg-[#96c93d]' style={{clipPath:" polygon(682.1px 0px, 0px 0px, 40.9px 62px, 718px 62px)"}} >
              <h2 className=' font-custom  text-[61px] font-bold text-white' >{TopPlayers[0].PlayerName}</h2>
              <img    width="100px" src={TopPlayers[0].TeamLogo} alt="" />
            </div>
            <div className='flex justify-center items-center w-[451px] h-[63px] relative  z-50 bg-[#96c93d]' style={{clipPath:" polygon(91% 0%, 0% 0%, 5.71% 100%, 100.11% 100%)"}} >
              <h2 className=' font-custom  text-[55px] font-bold text-white' >{Fulldata1[1].Match}</h2>
              
            </div>
        </div>
        <div className=" flex tracking-[0.1em] relative z-50 gap-x-4 font-custom text-[11rem] font-bold w-[1553px] justify-center items-center h-[186px] bg-[#d9d9d9] text-[#525252] " style={{clipPath:" polygon(100% 0%, 2.65% 0%, 0% 100%, 96.92% 100%)"}} >
             EVENT FRAGGER
        </div>
        
      </div>
      <div className='flex  justify-center items-center relative -top-[159px]' >
      <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> ELIMINATION</div>
              <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}> {TopPlayers[0].Kills}</div>
            </div>
      <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> CONTRIBUTION</div>
              <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}>  {TopPlayers[0].Contribution}</div>
            </div>
      <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> MATCH PLAYED</div>
              <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}>  {TopPlayers[0].MatchPlayed}</div>
            </div>
      <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> K/D</div>
              <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}>  {TopPlayers[0].KD}</div>
            </div>
      </div>
      <div className='text-[100px] font-custom font-bold flex justify-center items-center relative text-white -top-[11.75rem]' >
      {Fulldata1[1].TournamentName}
      </div>
    </div>

  )
}
    
                  </>
                )
}

   </>
  )
}
