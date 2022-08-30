import React from 'react';
//import Spinner from 'react-bootstrap/Spinner';
import "./styles.css";
//
function Result(props) {
  //const [data, setData] = useState({});
  //const [showLoading, setShowLoading] = useState(true);
  const { resultData } = props;
  console.log(resultData);
  const types = ["Setosa", "Virginica", "Versicolor"];
  const maxValue = Math.max(...resultData);
  const indexValue = resultData.indexOf(maxValue);
  
  return (
    <div>
      { 
        <div> 
            <h1>Prediction Results</h1>
            <h2> the values for species will be:</h2>
            <li>setosa: 1,0,0</li> 
            <li>virginica: 0,1,0</li>
            <li>versicolor: 0,0,1 </li>

            <table className="App-table">
              <thead>
                <tr>
                  <th>Test result</th>
                </tr>
              </thead>
              
              <tbody>
                
                <tr>
                  <td className="App-td">
                    { resultData.map((value, index) => (
                      <p key={index}>{value}</p>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
            <label>Based on the prediction, the species is {types[indexValue]}</label>
          </div>
      }
    </div>

  );
}
//
export default Result;