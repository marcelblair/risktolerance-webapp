import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import './App.css';

function App() {

  let baseURL = "http://192.168.0.4:8080"
  const [value, setValue] = React.useState("female");
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${baseURL}/api/v1/risktolerance/questions`, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then((response) => {
      setQuestions(response.data);
    });
  }, []);

 
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="App">
      {questions.map((question,i) =>
       <FormControl component="fieldset" key={i}>
       <FormLabel component="legend">{question.questionText}</FormLabel>
       <RadioGroup aria-label="answer" name="answer1" value={value} onChange={handleChange}>
         {question.choices.map((choice, a) => 
            <FormControlLabel key={a} value={choice.description} control={<Radio />} label={choice.description} />
         )}
       </RadioGroup>
       <br/>
     </FormControl>
      
       )}
     
  
    </div>
  );
}

export default App;
