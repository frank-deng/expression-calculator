import {
    NUM,
    VAR,
    OPER
} from './types';
import OPERAND_ALL from './operands';
import LexParser from './lex';

export default class SyntaxChecker extends LexParser{
	static syntaxTable={
		'START':{
			'N':true,
			'S':true,
			'(':true
		},
		'N':{
			'B':true,
			')':true,
			'END':true
		},
		'S':{
			'N':true,
			'(':true
		},
		'B':{
			'N':true,
			'(':true,
			'S':true
		},
		'(':{
			'S':true,
			'N':true,
			'(':true
		},
		')':{
			')':true,
			'B':true,
			'END':true
		},
	};
	//上一个token在下表中，且当前token为减号操作符，则将其转换为单目取负数操作
	static lastTokenNEGConv={
		'START':true,
		'(':true,
		'B':true,
		'S':true
	}
	static getTokenType(token){
		if(!token){
			return 'START';
		}
		if (token.type == NUM || token.type == VAR) {
			return 'N';
		} else if (token.type == OPER) {
			if (token.value == '(') {
				return '(';
			} else if (token.value == ')') {
				return ')';
			} else if (OPERAND_ALL[token.value].binocular) {
				return 'B';
			} else {
				return 'S';
			}
		}
		return null;
	}
	constructor(input){
		super(input);
        this.__reset();
	}
    [Symbol.iterator](){
        return this;
    }
    __reset(){
        Object.assign(this,{
            __lastToken:null,
            __lastTokenType:'START',
            __bracketDepth:0
        });
    }
	next(){
        const syntaxTable=SyntaxChecker.syntaxTable;
        try{
            //获取下一个token
            let {done,value}=super.next();
            let pos=super.getPos(),
                token=null,
                tokenType=null;
            
            //处理当前token，包括结束符
            if(done){
                tokenType='END';
            }else{
                pos-=value.value.length;
                token={...value};
                //Negative operand conversion
                if(OPER==token.type && '-'==token.value && SyntaxChecker.lastTokenNEGConv[this.__lastTokenType]){
                    //Minus sign cannot follow a minus sign
                    let lastToken=this.__lastToken;
                    if(lastToken && OPER==lastToken.type && ('NEG'==lastToken.value || '-'==lastToken.value)){
                        throw new SyntaxError(`Invalid input at position ${pos}`);
                    }
                    token.value='NEG';
                }
                tokenType=SyntaxChecker.getTokenType(token);
            }

            //LL(1) syntax checking
            if(!syntaxTable[this.__lastTokenType] || !syntaxTable[this.__lastTokenType][tokenType]){
                throw new SyntaxError(`Invalid input at position ${pos}`);
            }

            //Bracket check
            switch(tokenType){
                case '(':
                    this.__bracketDepth++;
                break;
                case ')':
                    this.__bracketDepth--;
                break;
                case 'END':
                    if(this.__bracketDepth){
                        throw new SyntaxError(`Bracket mismatch`);
                    }
                break;
            }

            if('END'==tokenType){
                this.__reset();
                return{
                    done:true
                };
            }

            this.__lastToken=token;
            this.__lastTokenType=tokenType;
            //Yeild value for next step
            return{
                done:false,
                value:token
            }
        }catch(e){
            try{
                this.__reset();
            }catch(e){
                console.error(e);
            }
            throw(e);
        }
	}
}
