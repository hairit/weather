import { useState } from "react";
import "./App.css";

function App() {
  const [zipcode, setZipcode] = useState("");
  const [advices, setAdvices] = useState([]);

  const checkWeather = () => {
    if (!zipcode) {
      alert("Please enter zipcode");
      return;
    }
    const url = `http://localhost:5151/Weather/${zipcode}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        updateAnswers(result);
      })
      .catch((exception) => {
        alert(exception.message);
      });
  };

  const updateAnswers = (result) => {
    const { current } = result;
    let advices = [
      {
        question: "Should I go outside?",
        answer: !current.precip ? "Yes" : "No",
      },
      {
        question: "Should I wear sunscreen?",
        answer: current.uv_index > 3 ? "Yes" : "No",
      },
      {
        question: "Can I fly my kite?",
        answer: !current.precip && current.wind_speed > 15 ? "Yes" : "No",
      },
    ];
    setAdvices(advices);
  };

  return (
    <div id="app">
      <div id="weather-check">
        <h2>Weather</h2>
        <input
          placeholder="Zipcode"
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <button type="button" onClick={checkWeather}>
          Check
        </button>
        <ul>
          {advices.map((advice, index) => (
            <li key={index}>
              {advice.question} <span>{advice.answer}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
