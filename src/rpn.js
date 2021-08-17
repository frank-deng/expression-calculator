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
        if(input instanceof RPN){
            this.setRPN(input.getRPN());
        }if('string'==typeof(input)){
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
                        let stackOperTop=stackOper[stackOper.length-1].value,
                            operandTop=OPERAND_ALL[stackOperTop],
                            operandCurrent=OPERAND_ALL[token.value];
                        if('('==stackOperTop
                            || operandTop.priority < operandCurrent.priority
                            || (operandTop.rightToLeft && operandCurrent.rightToLeft)){
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
			} else if (!operand.binocular
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
        if(!this.__data.length){
            return null;
        }
        return this.__data.map((item)=>({...item}));
    }
    toJSON(){ //Ailas of getRPN()
        return this.getRPN();
    }
    setRPN(input){
        if(!Array.isArray(input)){
            throw new TypeError('Input must be an array with objects contains key "type" and "value"');
        }
        if(!input.length){
            this.__data=[];
            return this;
        }
        let result=[],stack=0;
        input.forEach((token,i)=>{
            let type, value;
            try{
                type=token.type, value=token.value;
            }catch(e){
                throw new TypeError(`Invalid RPN token at position ${i}`);
            }
            if(VAR===type){
                if('string'!=typeof(value) || !value){
                    throw new TypeError(`Invalid RPN token at position ${i}`);
                }
                stack++;
            }else if(NUM===type){
                try{
                    value=this.__numConv(value);
                }catch(e){
                    throw new TypeError(`Invalid number at position ${i}`);
                }
                stack++;
            }else if(OPER===type){
                let operand=OPERAND_ALL[value];
                if(!operand){
                    throw new TypeError(`Invalid operand at position ${i}`);
                }
                if((!operand.binocular && stack<1)
                    || (operand.binocular && stack<2)){
                    throw new SyntaxError(`Invalid RPN`);
                }
                if(operand.binocular){
                    stack--;
                }
            }else{
                throw new TypeError(`Invalid RPN token at position ${i}`);
            }
            //All the validation for current token passed, write to result.
            result.push({
                type,
                value
            });
        });
        if(1!=stack){
            throw new SyntaxError(`Invalid RPN`);
        }
        this.__data=result;
        return this;
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
                if(!valueTable.hasOwnProperty(token.value)){
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
