import SyntaxChecker from './syntax';
import OPERAND_ALL, { OPERAND_MATCHER } from './operands';

const syntaxTable=SyntaxChecker.syntaxTable;
let operandListB=[], operandListS=[];
for(let key in OPERAND_ALL){
    let operand=OPERAND_ALL[key];
    if(false===operand.match || operand.bitwise){
        continue;
    }
    if(operand.binocular){
        operandListB.push(key);
    }else{
        operandListS.push(key);
    }
}
function randomPickArray(arr=[]){
    if(!Array.isArray(arr) || !arr.length){
        return undefined;
    }
    if(1==arr.length){
        return arr[0];
    }
    return arr[Math.floor(Math.random()*arr.length)];
}
export default function(recommendLen=20, maxNum=40){
    let token='START', lastValue=null, result=[], bracket=0;
    while(true){
        let nextTokenAvail=syntaxTable[token];
        //当超出建议长度时，只要有机会就强制切换到END token，以结束表达式生成
        if(result.length>recommendLen && nextTokenAvail['END']){
            break;
        }else{
            token=randomPickArray(Object.keys(nextTokenAvail).filter(item=>('END'!=item)));
        }
        if('END'===token){
            break;
        }

        let tokenValue=null;
        switch(token){
            case 'N':
                tokenValue=(Math.random()*maxNum).toFixed(Math.floor(Math.random()*8));
            break;
            case 'B':
                if('-'==lastValue){
                    tokenValue=randomPickArray(operandListB.filter(item=>('-'!=item)));
                }else{
                    tokenValue=randomPickArray(operandListB);
                }
            break;
            case 'S':
                if('-'==lastValue){
                    tokenValue=randomPickArray(operandListS.filter(item=>('-'!=item)));
                }else{
                    tokenValue=randomPickArray(operandListS);
                }
            break;
            case '(':
                bracket++;
                tokenValue='(';
            break;
            case ')':
                if(bracket>0){
                    bracket--;
                    tokenValue=')';
                }
            break;
        }
        if(tokenValue){
            lastValue=tokenValue;
            result.push(tokenValue);
        }
    }
    while(bracket--){
        result.push(')');
    }
    return result.join('');
}
