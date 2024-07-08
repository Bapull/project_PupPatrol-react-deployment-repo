import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [info,setInfo] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3001/information",{
      method:"GET"
    }).then(res=>res.json()).then((res)=>setInfo(res))
  })
  return (
    <div className="App">
      <header className="App-header">
        {info.map((item)=>{
          return(
            <img src={item.information_image_url} width={"500px"}></img>
          )
        })}
      </header>
    </div>
  );
}

export default App;
