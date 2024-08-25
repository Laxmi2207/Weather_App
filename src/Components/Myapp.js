import React, { useState } from 'react'
import cloud from "../images/cloud.png"
import rain from "../images/heavy-rain.png"
import clear from "../images/sun.png"
import mist from "../images/mist.png"
import err from "../images/close.png"

const Myapp = () => {
    const[search,setSearch]=useState("");
    const [data,setData]= useState();
    const [error,setError] = useState("");
    const API_KEY = "0865cdd9463c2e7bb3d856287a0535b9"
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

    const handleInput = (event)=>{
    setSearch(event.target.value);
    console.log(event.target.value);
    }

    const myFun=async()=>{
        const get =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
       const jsonData = await get.json();
        console.log(jsonData)
        setData(jsonData);
        if(search==""){
            // alert("Enter City name");
            setError("Please Enter Name");
        }
      else if(jsonData.cod == '404'){
            setError("Please Enter Valid Name !");
        }else{
            setError("")
        }
        setSearch("")
    }
   

  return (
   <>
   <div className='container'>
    <div className='inputs'>
        <input placeholder='Enter the city name, Country' value={search} onChange={handleInput}>
        </input>
        <button onClick={myFun}>
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
    <div>
        {
            error ? 
            <div className='errorPage'>
                <p>{error}</p>
                <img src={err} />
                 </div> : ""
        }
        {
        data && data.weather ? 
        <div className='weathers'>
            <h2 className='cityName'>{data.name}</h2>
            <img src={data.weather[0].main == "Clouds" ? cloud : ""}/>
            <img src={data.weather[0].main == "Rain" ? rain : ""}/>
            <img src={data.weather[0].main == "Clear" ? clear : ""}/>
            <img src={data.weather[0].main == "Mist" ? mist : ""}/>
            <img src={data.weather[0].main == "Haze" ? err : ""}/>
            <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
            <p className='climate'>{data.weather[0].description}</p>
            </div>  : ""
        
        }
        </div>
   </div>
   </>
  )
}

export default Myapp
