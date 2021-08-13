import {
    NUM,
    VAR,
    OPER
} from './types';
import {
    OPERAND_MATCHER
}from './operands';
export default class LexParser{
    static __lexTable=[
        {
            rule:/^\s+/,
            type:null
        },
        {
            rule:/^0x[0-9A-Fa-f]+/,
            type:NUM
        },
        {
            rule:/^[0-9]+(\.[0-9]+)?([Ee][+\-][0-9]+)?/,
            type:NUM
        },
        {
            rule:OPERAND_MATCHER,
            type:OPER
        },
        {
            rule:/^[A-Za-z_\u0080-\uffff][A-Za-z0-9_\u0080-\uffff]*/,
            type:VAR
        },
    ];
    constructor(input){
        this.__input=this.__inputOrig=input;
        this.__pos=0;
    }
    [Symbol.iterator](){
        return this;
    }
    __proc(input){
        for (let lex of LexParser.__lexTable) {
            let match=lex.rule.exec(input);
            if(!match || 0!=match.index){
                continue;
            }
            return{
                type:lex.type,
                value:match[0]
            };
        }
        //None of the lex rules matched
        return null;
    }
    getPos(){
        return this.__pos;
    }
    next(){
        while(this.__input){
            let lexResult=this.__proc(this.__input);
            if(!lexResult){
                throw new SyntaxError(`Unexpected Character at position ${this.__pos}`);
            }
            let {type,value}=lexResult;
            this.__input=this.__input.slice(value.length);
            this.__pos+=value.length;
            //Rules for ignoring characters
            if(!type){
                continue;
            }
            //yield iteration result
            return{
                done:false,
                value:{
                    type,
                    value
                }
            };
        }
        //Parsing finished, reset state
        this.__input=this.__inputOrig;
        this.__pos=0;
        return {
            done:true
        };
    }
}
