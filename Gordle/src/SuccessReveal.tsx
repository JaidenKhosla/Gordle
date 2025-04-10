interface Props {
    manager: WordManager,
    foo: boolean
}

import "./stylesheets/SuccessReveal.css";
import { WordManager } from "./WordManager";
import { useState } from "react";

export default function SuccessReveal({ manager, foo }: Props){
    
    const [ useManager ] = useState(manager);
    console.log(useManager, foo);
    if(!foo) return;
    return <div className="suc-container">
        {useManager.WORD}
    </div>
}

