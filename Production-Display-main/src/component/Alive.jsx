import React, { useState, useEffect } from 'react';

export default function Alive() {

    const [Fulldata, setFulldata] = useState([]);

    useEffect(() => {
        const Data = localStorage.getItem('alive');

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
        <div className='flex justify-center'>
            <table className=' flex flex-col mt-40 w-1/2 ' style={{ borderCollapse: "separate", borderSpacing: "3px" }} >
                <thead  >
                    <tr >
                        {/* <th style={{
                            width: "50px",
                            fontFamily: "teko",
                            height: "20px",
                            textAlign: "center",
                            backgroundColor: "black",
                            color: "white",
                            fontSize: "20px",
                            clipPath:
                                "polygon(10.91% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22.41%)",
                        }} scope="col">#</th> */}
                        <th
                            style={{
                                width: "200px",
                                height: "20px",
                                fontFamily: "teko",
                                textAlign: "center",
                                backgroundColor: "black",
                                color: "white",
                                fontSize: "20px",
                                clipPath:
                                    "polygon(0% 0%, 7.56% 0%, 8.88% 13.79%, 31.76% 13.79%, 32.7% 0%, 70.13% 0%, 71.27% 13.79%, 89.22% 13.79%, 90.36% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            }} align='center' scope="col">Team</th>
                        <th className="w-12 h-[20px] font-custom text-[20px] text-center text-white bg-[#007B56]" scope="col">ALIVE</th>
                        <th className="w-12 h-[20px] font-custom text-[20px] text-center text-white bg-[#007B56]" scope="col">ELIMS</th>
                    </tr>
                </thead>

                <tbody style={{ color: "white", borderCollapse: "separate", borderSpacing: "3px" }}>
                    {Fulldata.map((ele, index) => (
                        <tr style={{ height: "10px" }} className={`${ele.trueCount == 4 ? 'opacity-80 ' : ''}`}  key={index}>
                            {/* <th className={`w-12 bg-[black] ${ele.trueCount == 4 ? 'opacity-25' : ''}  `} scope="row">#{index + 1}</th> */}
                            <td className='w-[200px] ' align='center' style={{ background: "white", color: "black", fontWeight: "700" }}   >
                                <div className='flex justify-evenly bg-[#007B56]' >
                                    <img src={ele.photo} alt="" width="30px" height="20 px" srcset="" />
                                    <div className='w-2/3 text-white'>{ele.TeamName}</div>
                                </div>
                            </td>
                            <td
                                className='w-12 bg-black justify-center items-center h-[32px]'
                                style={{ fontWeight: "900", display: "flex" }}
                                align='center'
                            >
                                {ele.trueCount === 0 ? (
                                    <> 
                                        <div className=' -space-x-4' >

                                        <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                        <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                        <span style={{ color: "white", fontSize: "20px"}}>|</span>
                                        <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                        </div>
                                    </>
                                ) : ele.trueCount === 2? (
                                    <>
                                    <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    </>
                                ): ele.trueCount === 1? (
                                    <>
                                    <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    </>
                                ):ele.trueCount === 4?(
                                    <>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    </>
                                ):ele.trueCount === 3?(
                                    <>
                                    <span style={{ color: "white", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    <span style={{ color: "grey", fontSize: "20px" }}>|</span>
                                    </>
                                ):(
                                    ""
                                )

                                }
                            </td>
                            <td className='w-12 bg-black ' style={{ fontWeight: "900" }} align='center'>{ele.Kill}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
