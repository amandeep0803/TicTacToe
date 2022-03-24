
import { _decorator, Component, Node, Texture2D, SpriteFrame, Sprite, Prefab, instantiate, UITransform, EventMouse, EditBox, Script } from 'cc';
const { ccclass, property } = _decorator;
import {singleTon} from "./singleTon";
 
@ccclass('demo')
export class demo extends Component 
{
    @property({type:Prefab})
    card:Prefab;
    cardNode:any[]=[];
    n:number=4;
    singleTonInstance:singleTon=singleTon.getInstance();
    start () 
    { 
        this.node.active=false;
        
    }
    selectionMenuButtonClicked(){
        let selectionMenu:Node=this.node.parent.getChildByName('selectionMenu');
        console.log(selectionMenu);
        this.n=parseInt(selectionMenu.getChildByName('ValueOfN').getComponent(EditBox).string);
        selectionMenu.active=false;
        this.node.active=true;
        this.mainBg();
    }
    mainBg(){
        let parentWidth:number=this.node.getComponent(UITransform).width;
        let parentHeight:number=this.node.getComponent(UITransform).height;
        this.card.data.width=parentWidth/this.n;
        this.card.data.height=parentHeight/this.n;
        let cardWidth  : number = this.card.data.width;
        let cardHeight : number = this.card.data.height;
        this.card.data._children.forEach((e:any)=>{
            e.getComponent(UITransform).width=cardWidth*0.85;
            e.getComponent(UITransform).height = cardHeight*0.85;
        })
        let x : number = -(parentWidth/2-cardWidth/2),y : number = parentHeight/2-cardHeight/2;
        let tempNode : Node;
        this.singleTonInstance.initializeCheckArray(this.n);
        for(let i=0;i<this.n;i++)
        {
            let tempArr:any[]=[];
            for(let j=0;j<this.n;j++)
            {
                tempNode = instantiate(this.card);
                this.node.addChild(tempNode);
                tempNode.on(Node.EventType.MOUSE_DOWN,this.btnClicked,this)
                tempNode.name=i+" "+j;
                tempNode.children[1].active=false;
                tempArr.push(tempNode);
                tempArr[j].setPosition(x,y,0);
                x+=cardWidth;    
            }
            this.cardNode.push(tempArr);
            y-=cardHeight;
            x=-(parentWidth/2-cardWidth/2);
        } 
    }
    btnClicked(event:EventMouse)
    {
        
        let outcome=event.target.getComponent('tile').tileClicked();
        let index:number[]=event.target.name.split(" ");
        this.singleTonInstance.turnOutcome(index[0],index[1],outcome);
        event.target.off(Node.EventType.MOUSE_DOWN,this.btnClicked,this);
        let winner=this.singleTonInstance.checkWinner();
        if(winner[0]){
            for(let row=0;row<this.cardNode.length;row++){
                for(let column=0;column<this.cardNode.length;column++){
                    this.cardNode[row][column].off(Node.EventType.MOUSE_DOWN,this.btnClicked,this);
                    this.cardNode[row][column].getChildByName('oncnas').active=false;
                }
            }
            this.colorFulBG(winner);
            console.log("Winner is ",winner[0]);
        }
    }
    colorFulBG(winner){
        console.log(this.cardNode);
        if(winner[2]=='horizontal'){
            for(let i=0;i<this.cardNode.length;i++){
                this.cardNode[winner[1]][i].getComponent('tile').onColorChange();
            }
        }
        else if(winner[2]=='vertical'){
            for(let i=0;i<this.cardNode.length;i++){
                this.cardNode[i][winner[1]].getComponent('tile').onColorChange();
            }
        }
        else if(winner[2]=='left-diagonal'){
            for(let i=0;i<this.cardNode.length;i++){
                this.cardNode[i][i].getComponent('tile').onColorChange();
            }
        }
        else{
            for(let i=0;i<this.cardNode.length;i++){
                this.cardNode[i][this.cardNode.length-1-i].getComponent('tile').onColorChange();
            }
        }
    }

}
