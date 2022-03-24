export class singleTon{
    private static _instance:singleTon = new singleTon();
    private _checkArray:any[]=[];
    private _turn:boolean=true;
    constructor() {
        if(singleTon._instance){
            throw new Error("Error: Instantiation failed: Use singleTon.getInstance() instead of new.");
        }
        singleTon._instance = this;
    }
    public static getInstance():singleTon
    {
        return singleTon._instance;
    }
    public initializeCheckArray(n:number){
        for(let i=0;i<n;i++){
            let temp:number[]=new Array(n).fill(-1,0,n);
            this._checkArray.push(temp);
        }
    }
    public getTurn(){
        return this._turn;
    }
    public changeTurn(){
        this._turn=!this._turn
    }
    public turnOutcome(row:number,column:number,fillNumber:number){
        this._checkArray[row][column]=fillNumber;
    }
    public checkWinner(){
        let winner:number=0;
        let zeroFlag:number=0;
        let oneFlag:number=0;
        for(let row=0;row<this._checkArray.length;row++){
            for(let column=0;column<this._checkArray.length;column++){
                if(this._checkArray[row][column]==0){
                    if(oneFlag!=0){
                        break;
                    }
                    zeroFlag++;
                }
                else if(this._checkArray[row][column]==1){
                    if(zeroFlag!=0){
                        break;
                    }
                    oneFlag++;
                }
            }
            if(zeroFlag==this._checkArray.length){
                winner=1;
                return([winner,row,"horizontal"]);
            }
            else if(oneFlag==this._checkArray.length){
                winner=2;
                return([winner,row,"horizontal"]);
            }
            zeroFlag=0;
            oneFlag=0;
            for(let column=0;column<this._checkArray.length;column++){
                if(this._checkArray[column][row]==0){
                    if(oneFlag!=0){
                        break;
                    }
                    zeroFlag++;
                }
                else if(this._checkArray[column][row]==1){
                    if(zeroFlag!=0){
                        break;
                    }
                    oneFlag++;
                }
            }
            if(zeroFlag==this._checkArray.length){
                winner=1;
                return([winner,row,"vertical"]);
            }
            else if(oneFlag==this._checkArray.length){
                winner=2;
                return([winner,row,"vertical"]);
            }
            zeroFlag=0;
            oneFlag=0;
        }
        for(let i=0;i<this._checkArray.length;i++){
            if(this._checkArray[i][i]==0){
                if(oneFlag!=0){
                    break;
                }
                zeroFlag++;
            }
            else if(this._checkArray[i][i]==1){
                if(zeroFlag!=0){
                    break;
                }
                oneFlag++;
            }
        }
        if(zeroFlag==this._checkArray.length){
            winner=1;
            return([winner,0,"left-diagonal"])
        }
        else if(oneFlag==this._checkArray.length){
            winner=2;
            return([winner,0,"left-diagonal"])
        }
        zeroFlag=0;
        oneFlag=0;
        for(let i=0;i<this._checkArray.length;i++){
            if(this._checkArray[i][this._checkArray.length-1-i]==0){
                if(oneFlag!=0){
                    break;
                }
                zeroFlag++;
            }
            else if(this._checkArray[i][this._checkArray.length-1-i]==1){
                if(zeroFlag!=0){
                    break;
                }
                oneFlag++;
            }
        }
        if(zeroFlag==this._checkArray.length){
            winner=1;
            return([winner,0,"right-diagonal"])
        }
        else if(oneFlag==this._checkArray.length){
            winner=2;
            return([winner,0,"right-diagonal"])
        }
    return [winner];
    }
}