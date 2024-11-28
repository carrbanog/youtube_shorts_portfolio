import "./App.css";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import NextPlayer from "./components/Player/NextPlayer";
import Player from "./components/Player/Player";
import TopicPlayer from "./components/Player/TopicPlayer"
import { VideoProvider } from "./VideoContext/VideoContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <VideoProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/videoplay/recommended/:videoId" element={<Player />} />
          <Route path="/videoplay/topic/:videoId" element={<TopicPlayer />} />
          <Route path="/videoplay/recommended/:videoIndex/:category/:nextVideoId" element={<NextPlayer />} />
        </Routes>
      </Router>
    </VideoProvider>
  );
}

export default App;
