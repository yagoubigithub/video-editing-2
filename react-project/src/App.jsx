import "./fonts.css"
import "./resizing.css"
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from "./components/Sidebar";

import { TextProvider } from "./context/TextContext"
import Video from "./components/Video";

function App() {
  return (
    <div >
      <TextProvider >
        <Navbar />
        <div id="progress"></div>

      <div id="content">
      <Sidebar></Sidebar>
        <Video />
      </div>

      </TextProvider>


    </div>
  );
}

export default App;
