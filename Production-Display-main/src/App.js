import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { Increment, Decrement } from "./actions";
import Matchstanding from "./component/Matchstanding";
import Navbar from "./component/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OverallStanding from "./component/OverallStanding";
import Topfragger from "./component/Topfragger";
import OverallFragger from "./component/OverallFragger";
import TournamentBanner from "./component/TournamentBanner";
import Schedule from "./component/Schedule";
import { ComingUpNext } from "./component/ComingUpNext";
import Mvp from "./component/Mvp";
import OverallMvp from "./component/OverallMvp";
import Wwcd from "./component/Wwcd";
import Map from "./component/Map";
import Matchstanding2 from "./component/Matchstanding2";
import Display from "./component/Display";
import Alive from "./component/Alive";
import Winner from "./component/Winner";
import Alert from "./component/Alert";

function App() {
  const mystate = useSelector((state) => state.changeTheNumber);
  const dispatch = useDispatch();
  return (
    <>
      {/* <div className='w-screen flex flex-col justify-center h-screen items-center' >
      <h1 className='text-3xl font-bold text-gray-500' >Increment/Decrement Counter</h1>
      <div className='text-xl font-semibold text-gray-500' >using react redux</div>
      <div className="counter flex  mt-6 w-48 justify-center text-center space-x-6  items-center rounded-lg  bg-gray-300 h-12  ">
        <button className='text-blue-800 text-3xl font-bold' onClick={()=>dispatch(Decrement())} >-</button>
        <input className='bg-white p-1 w-12 text-center  text-3xl font-bold'  value={mystate} type="text" />
        <button className='text-blue-800 text-3xl font-bold' onClick={()=>dispatch(Increment())}  >+</button>
      </div>
    </div> */}

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<TournamentBanner />} />
          <Route exact path="/matchstandings" element={<Matchstanding />} />
          <Route exact path="/matchstandings2" element={<Matchstanding2 />} />
          <Route exact path="/display" element={<Display />} />
          <Route exact path="/alive" element={<Alive />} />
          <Route exact path="/overallstandings" element={<OverallStanding />} />
          <Route exact path="/winner" element={<Winner />} />
          <Route exact path="/topfraggers" element={<Topfragger />} />
          <Route exact path="/overallfragger" element={<OverallFragger />} />
          <Route exact path="/schedule" element={<Schedule />} />
          <Route exact path="/coming" element={<ComingUpNext />} />
          <Route exact path="/mvp" element={<Mvp />} />
          <Route exact path="/overmvp" element={<OverallMvp />} />
          <Route exact path="/wwcd" element={<Wwcd />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/alert" element={<Alert/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
