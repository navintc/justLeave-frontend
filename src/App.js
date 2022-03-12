import logo from './logo.svg';
import './App.css';

import TopNavbar from "./components/topNavbar/topNavbar";

import Footer from "./components/footer/footer";
import topNavbar from "./components/topNavbar/topNavbar";
import ApprovedLeaves from "./pages/approvedLeaves/approvedLeaves";

function App() {
  return (
    <div className="">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}

      <TopNavbar/>
        <ApprovedLeaves/>
      <Footer/>

    </div>
  );
}

export default App;
