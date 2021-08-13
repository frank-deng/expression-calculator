import {
    NUM,
    VAR,
    OPER
} from './types';
import OPERAND_ALL from './operands';
import SyntaxChecker from "./syntax";

export default class RPN{
    __data=[];
    constructor(input){
        if('string'==typeof(input)){
            this.compile(input);
        }else if(Array.isArray(input) && input.length){
            this.setRPN(input);
        }
    }
    __numConv(numStr){
        if(isNaN(numStr)){
            throw new TypeError('Invalid number format');
        }
        return Number(numStr);
    }
    compile(input){
        let stackMain=[], stackOper=[];
        for(let token of new SyntaxChecker(input)){
            if(NUM==token.type){ 
				token.value = this.__numConv(token.value);
				stackMain.push(token);
			}else if(VAR==token.type){
				stackMain.push(token);
			}else if(OPER==token.type) {
				if (!stackOper.length || token.value == '(') {
					stackOper.push(token);
				} else if (token.value == ')') {
                    let token_pop=null;
					while (token_pop = stackOper.pop()) {
						if (token_pop.value == '(') {
							break;
						}
                        stackMain.push(token_pop);
					}
				} else {
					while (stackOper.length) {
                        let stackOperTop=stackOper[stackOper.length-1].value;
                        if('('==stackOperTop || OPERAND_ALL[stackOperTop].priority < OPERAND_ALL[token.value].priority){
                            break;
                        }
                        stackMain.push(stackOper.pop());
					}
					stackOper.push(token);
				}
			}
        }
        while(stackOper.length){
            stackMain.push(stackOper.pop());
        }
        this.__data=stackMain;
        return this;
    }
    compress(){
        let result=[];
        for(let token of this.__data){
            //非操作符，直接入栈
            if(OPER!=token.type){
                result.push(token);
                continue;
            }
            
			let operand = OPERAND_ALL[token.value];
            if (operand.binocular
				&& result.length > 1
				&& result[result.length-1].type == NUM
				&& result[result.length-2].type == NUM) {
				var b = result.pop().value, a = result.pop().value;
				result.push({
					type: NUM,
					value: operand.processor(a,b),
				});
			} else if (!operand_data.binocular
				&& result.length > 0
				&& result[result.length-1].type == NUM) {
				result.push({
					type: NUM,
					value: operand.processor(operand.pop().value),
				});
			} else {
				result.push(token);
			}
        }
        this.__data=result;
        return this;
    }
    getRPN(){
        return this.__data.map((item)=>({...item}));
    }
    setRPN(input){
        this.__data=input.map((item)=>({
            type:item.type,
            value:item.value
        }));
    }
    calc(valueTable={}){
        if(!this.__data.length){
            return null;
        }
        
        let stack=[];
        for(let token of this.__data){
            if(NUM==token.type){
                stack.push(token.value);
                continue;
            }
            if(VAR==token.type){
                if(!valueTable.hasKey(token.value)){
                    throw new ReferenceError(`Value of variable ${token.value} not specified.`);
                }
                stack.push(this.__numConv(valueTable[token.value]));
                continue;
            }
            if(OPER==token.type){
                let operand = OPERAND_ALL[token.value];
                if(operand.binocular){
					let b = stack.pop(), a = stack.pop();
					stack.push(operand.processor(a,b));
                }else{
					stack.push(operand.processor(stack.pop()));
                }
            }
        }
        if(1!=stack.length){
            throw new SyntaxError('Malformed RPN');
        }
        return stack[0];
    }
}
