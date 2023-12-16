import React from "react";
import { motion, useAnimation } from "framer-motion";
import "../App.css";
import { useEffect, useState } from "react";
export default function OverallStanding2() {
    const [First, setFirst] = useState([]);
    const [Rest, setRest] = useState([]);
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
        const Data = localStorage.getItem('tRMS2');
        const Data1 = localStorage.getItem('tFMS2');


        if (Data) {
            setFirst(JSON.parse(Data1))
            setRest(JSON.parse(Data))

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
                                    "WWCD":item["Chicken"],
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
                    let RestTeam = formattedData.Teams.slice(12)
                    console.log(FirstTeam, "first")
                    console.log(RestTeam, "rest")
                    setFirst(FirstTeam);
                    setRest(RestTeam);
                    localStorage.setItem("tFMS2", JSON.stringify(FirstTeam));
                    localStorage.setItem("tRMS2", JSON.stringify(RestTeam));
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
                    <div className="  flex relative mt-32  h-60  ">
                        {/* //static */}
                        <div className=" text-[21rem] inset-0 absolute -left-4 -top-28  font-custom text-custom">
                            OVERALL STANDING
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
                                    <div className=" bganai relative font-bold text-[38px]  font-custom top-16 bg-[#96c93d] px-1 rounded-md ">
                                        {Fulldata1[1].Match}
                                    </div>
                                </div>
                                <div className="  light  font-custom text-[13rem] font-bold ">
                                    OVERALL STANDING
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="w-full flex justify-center mt-20 " >
                <table
                    style={{ borderCollapse: "separate", borderSpacing: "3px" }}
                    class="  "
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    width: "200px",
                                    fontFamily: "teko",
                                    height: "60px",
                                    textAlign: "center",
                                    backgroundColor: "black",
                                    color: "white",
                                    fontSize: "42px",
                                    clipPath:
                                        "polygon(10.91% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22.41%)",
                                }}
                                scope="col"
                            >
                                RANK
                            </th>
                            <th
                                style={{
                                    width: "700px",
                                    height: "38px",
                                    fontFamily: "teko",
                                    textAlign: "center",
                                    backgroundColor: "black",
                                    color: "white",
                                    fontSize: "40px",
                                    clipPath:
                                        "polygon(0% 0%, 7.56% 0%, 8.88% 13.79%, 31.76% 13.79%, 32.7% 0%, 70.13% 0%, 71.27% 13.79%, 89.22% 13.79%, 90.36% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                }}
                                scope="col"
                            >
                                TEAM NAME
                            </th>
                            <th
                                className="w-36 h-10 font-custom text-[40px] text-center text-white bg-[#96c93d]"
                                scope="col"
                            >
                                WWCD
                            </th>
                            <th
                                className="w-36 h-10 text-[40px] font-custom  text-center text-white bg-[#96c93d]"
                                scope="col"
                            >
                                RANK PTS
                            </th>
                            <th
                                className="w-36 h-10 font-custom text-[40px] text-center text-white bg-[#96c93d]"

                                scope="col"
                            >
                                ELMS
                            </th>
                            <th
                                style={{
                                    width: "144px",
                                    height: "38px",
                                    textAlign: "center",
                                    fontFamily: "teko",
                                    backgroundColor: "#96c93d",
                                    color: "white",
                                    fontSize: "40px",
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
                        {
                            Rest && Rest.map((ele, index) =>
                            (
                                <motion.tr

                                    initial={{ opacity: 0, translateX: index % 2 === 0 ? -50 : 50, translateY: -50 }}
                                    animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                                    transition={{
                                        duration: 0.5, delay: index * 0.3
                                    }}
                                    style={{
                                        height: "60px",
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
                                        #{index + 12}
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
                                            }}
                                        >
                                            <img
                                                height="38.78px"
                                                width="38.78px"
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
                                            <h2
                                                style={{
                                                    fontFamily: "teko",
                                                    position: "relative",
                                                    top: "7px",
                                                    fontWeight: "bolder",
                                                    color: "white",
                                                    
                                                }}
                                            >
                                                {ele.TeamName}
                                            </h2>
                                            {""}
                                        </div>
                                    </td>

                                    <td style={{
                                        padding: "0px",
                                        color: "black",
                                        background: index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)"
                                    }}>{ele.WWCD}</td>
                                    <td style={{
                                        padding: "0px",
                                        background: index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)",
                                        color: "black",
                                    }}>{ele.TeamPosition}</td>
                                    <td style={{
                                        padding: "0px",
                                        background: index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)",
                                        color: "black",
                                    }}>{ele.TeamKills}</td>
                                    <td style={{
                                        padding: "0px",
                                        background:index % 2 === 0 ? "rgb(255,255,255)" : "	rgb(255,255,255,0.9)",
                                        color: "black",
                                    }}>{ele.TotalPoints}</td>
                                </motion.tr>
                            )
                            )


                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}