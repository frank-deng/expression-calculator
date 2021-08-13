const OPERAND_ALL={
    '+': {
        binocular: true,
        priority: 10,
        exchangeable: true,
        processor(a,b){
            return a+b;
        }
    },
    '-': {
        binocular: true,
        priority: 10,
        exchangeable: false,
        processor(a,b){
            return a-b;
        }
    },
    '*': {
        binocular: true,
        priority: 20,
        exchangeable: true,
        processor(a,b){
            return a*b;
        }
    },
    '/': {
        binocular: true,
        priority: 20,
        exchangeable: false,
        processor(a,b){
            return a/b;
        }
    },
    '**': {
        binocular: true,
        priority: 30,
        exchangeable: false,
        processor(a,b){
            return a**b;
        }
    },
    '&':{
        binocular: true,
        priority: 8,
        exchangeable: true,
        processor(a,b){
            return a&b;
        }
    },
    '|':{
        binocular: true,
        priority: 8,
        exchangeable: true,
        processor(a,b){
            return a|b;
        }
    },
    '^':{
        binocular: true,
        priority: 8,
        exchangeable: true,
        processor(a,b){
            return a^b;
        }
    },
    '~':{
        binocular: false,
        priority: 9,
        processor(a){
            return ~a;
        }
    },
    'NEG': {
        match:false,
        binocular: false,
        priority: 50,
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
