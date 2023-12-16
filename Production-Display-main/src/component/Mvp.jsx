import React, { useState, useEffect } from 'react';

export default function Mvp() {
  const [Fulldata, setFulldata] = useState([]);
  const [Match, setMatch] = useState([]);
  const [Photo, setPhoto] = useState([]);
  const [Fulldata1, setFulldata1] = useState([]);
  const [Players, setPlayers] = useState([]);

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
    const Data = localStorage.getItem('photoMatchData');

    if (Data) {
        setPhoto(JSON.parse(Data));
    }
}, []);

const findPhoto = (playerName) => {
    const player = Photo.find((p) => p.Name === playerName);
    const defaultImageUrl = 'https://media.discordapp.net/attachments/1043905461193285702/1177634952439930971/black.png?ex=65733904&is=6560c404&hm=ce8e11d29ac48de2a7cf75484719eeaccd45b62fe807645437c732d9235580a7&=&format=webp&width=671&height=671';

    return player && player.Photo ? player.Photo : defaultImageUrl;
};
const findRank = (playerName) => {
  const player = Players.find((p) => p.PlayerName === playerName);
  

  return player && player.Rank ? player.Rank :"";
};
const findKill = (playerName) => {
  const player = Players.find((p) => p.PlayerName === playerName);
  

  return player && player.Kills ? player.Kills :"";
};

   useEffect(() => {
     const Data = localStorage.getItem('MVP');
     const Data2 = localStorage.getItem('MVPMatch');

    if (Data) {
     setFulldata(JSON.parse(Data));
     setMatch(JSON.parse(Data2));
  }
   }, []);
   useEffect(() => {
    // Function to fetch and process Excel data
    const fetchData = () => {
      // Fetch MVPMatch data
      fetch('https://script.google.com/macros/s/AKfycbyeQLVfpWkplPbEXWfm7h8N-XBP0vQHIr8wd9ZIFn5H5ffwcs4WbijIS8vvw_UXtxYN/exec')
        .then(response => {
          if (!response.ok) {
            throw new Error("Could not fetch MVPMatch data");
          }
          return response.json();
        })
        .then(data => {
          console.log(data.data, "matches");
          setMatch(data.data);
          localStorage.setItem('MVPMatch', JSON.stringify(data.data));
  
          // Find the active match within the MVPMatch data
          const activeMatch = data.data.find(match => match.Show);
          console.log(activeMatch);
  
          if (activeMatch) {
            // Fetch MVP data for the active match
            fetch(activeMatch.URL)
              .then(response => {
                if (!response.ok) {
                  throw new Error("Could not fetch MVP data");
                }
                return response.json();
              })
              .then(data => {
                console.log(data.data);
                data.data.shift();
                let highestKillsPlayer = null;
  
                for (const playerData of data.data) {
                  if (playerData["Kills"]) {
                    if (!highestKillsPlayer || playerData["Kills"] > highestKillsPlayer["Kills"]) {
                      highestKillsPlayer = playerData;
                    } else if (playerData["Kills"] === highestKillsPlayer["Kills"] && playerData["TeamKills"] > highestKillsPlayer["TeamKills"]) {
                      highestKillsPlayer = playerData;
                    }
                  }
                }
                console.log(highestKillsPlayer);
                setFulldata(highestKillsPlayer);
                localStorage.setItem('MVP', JSON.stringify(highestKillsPlayer));
              })
              .catch((error) => {
                console.error("Error fetching MVP data:", error);
              });
          }
        })
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
    const Data = localStorage.getItem('player2');
    if (Data) {
        setPlayers(JSON.parse(Data));
        console.log("Player",JSON.parse(Data))
    }
}, []);
  
  return (
    <>
    {
                Fulldata1.length > 0 && Fulldata1[1] && (
                  <div className="  flex relative mt-40  h-60  ">
        {/* //static */}
        <div className="  text-[18rem] inset-0 absolute -left-4 -top-28  font-custom text-custom">
          MOST VALUEABLE PLAYER
        </div>
        <div className=" relative flex w-full  items-center -right-16 ">
          {/* tournament logo */}
          <img
            width="300px"
            src={Fulldata1[1].TournamentLogo}
            alt=""
          />


        </div>
      </div>
                )
}
    {
                Fulldata1.length > 0 && Fulldata1[1] &&  Fulldata && Fulldata.PlayerName &&(
                  <div className="flex relative -top-40 left-8" >
        {/* FOR IMAGe */}
        <div>
          <img height="1029px" width="934px" src={Fulldata && findPhoto(Fulldata.PlayerName)} alt="" />
        </div>
        {/* FOR STATS */}
        <div className='h-[889px] w-[905px] flex items-center flex-col'  >
          <div className='font-custom font-bold text-8xl h-14 text-white relative -left-[40px]' >MATCH MOST VALUEABLE PLAYER</div>
          <div className=' light w-[900px] font-custom1 text-[501px] h-[303px] text-center relative -top-[157px] -left-[31px] text-white' >MVP</div>
          <div className='z-0 relative h-[55px] flex items-center justify-center  px-1 bg-[#1b1b3d] font-custom text-center font-bold top-[15px] left-[129px] text-white text-[48px] ' >{Fulldata1[1].Match}</div>
          <div className='h-[70px] flex items-center justify-center  -left-[32px] w-[828px] bg-[#96c93d] relative font-custom font-extrabold text-center top-[74px] text-[70px] text-white]' style={{ clipPath: "polygon(1.56% 0%, 81.11% 0%, 81.69% 12.86%, 93% 12.86%, 93.44% 0%, 100% 0%, 100% 71.89%, 97.22% 100%, 21.67% 100%, 20.44% 91.84%, 9.46% 91.84%, 7.89% 100%, 0% 101.43%, 0% 21.43%)", color: "white" }}>{Fulldata.PlayerName}</div>
          <div className='relative h-[253px] w-[900px] flex items-center top-[42px]' >

            <img height="253px" width="264px" src={Fulldata.TeamLogo} alt="" />
            <div className='font-custom font-bold text-[77px] ml-[31px] text-white' >{Fulldata.TeamName}</div>
          </div>
          <div className='flex w-[828px] relative -left-8 mt-[18px]'   >
            <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#96c93d] text-center flex items-center justify-center font-bold text-[52px] text-white font-custom ' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> MATCH KILLS </div>
              <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[52px] relative -left-[1px]' style={{ lipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}> {Fulldata.Kills}</div>
            </div>
            <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#96c93d] text-center font-custom flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> CONTRIBUTION</div>
              <div className='w-[103px] font-custom  bg-white text-center flex items-center justify-center font-bold text-[50px] relative -left-[1px]' style={{ lipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}> {Fulldata.Contribution} %</div>
            </div>

          </div>
          <div className='flex w-[828px] relative -left-8 mt-[10px]'   >
            <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#96c93d] font-custom  text-center flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> OVERALL KILL </div>
              <div className='w-[103px] bg-white text-center flex items-center justify-center font-bold font-custom  text-[52px] relative -left-[1px]' style={{ clipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}> {findKill(Fulldata.PlayerName)}</div>
            </div>
            <div className='h-[85px] w-[410px] flex mr-[10px]' >
              <div className='w-[341px] bg-[#96c93d] font-custom  text-center flex items-center justify-center font-bold text-[52px] text-white' style={{ clipPath: "polygon(4.68% 0%, 67.54% 0%, 69.59% 8.14%, 86.26% 8.14%, 88.01% 0%, 99.71% 0%, 99.71% 98.84%, 69.59% 98.84%, 67.54% 89.54%, 48.43% 89.54%, 46.19% 98.84%, 0% 98.84%, 0% 18.6%)" }}> OVERALL RANK</div>
              <div className='w-[103px] bg-white text-center flex items-center justify-center font-bold font-custom  text-[52px] relative -left-[1px]' style={{ lipPath: "polygon(0% 0%, 83.65% 0%, 100% 16.28%, 100% 100%, 0% 100%)" }}> {findRank(Fulldata.PlayerName)}</div>
            </div>

          </div>

        </div>
      </div>
                )
}
      
      
    </>
  )
}