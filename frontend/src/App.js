import "./App.css";
import GistList from "./components/GistList";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleGist from "components/SingleGist";
import CreateGist from "components/CreateGist";
import { useState } from "react";
import AllGists from "components/AllGists";

const App = () => {
  const [check, setCheck] = useState(true);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<GistList />} />
          <Route path="/yourgist" element={<AllGists />} />
          <Route path="/gist" element={<SingleGist />} />
          <Route path="/create" element={<CreateGist />} />
          <Route path="/starred" element={<AllGists />} />
          <Route path="/edit" element={<CreateGist editGist={check} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
