import React from "react";

import { useEffect, useState } from "react";
export default function Wwcd() {
    const [Fulldata, setFulldata] = useState([]);
    const [Match, setMatch] = useState([]);


    const [Fulldata1, setFulldata1] = useState([]);
    const [Photo, setPhoto] = useState([]);

    useEffect(() => {
        const Data = localStorage.getItem('photoMatchData');

        if (Data) {
            setPhoto(JSON.parse(Data));
        }
    }, []);
    useEffect(() => {
        const Data = localStorage.getItem('wwcdMatchData');

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
                    localStorage.setItem('wwcdMatchData', JSON.stringify(data.data))
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
            fetch('https://script.googleusercontent.com/macros/echo?user_content_key=H7ZEKF2dFydBSNMurp8-st8kDgTXdVxvIq9exLwd9xtKuBTMQYu2rWNrsv7jc1s5ZGnLwZRoAFRSPh-foRzJLSSGX0zo7Ffgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHzru4KvFZISZRKlKMrk2FU_4r75g9eQ1LBRyKOYFbGF_5j4gNxSLjYJyKevbSIIsFfO0ZdWg4b737dWaDR_mHVa7udaH5vFkA&lib=MyDIGNa8ClhITOhHWOHKG6aIwSiYkmlJD')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Could")
                    }
                    return response.json()
                }).then(data => {
                    console.log(data.data, "photo");
                    setPhoto(data.data)
                    localStorage.setItem('photoMatchData', JSON.stringify(data.data))
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
        const Data = localStorage.getItem('MatchData1');
        const Data2 = localStorage.getItem('WWCDMatch');

        if (Data) {
            setFulldata(JSON.parse(Data));
            setMatch(JSON.parse(Data2));
            console.log(JSON.parse(Data), "this")
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
                    localStorage.setItem('WWCDMatch', JSON.stringify(data.data));

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
                                // Sort the teams by TotalPoints in descending order
                                const sortedTeams = formattedData.Teams.sort((a, b) => {
                                    if (a.TeamPosition === 10 && b.TeamPosition !== 10) {
                                        // If TeamPosition is 10, prioritize it
                                        return -1;
                                    } else if (b.TeamPosition === 10 && a.TeamPosition !== 10) {
                                        // If TeamPosition is 10, prioritize it
                                        return 1;
                                    } else {
                                        // If TeamPosition is not 10 or both are 10, sort by TotalPoints in descending order
                                        return b.TotalPoints - a.TotalPoints;
                                    }
                                });

                                // Check if there are any teams in the sorted array
                                if (sortedTeams.length > 0) {
                                    // Get the team with the highest TotalPoints (the first element in the sorted array)
                                    const teamWithHighestPoints = sortedTeams[0];

                                    // Now, `teamWithHighestPoints` contains the data of the team with the highest TotalPoints
                                    console.log("Team with the highest TotalPoints:", teamWithHighestPoints);

                                    // You can use `teamWithHighestPoints` as needed in your component
                                    // For example, you can set it as state or store it in a variable
                                }


                                console.log(sortedTeams[0], "format");

                                // Set the formatted data in Setfulldata
                                setFulldata(sortedTeams[0]);

                                // Store the original data in localStorage
                                localStorage.setItem("MatchData1", JSON.stringify(sortedTeams[1]));
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
                            CHICKEN TEAM FOCUS
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
                                <div className="  font-custom text-[13rem] font-bold ">
                                    CHICKEN TEAM FOCUS
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="mt-20 flex justify-evenly">
                {Fulldata && Fulldata.Players && Fulldata.Players.map((player) => (
                    <div className="w-[408px] relative">
                        {/* player image */}
                        <img
                            className="absolute z-30 -top-[24px]"
                            height="384px"
                            width="408px"
                            src={findPhoto(player.PlayerName)}
                            alt=""
                        />
                        <div
                            style={{
                                height: "384px",
                                width: "408px",
                                clipPath:
                                    "polygon(49% 5%, 74% 5%, 79% 0%, 96% 0%, 100% 4%, 100% 33%, 98% 34%, 98% 98%, 100% 100%, 0% 100%, 2% 99%, 1% 35%, 0% 33%, 0% 3%, 3% 0%, 21% 0%, 26% 5%)",
                                backgroundColor: "rgba(0, 0, 0, 0.46)",
                            }}
                        ></div>

                        <div
                            className="h-16 font-custom flex justify-center items-center bg-[#96c93d] font-semibold"
                            style={{
                                clipPath:
                                    " polygon(0% 0%, 100% 0%, 100% 88.75%, 79.49% 88.86%, 76.92% 100%, 3.63% 100%, 0% 76.97%)",
                            }}
                        >
                            {/* name of player 1 with most kill in a match */}
                            <div className=" text-white font-custom text-4xl font-semibold">
                                {player.PlayerName}
                            </div>
                        </div>
                        <div
                            className="flex font-custom justify-evenly items-center h-24 mt-2 bg-white"
                            style={{
                                clipPath:
                                    "polygon(16.84px 0px, 224.9px 0px, 227.9px 4.59px, 326.25px 4.59px, 330.12px 0px, 397.36px 0px, 406px 9.17px, 406px 93px, 227.9px 93px, 224.12px 87.11px, 96.74px 87.11px, 93.74px 93px, 0px 93px, 0px 15.6px)",
                            }}
                        >
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-4xl text-white font-semibold relative bg-[#96c93d] w-40 h-9 top-1 rounded-md text-center ">
                                    KILLS
                                </div>
                                <div className=" font-semibold text-4xl relative top-1">
                                    {player.Kills}
                                </div>
                            </div>
                            <div className="h-[70px] border border-l-2 border-black "></div>
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-4xl text-white font-semibold relative bg-[#96c93d] w-40 h-9 top-[5px] rounded-md text-center ">
                                    CONTRIBUTION
                                </div>
                                <div className=" font-semibold text-4xl relative top-1">
                                    {player.Contribution} %
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {Fulldata && (
                <div className="flex justify-evenly h-[142px]   mt-[7px]">
                    <div
                        className=" bg-[#00b09b] w-[564px] flex justify-evenly items-center"
                        style={{
                            clipPath:
                                "polygon(0px -1px, 550px 0px, 564px 13px, 564px 57.44px, 558px 60.8px, 557px 119px, 564px 125px, 565px 142px, 413px 142px, 404.9px 135.48px, 207.82px 135.48px, 198px 142px, 25px 142px, 0px 119px)",
                        }}
                    >
                        <div>
                            <img
                                height="200px"
                                width="200px"
                                src={Fulldata.TeamLogo}
                                alt=""
                            />
                        </div>
                        <div className="text-center">
                            <div className="font-custom font-semibold text-[65px]  text-white">
                                {Fulldata.TeamName}
                            </div>
                        </div>
                    </div>
                    <div
                        className=" bg-white w-[564px] flex justify-evenly items-center"
                        style={{
                            clipPath:
                                "polygon(0px -1px, 550px 0px, 564px 13px, 564px 57.44px, 558px 60.8px, 557px 119px, 564px 125px, 565px 142px, 413px 142px, 404.9px 135.48px, 207.82px 135.48px, 198px 142px, 25px 142px, 0px 119px)",
                        }}
                    >
                        <div className="font-custom font-semibold text-[50px]">
                            <div className="font-custom font-semibold text-[65px]">
                                MATCH ELIMINATION
                            </div>
                        </div>
                        <div>
                            <div className="font-custom font-semibold text-[65px]">
                                {Fulldata.TeamKills}
                            </div>
                        </div>
                    </div>
                    <div
                        className=" bg-white w-[564px] flex justify-evenly items-center"
                        style={{
                            clipPath:
                                "polygon(0px -1px, 550px 0px, 564px 13px, 564px 57.44px, 558px 60.8px, 557px 119px, 564px 125px, 565px 142px, 413px 142px, 404.9px 135.48px, 207.82px 135.48px, 198px 142px, 25px 142px, 0px 119px)",
                        }}
                    >
                        <div>
                            <div className="font-custom font-semibold text-[65px]">
                                MATCH POINT
                            </div>
                        </div>
                        <div>
                            <div className="font-custom font-semibold text-[65px]">
                                {Fulldata.TotalPoints}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
