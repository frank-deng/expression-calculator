import Lang from './lang.js';
let lang=null;
try{
    lang=new Lang({
        en:{
            title:'Expression Calculator Test Page',
            'Input expression':'Input expression',
            'Input variables':'Input variables here, format: "varName=value"',
            Calculate:'Calculate',
            calc_ans:'Calculation Answer: '
        },
        zh:{
            title:'表达式计算器测试页面',
            'Input expression':'请输入表达式',
            'Input variables':'每行指定一个变量的值，格式：“变量名=变量值”',
            Calculate:'计算',
            calc_ans:'计算结果：'
        }
    });
    document.title=lang.get('title');
    let placeholderTranslateList=document.querySelectorAll('[placeholder]');
    for(let i=0; i<placeholderTranslateList.length; i++){
        let dom=placeholderTranslateList[i];
        dom.setAttribute('placeholder',lang.get(dom.getAttribute('placeholder')));
    }
    let domTranslateList=document.querySelectorAll('[translate]');
    for(let i=0; i<domTranslateList.length; i++){
        let dom=domTranslateList[i];
        dom.innerHTML=lang.get(dom.getAttribute('translate'));
    }
}catch(e){
    console.error('Failed to load translation',e);
}

const inputForm=document.getElementById('inputForm');
const exprInput=inputForm.querySelector('[name="exprInput"]');
const submitBtn=inputForm.querySelector('[type="submit"]');
const calcResult=document.getElementById('calcResult');
function displayResult(value){
    if(value instanceof Error){
        calcResult.classList.add('error');
        calcResult.innerHTML=value.message;
    }else{
        calcResult.classList.remove('error');
        calcResult.innerHTML=lang.get('calc_ans')+value;
    }
}
function parseVarInput(input){
    if(!input){
        return {};
    }
    let result={};
    for(let item of input.split('\n')){
        if(!item || -1==item.indexOf('=')){
            continue;
        }
        let [key,value]=item.split('=');
        result[key]=value;
    }
    return result;
}
function updateSubmitStatus(){
    let exprInput=inputForm[0].value;
    submitBtn.disabled=!exprInput;
}
exprInput.addEventListener('input',updateSubmitStatus);
exprInput.addEventListener('change',updateSubmitStatus);
exprInput.addEventListener('blur',updateSubmitStatus);
inputForm.addEventListener('submit',function(e){
    e.preventDefault();
    try{
        let calc=new Calc(e.target[0].value);
        let varTable=parseVarInput(e.target[1].value);
        displayResult(calc.calc(varTable));
        return false;
    }catch(e){
        console.error(e);
        displayResult(e);
    }
    return false;
});
