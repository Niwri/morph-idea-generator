
import './App.css';
import { functions as functionsInfo } from './components/functions.js';

import { useState } from 'react';

function App() {

  const [ globalCount, setGlobalCount ] = useState(0);

  const [ numOfAdds, setNumOfAdds ] = useState([]);

  const addNumOfAdds = () => {
    if(numOfAdds.length < functionsInfo.length)
      setNumOfAdds(num => [...num, 1]);
  }

  for(let i = 0; i < functionsInfo.length; i++) {
    addNumOfAdds();
  } 

  const [ functionsHeck, setFunctionsHeck ] = useState([]);

  const addDefaultFunctions = () => {
    if(functionsHeck.length < functionsInfo.length)
      setFunctionsHeck(num => [...num, []]);
  }

  for(let i = 0; i < functionsInfo.length; i++) {
    addDefaultFunctions();
  } 

  const addFunctions = (event) => {
    var newFunctions = [...functionsHeck];
    
    newFunctions[event.target.id-1][event.target.className] = event.target.value
    
    setFunctionsHeck(newFunctions);
    console.log(functionsHeck);
  }

  const addCount = (functions) => {
    var newNum = [...numOfAdds];

    newNum[functions.id-1]+=1;

    setNumOfAdds(newNum);
  }

  const removeCount = (event) => {
    var newNum = [...numOfAdds];

    if(newNum[event.target.id-1] > 1) 
      newNum[event.target.id-1]-=1;

      var newFunctions = [...functionsHeck];

      newFunctions[event.target.id].shift();
  
      setFunctionsHeck(newFunctions);
      console.log(functionsHeck);

    setNumOfAdds(newNum);
  }

  const createInput = (functions) => {
    var inputs = [];
    let i = 0;
    for(; i < numOfAdds[functions.id-1]; i++) {
      inputs.push(<>
        <input id={functions.id} className={i} type="text" onChange={addFunctions}></input>
        </>);
    }
    inputs.push(
      <div style={{display: "flex", marginLeft: 5, gap: 10}}>
        <div className="buttonFunction" style={{backgroundColor: "rgb(107, 107, 255)", boxShadow: "1px 1px 0px 0px rgb(28, 28, 163)"}} onClick={() => addCount(functions)}>Add</div>
        <div id={functions.id} className="buttonFunction" style={{backgroundColor: "rgb(28, 28, 163)", boxShadow: "1px 1px 0px 0px rgb(157, 157, 255)"}} onClick={removeCount}>Remove</div>
      </div>
    )
    return inputs;
  }

  const setCount = (event) => {
    setGlobalCount(event.target.value);
    console.log(globalCount);
  }

  const generateRandomIdeas = () => {
    document.getElementById("generatedIdeas").innerHTML="";
    var ideas=[];
    addIdea(ideas, "", 0, 0);

    for(let i = 0; i < ideas.length; i++) 
      document.getElementById("generatedIdeas").innerHTML+="<p>" + ideas[i] + "</p>";
    
    document.getElementById("ideaCount").innerHTML=ideas.length;
    
  }

  const addIdea = (ideas, ideaName, index, secondIndex) => {


    if(index>=functionsHeck.length) {
      ideas.push(ideaName);
      return;
    }

    if(secondIndex >= functionsHeck[index].length)
      return;
    
    let ideaNameNew = ideaName + functionsHeck[index][secondIndex] + " &nbsp;|&nbsp; ";

    let indexOne = index+1;
    let secondIndexOne = secondIndex+1;

    addIdea(ideas, ideaNameNew, indexOne, 0);
    addIdea(ideas, ideaName, index, secondIndexOne);

  }



  return (
    <div className="main">
      <h1>Polymorphism Idea Generator</h1>
      <h2>Input Ideas Here!</h2>
      <form>
        {functionsInfo.map((functions) => {
          return (
            <div className="container">
              <label>{functions.function}</label>
              <br/>
              {createInput(functions)}
              
              
              <br/>
            </div>
          )
        })}
        <div className="container">
              <label>Number of Ideas Wanted</label>
              <br/>
              <input type="text" onChange={setCount}></input>
              <br/>
            </div>
      </form>
      <div className="generateButton" onClick={() => generateRandomIdeas()}>Generate Ideas Now!</div>
      <hr/>
      <br/>

      <h2>Generated Ideas</h2>
      <h3>Count: <span id="ideaCount"></span></h3>
      <div id="generatedIdeas">

      </div>
    </div>
  );
}

export default App;
