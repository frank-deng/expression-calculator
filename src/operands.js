/*
Priority of all the operands reference the following page:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 */
const OPERAND_ALL={
    '+': {
        binocular: true,
        priority: 14,
        exchangeable: true,
        processor(a,b){
            return a+b;
        }
    },
    '-': {
        binocular: true,
        priority: 14,
        exchangeable: false,
        processor(a,b){
            return a-b;
        }
    },
    '*': {
        binocular: true,
        priority: 15,
        exchangeable: true,
        processor(a,b){
            return a*b;
        }
    },
    '/': {
        binocular: true,
        priority: 15,
        exchangeable: false,
        processor(a,b){
            return a/b;
        }
    },
    '%':{
        binocular: true,
        priority: 15,
        exchangeable: false,
        processor(a,b){
            return a%b;
        }
    },
    '**': {
        binocular: true,
        priority: 16,
        exchangeable: false,
        rightToLeft:true,
        processor(a,b){
            return a**b;
        }
    },
    '&':{
        binocular: true,
        priority: 10,
        exchangeable: true,
        bitwise:true,
        processor(a,b){
            return a&b;
        }
    },
    '|':{
        binocular: true,
        priority: 8,
        exchangeable: true,
        bitwise:true,
        processor(a,b){
            return a|b;
        }
    },
    '^':{
        binocular: true,
        priority: 9,
        exchangeable: true,
        bitwise:true,
        processor(a,b){
            return a^b;
        }
    },
    '~':{
        binocular: false,
        priority: 17,
        bitwise:true,
        processor(a){
            return ~a;
        }
    },
    'NEG': {
        match:false,
        binocular: false,
        priority: 17,
        processor(a){
            return -a;
        }
    },
};
let operandAll=['(',')'];
for(let oper in OPERAND_ALL){
    let operDetail=OPERAND_ALL[oper];
    if(false===operDetail.match){
        continue;
    }
    operandAll.push(oper);
}
operandAll.sort((a,b)=>(b.length-a.length));
let operandRegexp=operandAll.map((item)=>item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
export const OPERAND_MATCHER=new RegExp('^('+operandRegexp.join('|')+')');
export default OPERAND_ALL;
