import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [userLocation, setUserLocation] = useState();


  useEffect(() => {
    const successCallBack = async (position) => {
      try {
        let response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        );
        let data = await response.json();
        console.log("locationData:", data);
        setUserLocation(data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    const errorCallBack = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("Please allow access to location");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location Information unavailable");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
    } else {
      console.log("The browser does not support geolocation");
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="App">
      <h1>Your Current Location: {userLocation?.display_name}</h1>
    </div>
  );
}

export default App;
