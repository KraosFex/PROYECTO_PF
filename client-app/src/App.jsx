import "./index.css";
import Home from "./pages/home";
import NavBar from "./Components/navbar/navBar";
import NavBarUser from "./Components/navbar/navBarUser";

function App() {
  return (
    <div className="App">
      <Home />
      <NavBar />
      <NavBarUser />
    </div>
  );
}

export default App;
