
import "./stylesheets/Table.css"
import { WordManager } from "./WordManager";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
    manager : WordManager,
    rerouteFunction: Function
}

export type Status = "grey" | "green" | "yellow";


export interface GridNode {
    text: string,
    status: Status,
    active: boolean
}




export default function manager({ manager, rerouteFunction }: Props)
{

    const [ useManager, setManager ] = useState(manager)
    const [ useInput, setInput ] = useState("");
    useEffect(()=>{
        setManager(manager);

    }, [manager]);

    function onChange(event: ChangeEvent<HTMLInputElement>){
        const newInput = event.target.value.toUpperCase();
        if(useInput.length < useManager.GRID[0].length && (/^[a-zA-Z]*$/).test(newInput) || newInput.length < useInput.length) setInput(newInput);
    }

    
    function submit(){
        const value = useInput;
        if(value.length != useManager.GRID[0].length) return;

        // console.log(useManager);

        setInput("");
        console.log(useManager);
        useManager.validateBoard(value);
        setManager(rerouteFunction());
        console.log(useManager);
    }

    addEventListener("click", ()=>{(document.querySelector(".wordInput") as HTMLInputElement).focus()})
    return <div className="gridContainer"><table>
        <tbody>
            {useManager.GRID.map((row, rowIDX) => {
                return <tr key={rowIDX}>
                    {row.map((el, colIDX)=>{
                        return <td className={`${el.status}`} id={el.active ? "active" : ""} key={`${rowIDX} ${colIDX}`}>{el.text}</td>
                    })}
                </tr>
            })}
        </tbody>
    </table>
    <div className="inputDiv">
        <input type="text" className="wordInput" value={useInput} onChange={onChange} autoFocus placeholder="Enter your word!" spellCheck={false}/>
        <button className="submit" onClick={submit}>Submit</button>
    </div>
    </div>;
}
