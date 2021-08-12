import {
    NUM,
    VAR,
    OPER
} from './types';
class LexParser{
    constructor(input){
        this.__input=input;
        this.__pos=0;
    }
    [Symbol.iterator](){
        return this;
    }
    __proc(input){
        const lexTable=[
            {
                rule:/^0x[0-9A-Fa-f]+/g,
                type:NUM
            },
            {
                rule:/^[0-9]+(\.[0-9]+)?([Ee][+\-][0-9]+)?/g,
                type:NUM
            },
            {
                rule:/^[+\-\*\/\(\)]/g,
                type:OPER
            },
            {
                rule:/^[A-Za-z_\u0080-\uffff][A-Za-z0-9_\u0080-\uffff]*/g,
                type:VAR
            },
            {
                rule:/^\s+/g,
                type:null
            },
        ];
        for (let lex of lexTable) {
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
        //Parsing finished
        return {
            done:true
        };
    }
}
export default function lex(input){
    return new LexParser(input);
}
