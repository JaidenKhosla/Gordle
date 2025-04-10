
import "./stylesheets/Table.css"
import { WordManager } from "./WordManager";
import { find } from "./wordList";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
    manager : WordManager,
    rerouteFunction(): WordManager
}

export type Status = "grey" | "green" | "yellow";


export interface GridNode {
    text: string,
    status: Status,
    active: boolean
}




export default function Table({ manager, rerouteFunction }: Props)
{

    const [ useManager, setManager ] = useState(manager)
    const [ useInput, setInput ] = useState("");
    useEffect(()=>{
        setManager(manager);

    }, [manager]);

    function onChange(event: ChangeEvent<HTMLInputElement>){
        if(manager.COMPLETED) return;
        const newInput = event.target.value.toUpperCase();
        if(useInput.length < useManager.GRID[0].length && (/^[a-zA-Z]*$/).test(newInput) || newInput.length < useInput.length) setInput(newInput);
    }

    
    function submit(){
        const value = useInput;
        if(value.length != useManager.GRID[0].length || !find(value)) return;

        // console.log(useManager);

        setInput("");
        if(manager.COMPLETED) return;
        console.log(useManager);
        useManager.validateBoard(value);
        setManager(rerouteFunction());
        console.log(useManager);
    }

    function keyDowwn(ev:React.KeyboardEvent<HTMLInputElement>): void{
        if(["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(ev.key))
            ev.preventDefault();
        else if(ev.key == "Enter")
            submit();
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
        <input type="text" className="wordInput" value={useInput} onChange={onChange} onKeyDown={keyDowwn} autoFocus placeholder="Enter your word!" spellCheck={false}/>
        <button className="submit" onClick={submit}>Submit</button>
    </div>
    </div>;
}
