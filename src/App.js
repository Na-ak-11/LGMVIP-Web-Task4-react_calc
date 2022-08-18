import React,{ useState } from 'react';
import './App.css'

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = [ '/', '*', '-', '+'];
const ids = {
              7: 'seven', 
              8: 'eight', 
              9: 'nine', 
              4: 'four', 
              5: 'five', 
              6: 'six', 
              1: 'one', 
              2: 'two', 
              3: 'three', 
              0: 'zero',
              '/': 'divide', 
              '*': 'multiply', 
              '-': 'subtract', 
              '+': 'add'
            }

const App = () => {
  const [lastPressed,setLastPressed] = useState(undefined);
  const [calc, setCalc] = useState('0');

  const handleClick = (e) => {
    const { innerText } = e.target;

    switch (innerText) {
      case 'Clear': {
        setCalc('0');
        break;
      }

      case '=': {
        const evaluated = eval(calc);
        console.log(evaluated)
        setCalc(evaluated);
        break;
      }

      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];
        if(!last.includes('.')) {
            setCalc(calc +'.')
        }
        break;
      }

      default: {
        let e = undefined;
       
        if(ops.includes(innerText)) {
          if(ops.includes(lastPressed) && innerText !== '-') {
         
            const lastNumberIdx = calc.split('').reverse()
            .findIndex(char => char !== ' ' && nums.includes(+char)); 
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          } 
        }else {
          e = (calc === '0') ? innerText : (calc + innerText);
        }
        
        setCalc(e);
        break;
      }
    }

    setLastPressed(innerText);
  }

  return (
    <div className="calculator">
      <div id="display" className="display">
        
        {calc}
      </div>

      <div className="nums-container">
        <button className="clear" id="clear" onClick={handleClick}>Clear</button>

        {nums.map(num => (
          <button
            className={`numbers ${num === 0 && 'zero'}`}
            key={num}
            onClick={handleClick}
            id={ids[num]}
          >
            {num}
          </button>
        ))}

        <button  className="numbers" onClick={handleClick} id="decimal"> .</button>
        </div>

      <div className="operators_container">
        {ops.map(op =>(
          <button 
            className="operators"
            key={op}
            onClick={handleClick}
            id={ids[op]}
          >
            {op}
          </button>
        ))}

        <button className="equals" onClick={handleClick} id="equals"> =</button>
      </div>
    </div>
  )
}

export default App