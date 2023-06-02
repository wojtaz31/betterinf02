import { Routes, Route, HashRouter } from "react-router-dom";
import Tescik from "./Tescik"
import NewBar from "./newBar";
import Dzisiejsze from "./Dzisiejsze";

export default function App() {
  return (
    <div className="App" style={{
      height: "100vh",
      display: "flex",
      flexFlow: "column"
  }}>
    <HashRouter>
    <NewBar></NewBar>
                    <div style={{flex: "1 1 auto"}}>                  
                        <Routes> 
                          
                            <Route path="/" index element={<Tescik/>}></Route>
                            <Route path="/dzisiejsze" element={<Dzisiejsze/>}></Route>                                                                     
                            <Route path="*" element={<></>} />
                        </Routes>
                    </div>
      </HashRouter>
      </div>
  )
}