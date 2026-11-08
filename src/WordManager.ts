import { GridNode } from "./Table";
import {generateRandomWord} from "./wordList";

const gridLength: number = 5;

class WordManager{
    WORD: string;
    GRID: Array<Array<GridNode>>;
    COMPLETED: boolean = false;
    currRow: number = 0;
    freqCount: Map<string, number>
    // currCol: number = 0;

    constructor(WORD: string=generateRandomWord(), GRID: Array<Array<GridNode>>=[], COMPLETED: boolean=false, currRow: number=0){
        this.WORD = WORD.toUpperCase();
        this.GRID = GRID;
        if(this.GRID.length==0) this.generateBlank();
        this.COMPLETED = COMPLETED;
        this.currRow = currRow;

        this.freqCount = new Map<string, number>();

        for(const c of this.WORD.split(""))
        {   
            this.freqCount.set(c, (this.freqCount.get(c) ?? 0)+1);
        }
    }

    generateBlank = () => {
        for(let i = 0; i < gridLength; i++){
            this.GRID[i] = [];
            for(let j = 0; j<gridLength; j++)
              this.GRID[i].push({text: " ", status: "grey", active: false});
          }
    }

    validateBoard(word: string): void  {
        if(this.currRow < gridLength) this.GRID[this.currRow++] = this.checkWord(word.toUpperCase());
        if(this.currRow>=gridLength) this.COMPLETED = true;
    }

    checkWord(word: string): Array<GridNode> {

        const checkMap = new Map<string, number>();

        for(let i = 0; i < this.WORD.length; i++)
            checkMap.set(word.charAt(i), (checkMap.get(word.charAt(i)) ?? 0)+1);

        const arr : Array<GridNode> = [];
        let amtRight: number = 0;

    
        for(let i = 0; i < this.WORD.length; i++){


            const node : GridNode = {
                text: word.charAt(i),
                status: "grey",
                active: true
            }
    
            if(word.charAt(i) == this.WORD.charAt(i)){ node.status = "green"; amtRight++;}
            else if(this.WORD.indexOf(word.charAt(i)) != -1 && (checkMap.get(word.charAt(i))||0) <= (this.freqCount.get(word.charAt(i))||0)) node.status = "yellow";
            
            arr.push(node);
        }
        if(amtRight == this.WORD.length) this.COMPLETED = true;
        return arr;
    }

    reroute(): WordManager
    {
        return new WordManager(this.WORD, this.GRID, this.COMPLETED, this.currRow);
    }
    


}

export {WordManager};