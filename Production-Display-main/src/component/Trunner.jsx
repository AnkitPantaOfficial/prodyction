import React from 'react'
import { useEffect, useState } from "react";

export default function Trunner() {
  const [First, setFirst] = useState([]);
  const [Fulldata1, setFulldata1] = useState([]);

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

    const Data = localStorage.getItem('srunFMS');


    if (Data) {
      setFirst(JSON.parse(Data))


    }
  }, []);
  useEffect(() => {
    const fetchData = () => {


      // Define the URL of your Google Apps Script web service endpoint
      const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=5WmLXOdoVn2QCzvZu6LE3X2mUEZOxTR28RGu6YIe4ds_Vhg2TJf5y5x6jsJXuiGPE7sbaqjPoeSKTpTwWTs40nytIB-MoteTm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnICjXwtQXdFxLw66LwBYoiFq1YM7G3MDfeLYH3fStepPJzOchzpHLJxN2Nz7z6pRgkwBjP-jB0HZZoHoNPOMN4D3pUVRQ58Fgw&lib=MyDIGNa8ClhITOhHWOHKG6aIwSiYkmlJD';

      // Fetch data from the Google Apps Script web service using the fetch API
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const dataArray = Array.from(data.data);

          const processData = (data) => {
            const teamsMap = new Map();

            // Iterate through the data and group players by team name
            data.forEach((item) => {
              const teamName = item["TeamName"];
              if (!teamsMap.has(teamName)) {
                teamsMap.set(teamName, {
                  "TeamName": teamName,
                  "TeamLogo": item["TeamLogo"],
                  "TeamKills": item["TeamKills"],
                  "TeamPosition": item["TeamPosition"],
                  "TotalPoints": item["TotalPoint"],
                  "Match": item["MatchPlayed"],
                  Players: [],
                });
              }

              teamsMap.get(teamName).Players.push({
                "PlayerName": item["PlayerName"],
                "Kills": item["Kills"],
                "Contribution": item["Contribution"]
              });
            });

            // Convert the Map to an array of teams
            const teams = Array.from(teamsMap.values());

            // Create the final object structure
            const formattedData = {
              "Teams": teams,
            };

            return formattedData;
          };

          // Process and format the data
          const formattedData = processData(dataArray);
          console.log(formattedData)
          formattedData.Teams.sort((a, b) => b.TotalPoints - a.TotalPoints);
          let FirstTeam = formattedData.Teams[3]
          let RestTeam = formattedData.Teams.slice(1, 11)
          console.log(FirstTeam.Players[0].Kills, "first")
          console.log(RestTeam, "rest")
          setFirst(FirstTeam);

          localStorage.setItem("srunFMS", JSON.stringify(FirstTeam));

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
      {
        Fulldata1.length > 0 && Fulldata1[1] && (
          <>
            <div className="   flex relative mt-10  h-60   ">
              {/* //static */}
              <div className="text-[26rem] inset-0 absolute -left-1 -top-14  font-custom text-custom">
                2ND RUNNNER UP
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
              First && First.Players && First.Players[0] && (
                <div >
                  <div className='flex relative z-30 -top-10 -right-10 ' >
                    <img className="relative -right-16" src="https://media.discordapp.net/attachments/1043905461193285702/1178676490389442590/cha.png?ex=65770306&is=65648e06&hm=6806d255cd49121bffc4b4a3b65007e154df0543b53918890ca25c770d4c392c&=&format=webp&quality=lossless&width=671&height=671" alt="" />
                    <img className="relative -right-[30rem]" src="https://media.discordapp.net/attachments/1043905461193285702/1178676491115049050/brendan-greene-playerunknown-s-battlegrounds-clothing-costume-pubg-mobile-character-model-d263d464de466128af3cc5a8660ec882.png?ex=65770306&is=65648e06&hm=4baaef657f47d0f83eeb8c22df6b358a29f54adf20244ade48d98d77c480c8cf&=&format=webp&quality=lossless&width=671&height=671" alt="" />

                    <img className="relative right-[34rem]" src="https://media.discordapp.net/attachments/1043905461193285702/1178676857944678450/cha2.png?ex=6577035d&is=65648e5d&hm=a0a4dc0e17130ff5ec369a3c88ddfd360577018497430854ac30a51c5326b722&=&format=webp&quality=lossless&width=671&height=671" alt="" />
                    <img className="relative right-[98rem]" src="https://media.discordapp.net/attachments/1043905461193285702/1178676489428938772/pngaaa.com-2081553.png?ex=65770305&is=65648e05&hm=1c7ab0637527456dad825307dcbede99c07f8725eefc5b5c61468d3079e86c15&=&format=webp&quality=lossless&width=671&height=671" alt="" />

                  </div>
                  <div className='flex flex-col relative -top-[10.75rem] justify-center items-center' >
                    <div className='flex justify-around  w-[1773px]'>
                      <div className='flex justify-evenly tracking-[0.1em] items-center w-[727px] h-[63px]  relative z-50 bg-[#D6A4A4]' style={{ clipPath: " polygon(682.1px 0px, 0px 0px, 40.9px 62px, 718px 62px)" }} >
                        <h2 className=' font-custom  text-[61px] font-bold text-white' >{First.TeamName}</h2>
                        <img width="100px" src={First.TeamLogo} alt="" />
                      </div>
                      <div className='flex justify-center items-center w-[451px] h-[63px] relative  z-50 bg-[#D6A4A4]' style={{ clipPath: " polygon(91% 0%, 0% 0%, 5.71% 100%, 100.11% 100%)" }} >
                        <h2 className=' font-custom  text-[55px] font-bold text-white' >{Fulldata1[1].Match}</h2>

                      </div>
                    </div>
                    <div className=" flex tracking-[0.1em] relative z-50 gap-x-4 font-custom text-[11rem] font-bold w-[1553px] justify-center items-center h-[186px] bg-[#d9d9d9] text-[#525252] " style={{ clipPath: " polygon(100% 0%, 2.65% 0%, 0% 100%, 96.92% 100%)" }} >
                      2ND RUNNNER UP
                    </div>

                  </div>
                  <div className='flex  justify-center items-center relative -top-[159px]' >
                    <div className='h-[85px] w-[410px] flex mr-[10px]' >
                      <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> MATCH PLAYED</div>
                      <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}>  {First.Match}</div>
                    </div>
                    <div className='h-[85px] w-[410px] flex mr-[10px]' >
                      <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> POSITION POINT</div>
                      <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}>  {First.TeamPosition}</div>
                    </div>
                    <div className='h-[85px] w-[410px] flex mr-[10px]' >
                      <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> ELIMINATION</div>
                      <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}>  {First.TeamKills}</div>
                    </div>
                    <div className='h-[85px] w-[410px] flex mr-[10px]' >
                      <div className='w-[341px] bg-[#525252] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}>TOTAL POINTS</div>
                      <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}>  {First.TotalPoints}</div>
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
