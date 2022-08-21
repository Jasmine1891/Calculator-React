import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './App.css';

function App() {
  const [input,setInput]=useState("0");
  const [prestate,setPrestate]=useState("");
  const [curstate,setCurstate]=useState("");
  const [total,setTotal]=useState(false);
  const [operator,setOperator]=useState(null);
  const inputNum=(e)=>{

    if(curstate.includes(".") && e.target.innerText === ".") return;

    if(total) 
    {
    setPrestate("");
   }
    curstate
    ? setCurstate((pre)=>pre+e.target.innerText)
    
    : setCurstate(e.target.innerText);
  };
    useEffect(()=>{
      setInput(curstate);
    },[curstate]);
    useEffect(()=>{
      setInput("0");
    },[]);

    const operatorType=(e)=>{
      setTotal(false);
      setOperator(e.target.innerText);
      if(curstate==="") return;
      if(prestate !=="")
      {
        equal();
      }
      else{
        setPrestate(curstate);
        setCurstate("");
      }
      };
      const equal=(e)=>{
        if(e.target.innerText=== "="){
        setTotal(true)
      }
        let cal;
      switch(operator){
        case "/":
          cal=String(parseFloat(prestate)/parseFloat(curstate));
          break;
        case "+":
          cal=String(parseFloat(prestate) + parseFloat(curstate));
          break;
          case "-":
          cal=String(parseFloat(prestate) - parseFloat(curstate));
          break;
          case "X":
          cal=String(parseFloat(prestate) * parseFloat(curstate));
          break;
          default:return;
    
      }
      setInput("");
      setPrestate(cal);
      setCurstate("");
    }
    const plusOrminus=()=>{
    if(curstate.charAt(0)==="-")
    {
      setCurstate(curstate.substring(1));
    }
    else{
      setCurstate("-"+ curstate);
    }
  };
  const backspace=()=>{
    setInput(input.slice(0,-1));
  };

  const percent=()=>{
    prestate ?
    (setCurstate(String(parseFloat(curstate)/100 * prestate))):
    (setCurstate(String(parseFloat(curstate)/100)));
      };
      const reset=()=>{
        setPrestate("");
        setCurstate("");
        setInput("0");
    
      }; 

  return (
    <div className="container">
      <div className='wrapper'>
      <div className='screen'>{input !=="" || input ==="0" ?
       (<NumberFormat 
       value={input}
       displayType={'text'}
       thousandSeparator={true}/>)
       :(<NumberFormat
          value={prestate}
          displayType={'text'}
          thousandSeparator={true}
       />)}</div>
      <div className='btn light-gray' onClick={reset}>AC</div>
      <div className='btn light-gray' onClick={backspace}>C</div>
      <div className='btn light-gray' onClick={percent}>%</div>
      <div className='btn orange' onClick={plusOrminus}>+/-</div>
      <div className='btn' onClick={inputNum}>7</div>
      <div className='btn' onClick={inputNum}>8</div>
      <div className='btn' onClick={inputNum}>9</div>
      <div className='btn orange' onClick={operatorType}>/</div>
      <div className='btn' onClick={inputNum}>4</div>
      <div className='btn' onClick={inputNum}>5</div>
      <div className='btn' onClick={inputNum}>6</div>
      <div className='btn orange' onClick={operatorType}>X</div>
      <div className='btn' onClick={inputNum}>1</div>
      <div className='btn' onClick={inputNum}>2</div>
      <div className='btn' onClick={inputNum}>3</div>
      <div className='btn orange' onClick={operatorType}>+</div>
      <div className='btn zero' onClick={inputNum}>0</div>
      <div className='btn' onClick={inputNum}>.</div>
      <div className='btn' onClick={equal}>=</div>
      <div className='btn orange' onClick={operatorType}>-</div>
      </div>
    </div>
  );
}

export default App;
