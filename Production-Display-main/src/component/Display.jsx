import React, { useState, useEffect } from 'react';
import Wwcd from './Wwcd';
import Matchstanding from './Matchstanding';
import Matchstanding2 from './Matchstanding2';
import Topfragger from './Topfragger';
import Mvp from './Mvp';
import OverallStanding from './OverallStanding';
import OverallStanding2 from './Overallstanding2';
import OverallFragger from './OverallFragger';
import Winner from './Winner';
import Runnerup from './Runnerup';
import Trunner from './Trunner';
import OverallMvp from './OverallMvp';


export default function Display() {
    const [value, setValue] = useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const [Fulldata, setFulldata] = useState([]);

    useEffect(() => {
        const Data = localStorage.getItem('dispaly');

        if (Data) {
            setFulldata(JSON.parse(Data));
        }
    }, []);

    useEffect(() => {
        // Function to fetch and process Excel data
        const fetchData = () => {
            // Replace 'your_excel_link_here' with the actual link to your Excel file
            fetch('https://script.google.com/macros/s/AKfycbwcJ0KF9bAFMP4WYLiuAmKoB82RO7YKwdjIaFLpZ-eOj5WkkYhwUVq8Rk5uP-2172Ee/exec')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Could not fetch data");
                    }
                    return response.json();
                }).then(data => {
                    console.log(data.data);

                    // Find the first element with show set to true and set its value as the active tab
                    const activeTabValue = data.data.find(ele => ele.Show === true)?.value || 0;
                    setValue(activeTabValue);
                    console.log(activeTabValue)

                    // Update Fulldata
                    setFulldata(data.data);

                    localStorage.setItem('display', JSON.stringify(data.data));
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
        <div>
            <div className="tab-container">
                <div className="flex">
                    <div
                        className={`tab-item ${value === 0 ? 'active' : ''}`}
                        onClick={() => handleChange(0)}
                    >
                        WWCD
                    </div>
                    <div
                        className={`tab-item ${value === 1 ? 'active' : ''}`}
                        onClick={() => handleChange(1)}
                    >
                        MATCH STANDING 1
                    </div>
                    <div
                        className={`tab-item ${value === 2 ? 'active' : ''}`}
                        onClick={() => handleChange(2)}
                    >
                        MATCH STANDING 2
                    </div>
                    <div
                        className={`tab-item ${value === 3 ? 'active' : ''}`}
                        onClick={() => handleChange(3)}
                    >
                        TOP FRAGGER
                    </div>
                    <div
                        className={`tab-item ${value === 4 ? 'active' : ''}`}
                        onClick={() => handleChange(4)}
                    >
                        MVP
                    </div>
                    <div
                        className={`tab-item ${value === 5 ? 'active' : ''}`}
                        onClick={() => handleChange(5)}
                    >
                        OVERALL STANDING
                    </div>
                    <div
                        className={`tab-item ${value === 6 ? 'active' : ''}`}
                        onClick={() => handleChange(6)}
                    >
                        OVERALL STANDING 2
                    </div>
                    <div
                        className={`tab-item ${value === 7 ? 'active' : ''}`}
                        onClick={() => handleChange(7)}
                    >
                        OVERALL Fragger
                    </div>
                    <div
                        className={`tab-item ${value === 8 ? 'active' : ''}`}
                        onClick={() => handleChange(8)}
                    >
                        WINNER
                    </div>
                    <div
                        className={`tab-item ${value === 9 ? 'active' : ''}`}
                        onClick={() => handleChange(9)}
                    >
                        1st RUNNER UP
                    </div>
                    <div
                        className={`tab-item ${value === 10 ? 'active' : ''}`}
                        onClick={() => handleChange(10)}
                    >
                        2nd RUNNER UP
                    </div>
                    <div
                        className={`tab-item ${value === 11 ? 'active' : ''}`}
                        onClick={() => handleChange(11)}
                    >
                        O MVP
                    </div>
                </div>
            </div>
            {value == 0 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Wwcd />
                </div>
            }
            {value == 1 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Matchstanding />

                </div>
            }
            {value == 2 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Matchstanding2 />

                </div>
            }
            {value == 3 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Topfragger />

                </div>
            }
            {value == 4 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Mvp />

                </div>
            }
            {value == 5 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <OverallStanding />

                </div>
            }
            {value == 6 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <OverallStanding2 />

                </div>
            }
            {value == 7 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <OverallFragger/>

                </div>
            }
            {value == 8 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Winner/>

                </div>
            }
            {value == 9 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Runnerup/>

                </div>
            }
            {value == 10 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <Trunner/>

                </div>
            }
            {value == 11 &&

                <div className={`tab-content ${value === 0 ? 'active' : ''}`}>
                    <OverallMvp/>

                </div>
            }

        </div>
    );
}