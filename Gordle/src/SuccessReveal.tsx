interface Props {
    manager: WordManager
}

import "./stylesheets/SuccessReveal.css";
import { WordManager } from "./WordManager";
import { useState } from "react";

export default function SuccessReveal({ manager }: Props){
    
    const [ useManager, setManager ] = useState(manager);
    console.log(useManager);
    if(!useManager.COMPLETED) return;
    return <div className="suc-container">
        {useManager.WORD}
    </div>
}

