import logo from './logo.svg';
import './App.css';

import TopNavbar from "./components/topNavbar/topNavbar";

import Footer from "./components/footer/footer";
import topNavbar from "./components/topNavbar/topNavbar";
import Signin from "./pages/signin/signin";
import UserHome from "./pages/userHome/userHome";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import PendingLeaves from "./pages/pendingLeaves/pendingLeaves";
import ApprovedLeaves from "./pages/approvedLeaves/approvedLeaves";
import RejectedLeaves from "./pages/rejectedLeaves/rejectedLeaves";
import Signup from "./pages/signup/signup";

function App() {
  return (
    <div className="">

      <BrowserRouter>
          <TopNavbar/>
          <Routes>
              <Route path="/" element={<Signin />} />
              <Route path="/userhome" element={<UserHome />} />
              <Route path="/pendingleaves" element={<PendingLeaves />} />
              <Route path="/approvedleaves" element={<ApprovedLeaves />} />
              <Route path="/rejectedleaves" element={<RejectedLeaves />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
