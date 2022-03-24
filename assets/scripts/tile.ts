
import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

import {singleTon} from "./singleTon";

@ccclass('tile')
export class tile extends Component {

    @property({type:SpriteFrame})
    cross:SpriteFrame;
    @property({type:SpriteFrame})
    zero:SpriteFrame;
    @property({type:SpriteFrame})
    red:SpriteFrame
    @property({type:Node})
    background:Node
    @property(Node)
    sign : Node;

    singleTonInstance:singleTon=singleTon.getInstance();

    start() 
    {
        // [3]
    }
    tileClicked(turn:Boolean)
    {   
        this.toggleActive();
        if(this.singleTonInstance.getTurn())
        {
            this.sign.getComponent(Sprite).spriteFrame = this.zero;
            this.singleTonInstance.changeTurn();
            return 0;
        }
        else
        {
            this.sign.getComponent(Sprite).spriteFrame = this.cross;
            this.singleTonInstance.changeTurn();
            return 1;
        }
    }
    onColorChange(){
        this.toggleActive()
        this.background.getComponent(Sprite).spriteFrame=this.red;
    }
    toggleActive(){
        this.sign.active=!this.sign.active;
    }   
}