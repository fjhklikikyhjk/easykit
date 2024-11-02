import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Forms from "./compontents/Forms";
import NewUser from "./NewUser";
import Navbar from "./compontents/Navbar";

function App() {
  return (
    <>
      <div className=' h-fit w-full bg-gradient-to-br from-zinc-950 via-zinc-950 to-stone-900 p-8 pb-14'>
        <Router>
          <Navbar />
          <Routes>
            <Route
              key={1}
              path='astounding-croissant-2449b7.netlify.app/:username'
              element={<Home />}
            />
            <Route
              key={2}
              path='astounding-croissant-2449b7.netlify.app/info'
              element={<Forms></Forms>}
            ></Route>
            <Route
              path='astounding-croissant-2449b7.netlify.app/signup'
              element={<NewUser />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;