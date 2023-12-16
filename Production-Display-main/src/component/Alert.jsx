import React, { useState, useEffect } from 'react';
import "../extra.css";


export default function Alert() {


    const [Fulldata, setFulldata] = useState([]);

    useEffect(() => {
        const Data = localStorage.getItem('alert');

        if (Data) {
            setFulldata(JSON.parse(Data));
        }
    }, []);

    useEffect(() => {
        // Function to fetch and process Excel data
        const fetchData = () => {
            fetch('https://script.googleusercontent.com/macros/echo?user_content_key=TrIcCstJmXUTEb3-SmXROmqKq7LIcJVsy9zeSTdWm6RE7RJyID9AgWqnPqwCqIkUN1cvxu4IgUjzKFL9LcTrX9gvYyzDCczxm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnK0wZQrLV0rmgbM_CeJC_N9T2IGSIe9IlCOnds_wpWrNGNV818BtjCCIthQGZ92S9wkJjh7WKvz0S_-bGa433LWmbFYFiSmwZg&lib=MyDIGNa8ClhITOhHWOHKG6aIwSiYkmlJD')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Could not fetch data");
                    }
                    return response.json();
                }).then(data => {
                    const updatedData = data.data.slice(1).map(row => {
                        const trueCount = Object.values(row).filter(value => value === true).length;
                        return { ...row, trueCount };
                    });
                    console.log(updatedData)
                    updatedData.sort((a, b) => {
                        if (a.trueCount !== b.trueCount) {
                          return a.trueCount - b.trueCount; // Sort by trueCount in ascending order
                        } else {
                          // Find the earliest index where trueCount is achieved
                          const earliestA = Fulldata.findIndex((team) => team.trueCount === a.trueCount);
                          const earliestB = Fulldata.findIndex((team) => team.trueCount === b.trueCount);
                          return earliestA - earliestB; // Sort by the order of appearance
                        }
                      });
                      updatedData.sort((a, b) => {
                        if (a.trueCount !== b.trueCount) {
                            return a.trueCount - b.trueCount; // Sort by trueCount in ascending order
                        } else {
                            // If trueCount is the same, sort by Kill count in descending order
                            return b.Kill - a.Kill;
                        }
                    });
                    if (Array.isArray(data)) {
                        const updatedData = data.map(row => {
                            const trueCount = Object.values(row).filter(value => value === true).length;
                            return { ...row, trueCount, playerCount: 4 }; // Assuming you have 4 players
                        });
    
                        const teamsWithAllPlayersTrue = updatedData.filter(team => team.playerCount === team.trueCount);
                        console.log(teamsWithAllPlayersTrue, "players" )
                    }
                    console.log(updatedData)
                    setFulldata(updatedData);
                    localStorage.setItem('alive', JSON.stringify(updatedData));
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
        <div className="ALET">
            <div className="overlap">
                <div className="frame">
                    <div className="overlap-group">
                        <div className="div">
                            <div className="rectangle"></div>
                            <div className="rectangle-4"></div>
                            <div className="rectangle-2"></div>
                            <div className="rectangle-3"></div>
                        </div>
                        <div className="overlap-group-wrapper">
                            <div className="rectangle-5"></div>
                            <div className="png-wrapper"><img className="png" src="https://media.discordapp.net/attachments/894821411548446800/1041889351392563220/tie2_png.png?ex=6580f392&is=656e7e92&hm=a485e9177db4e7d021c8651c5cb796d19f4b8cdfe3061a692d04466394fa6ddf&=&format=webp&quality=lossless&width=404&height=404" /></div>
                        </div>
                    </div>
                </div>
                <div className="div-wrapper"><div className="text-wrapper">TEAM ELIMINATION</div></div>
                <div className="frame-2"><div className="text-wrapper-2">TAKE IT EASY</div></div>
                <div className="frame-3"><div className="text-wrapper-3">16</div></div>
                <div className="frame-4"><div className="text-wrapper-3">ELIMINATION</div></div>
            </div>
        </div>
    )
}
