import React from 'react'
import { useEffect, useState } from "react";
export default function OverallFragger() {
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
        const Data = localStorage.getItem('OTopfraggers');

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
                               const player = data.data;
                                localStorage.setItem('player2', JSON.stringify(player));
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
                                const top4Players = sortedPlayers.slice(0, 4);

                                console.log(top4Players);
                                setTopPlayers(top4Players);
                                localStorage.setItem('OTopfraggers', JSON.stringify(top4Players));
                 

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
                    <div className="   flex relative mt-40  h-60  ">
                    {/* //static */}
                    <div className="text-[18rem] inset-0 absolute -left-4 -top-28  font-custom text-custom">
                      OVERALL TOP FRAGGERS 
                    </div>
                    <div className=" relative flex w-full justify-evenly items-center right-0 ">
                        {/* tournament logo */}
                        <img
                            width="300px"
                            src={Fulldata1[1].TournamentLogo}
                            alt=""
                        />
            
                        <div className="text-white flex flex-col items-center mt-[4.5rem] ">
                            <div className="flex w-full  justify-between ">
                                {/* tournament-name */}
                                <div className="relative font-bold text-[38px] left-2  font-custom top-16">
                                {Fulldata1[1].TournamentName}
                                </div>
                                {/* group stage + match number -16 is total no. of match */}
                                <div className="relative font-bold text-[38px]  font-custom top-16 bg-[#96c93d] px-1 rounded-md ">
                                {Fulldata1[1].Match}
                                </div>
                            </div>
                            <div className="font-custom text-[11rem] font-bold ">
                            OVERALL TOP FRAGGERS 
                            </div>
                        </div>
                    </div>
                </div>
                )
}
  
    {/* Fragger Section */}
    <div className='mt-20 flex justify-evenly' >

        {
            TopPlayers && TopPlayers.map((ele,index)=>{
                return    (
                        <div className='w-[408px] relative'  >
                            <img className='absolute opacity-75  '  src={ele.TeamLogo} alt="" />
                            <img className='absolute z-50 right-2 top-3  ' width="100px"  src={ele.TeamLogo} alt="" />
                        {/* player image */}
                        <img
                            className='absolute z-30 -top-[24px]'
            
                            height="384px"
                            width="408px"
                            src={findPhoto(ele.PlayerName)}
                            alt=""
                        />
                        <div
                            style={{
                                height: "384px",
                                width: "408px",
                                clipPath:
                                    "polygon(49% 5%, 74% 5%, 79% 0%, 96% 0%, 100% 4%, 100% 33%, 98% 34%, 98% 98%, 100% 100%, 0% 100%, 2% 99%, 1% 35%, 0% 33%, 0% 3%, 3% 0%, 21% 0%, 26% 5%)",
                                backgroundColor: "rgba(0, 0, 0, 0.46)",
                                padding:"20px",
                                fontSize:"40px",
                                fontWeight:"bold",
                            }}
                            className='font-custom text-white'
                        >
                            #{index+1}
                        </div>
            
                        <div
                            className='h-16 font-custom flex justify-center items-center bg-[#96c93d] font-semibold'
                            style={{
            
                                clipPath:
                                    " polygon(0% 0%, 100% 0%, 100% 88.75%, 79.49% 88.86%, 76.92% 100%, 3.63% 100%, 0% 76.97%)",
                            }}
                        >
                            {/* name of player 1 with most kill in a match */}
                            <div className=' text-white font-custom text-4xl font-semibold'>
                                {ele.PlayerName}
                            </div>
                        </div>
                        <div
                            className='flex font-custom justify-evenly items-center h-24 mt-2 bg-white'
                            style={{
                                clipPath:
                                    "polygon(16.84px 0px, 224.9px 0px, 227.9px 4.59px, 326.25px 4.59px, 330.12px 0px, 397.36px 0px, 406px 9.17px, 406px 93px, 227.9px 93px, 224.12px 87.11px, 96.74px 87.11px, 93.74px 93px, 0px 93px, 0px 15.6px)",
                            }}
                        >
                            <div className='flex flex-col justify-center items-center'      >
                                <div
                                    className=' text-white text-4xl font-semibold relative bg-[#00b09b] w-40 h-9 top-1 rounded-md text-center '>
                                    MATCH PLAYED
                                </div>
                                <div className=' font-semibold text-4xl relative top-1'>
                                    {ele.MatchPlayed}
                                </div>
                            </div>
                            <div className='h-[70px] border border-l-2 border-black '></div>
                            <div className='flex flex-col justify-center items-center'               >
                                <div className=' text-white text-4xl font-semibold relative bg-[#00b09b] w-40 h-9 top-[5px] rounded-md text-center '>
                                    CONTRIBUTION
                                </div>
                                <div className=' font-semibold text-4xl relative top-1' >
                                    {ele.Contribution}
                                </div>
                            </div>
                        </div>
                        <div
                            className='flex font-custom justify-evenly items-center h-24 mt-2 bg-white'
                            style={{
                                clipPath:
                                    "polygon(16.84px 0px, 224.9px 0px, 227.9px 4.59px, 326.25px 4.59px, 330.12px 0px, 397.36px 0px, 406px 9.17px, 406px 93px, 227.9px 93px, 224.12px 87.11px, 96.74px 87.11px, 93.74px 93px, 0px 93px, 0px 15.6px)",
                            }}
                        >
                            <div className='flex flex-col justify-center items-center'      >
                                <div
                                    className=' text-white text-4xl font-semibold relative bg-[#00b09b] w-40 h-9 top-1 rounded-md text-center '>
                                    KILL PER MATCH
                                </div>
                                <div className=' font-semibold text-4xl relative top-1'>
                                    {ele.KD}
                                </div>
                            </div>
                            <div className='h-[70px] border border-l-2 border-black '></div>
                            <div className='flex flex-col justify-center items-center'               >
                                <div className=' text-white text-4xl font-semibold relative bg-[#00b09b] w-40 h-9 top-[5px] rounded-md text-center '>
                                    OVERALL KILL
                                </div>
                                <div className=' font-semibold text-4xl relative top-1' >
                                    {ele.Kills}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    )
            })
           
        }
        
        
    </div>
</>
  )
}
