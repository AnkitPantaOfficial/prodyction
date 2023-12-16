import React from "react";
import "../App.css";

import { useEffect, useState } from "react";
export default function Matchstanding() {
  const [First, setFirst] = useState([]);
  const [Rest, setRest] = useState([]);
  const [Match, setMatch] = useState([]);
  const [Fulldata1, setFulldata1] = useState([]);
  const [Photo, setPhoto] = useState([]);


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
    const Data = localStorage.getItem('RMS');
    const Data1 = localStorage.getItem('FMS');
    const Data2 = localStorage.getItem('MatchS');

    if (Data) {
      setFirst(JSON.parse(Data1))
      setRest(JSON.parse(Data))
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
          localStorage.setItem('MatchS1', JSON.stringify(data.data));

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
                // Convert data.data to an array
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
                let FirstTeam = formattedData.Teams[1]
                let RestTeam = formattedData.Teams.slice(2, 13)
                if (FirstTeam && FirstTeam.Players && FirstTeam.Players.length > 0 && FirstTeam.Players[0]) {
                  console.log(FirstTeam.Players[0].PlayerName, "first");
                } else {
                  console.error("FirstTeam or FirstTeam.Players[0] is undefined");
                }
                console.log(RestTeam, "rest")
                setFirst(FirstTeam);
                setRest(RestTeam);
                localStorage.setItem("FMS", JSON.stringify(FirstTeam));
                localStorage.setItem("RMS", JSON.stringify(RestTeam));
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

  return (
    <>
      {
        Fulldata1.length > 0 && Fulldata1[1] && (
          <div className="  flex relative mt-32  h-60  ">
            {/* //static */}
            <div className="text-[21rem] inset-0 absolute -left-4 -top-28  font-custom text-custom">
              MATCH STANDING
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
                <div className=" light font-custom text-[13rem] font-bold ">
                  MATCH STANDING
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
       First && First.Players && First.Players.length > 0 && First.Players[0] && (
          <div className="w-full flex justify-evenly mt-20" >
            <div className="h-[619px] w-[599px]">
              <div className="flex  bg-black bg-opacity-50  h-[452px]  custom-clip-path ">
                {/* palyer1 image of 1st team */}
                <img
                  height="375px"
                  // style={{ position: "relative", top: "78px", left: "-110px" }}
                  className="relative top-[78px] -left-[152px]"
                  src={findPhoto(First.Players[0].PlayerName)}
                  alt=""
                />
                {/* palyer2 image of 1st team */}
                <img
                  height="375px"
                  style={{ position: "relative", top: "78px", left: "-473px" }}
                  src={findPhoto(First.Players[1].PlayerName)}
                  alt=""
                />
                {/* palyer3 image of 1st team */}
                <img
                  height="375px"
                  style={{ position: "relative", top: "78px", left: "-641px" }}
                  src={findPhoto(First.Players[2].PlayerName)}
                  alt=""
                />
                {/* palyer4 image of 1st team */}
                <img
                  height="375px"
                  style={{ position: "relative", top: "78px", left: "-1242px" }}
                  src={findPhoto(First.Players[3].PlayerName)}
                  alt=""
                />
              </div>
              <div className="flex h-[120px] w-full justify-between  bg-[#c0c0c0] px-5 py-2 custom-clip-path2">
                {/* logo of 1st team */}
                <img
                  height="93px"
                  src={First.TeamLogo}
                  alt=""
                />
                {/* name of 1st team */}
                <div
                  className="font-custom text-[63px] font-bold relative top-2"
                >
                  {First.TeamName}
                </div>
                {/* static flag of nepal */}
                <img
                  src="https://media.discordapp.net/attachments/1043905461193285702/1177298521779617792/Flag_of_Nepal.svg.png?ex=6571ffb0&is=655f8ab0&hm=6f6b21c2c83ae26042a57902d2dafdaf693be45ff93c1fd2c24e39e2cdb6445e&=&format=webp&width=550&height=671"
                  alt=""
                />
              </div>
              <div className="h-[120px] flex bg-white items-center justify-evenly custom-clip-path3">

                {/* higesht team postion */}
                <div className="text-center font-custom  font-bold text-5xl "  >
                  <div>1</div>
                  <div>PLACE</div>
                </div>
                {/* top team Rank Point */}
                <div className="text-center font-custom font-bold text-5xl ">
                  <div>{First.TeamPosition}</div>
                  <div>RANK PTS</div>
                </div>
                {/* top team Total kill */}
                <div className="text-center font-custom  font-bold text-5xl ">
                  <div>{First.TeamKills}</div>
                  <div>ELIMS</div>
                </div>
                {/* top team Total Point */}
                <div className="text-center font-custom font-bold text-5xl ">
                  <div>{First.TotalPoints}</div>
                  <div>TOTAL PTS</div>
                </div>
              </div>
            </div>
            <div className="">
              <table
                style={{ borderCollapse: "separate", borderSpacing: "3px" }}
                class="  "
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "110px",
                        height: "52px",
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "white",
                        clipPath:
                          "polygon(10.91% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22.41%)",
                      }}
                      scope="col"
                    >
                      RANK
                    </th>
                    <th
                      style={{
                        width: "529px",
                        height: "38px",
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "white",
                        clipPath:
                          "polygon(0% 0%, 7.56% 0%, 8.88% 13.79%, 31.76% 13.79%, 32.7% 0%, 70.13% 0%, 71.27% 13.79%, 89.22% 13.79%, 90.36% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      }}
                      scope="col"
                    >
                      TEAM NAME
                    </th>
                    <th
                      style={{
                        width: "104px",
                        height: "38px",
                        textAlign: "center",
                        backgroundColor: "#96c93d",
                        color: "white",
                      }}
                      scope="col"
                    >
                      PLACE
                    </th>
                    <th
                      style={{
                        width: "104px",
                        height: "38px",
                        textAlign: "center",
                        backgroundColor: "#96c93d",
                        color: "white",
                      }}
                      scope="col"
                    >
                      RANK PTS
                    </th>
                    <th
                      style={{
                        width: "104px",
                        height: "38px",
                        textAlign: "center",
                        backgroundColor: "#96c93d",
                        color: "white",
                      }}
                      scope="col"
                    >
                      ELMS
                    </th>
                    <th
                      style={{
                        width: "105px",
                        height: "38px",
                        textAlign: "center",
                        backgroundColor: "#96c93d",
                        color: "white",
                        clipPath:
                          "polygon(0% 0%, 88.46% 0%, 100% 20.34%, 100% 100%, 0% 100%)",
                      }}
                      scope="col"
                    >
                      TOTAL PTS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Rest && Rest.map((ele, index) => (


                    <tr
                      style={{
                        height: "50px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontFamily: "teko",
                        fontWeight: "bold",
                        fontSize: "32px",
                        backgroundColor:  index % 2 === 0 ? "rgb(216,216,216,0.5)" : "	rgb(256,256,256,0.7)"

                      }}
                    >
                      <th
                        style={{
                          padding: "0px",
                          background: "rgba(158, 158, 158)",
                          color: "white",
                        }}
                        scope="row"
                      >
                        #{index + 2}
                      </th>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        <div
                          style={{
                            width: "112px",
                            background: "rgba(256,256,256,0.7",
                            padding: "0px",
                            justifyContent: "center",
                            alignItems:"center"
                          }}
                        >
                          <img
                            style={{ display: "flex", justifyContent: "center"}}
                            height="30px"
                            width="60px"
                            src={ele.TeamLogo}
                            alt=""
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "41px",
                            alignItems: "center",
                          }}
                        >
                          <div style={{}}>
                            <img
                              height="30px"
                              width="35px"
                              style={{ padding: "3px", marginLeft: "5px" }}
                              src="https://media.discordapp.net/attachments/1043905461193285702/1177298521779617792/Flag_of_Nepal.svg.png?ex=6571ffb0&is=655f8ab0&hm=6f6b21c2c83ae26042a57902d2dafdaf693be45ff93c1fd2c24e39e2cdb6445e&=&format=webp&width=550&height=671"
                              alt=""
                            />
                          </div>
                          <h3
                            style={{
                              fontSize: "37px",
                              fontFamily: "teko",
                              position: "relative",
                              top: "7px",
                              fontWeight: "bolder",
                              color: "white",
                            }}
                          >
                            {ele.TeamName}
                          </h3>
                          {""}
                        </div>
                      </td>

                      <td style={{
                        padding: "0px",
                        color: "black",
                        background: index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)"
                      }}>0</td>
                      <td style={{
                        padding: "0px",
                        color: "black",
                        background: index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)"
                      }}>{ele.TeamPosition}</td>
                      <td style={{
                        padding: "0px",
                        color: "black",
                        background: index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)"
                      }}>{ele.TeamKills}</td>
                      <td style={{
                        padding: "0px",
                        color: "black",
                        background: index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)"
                      }}>{ele.TotalPoints}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
      }

    </>
  );
}
