const inputForm=document.getElementById('inputForm');
const exprInput=inputForm.querySelector('[name="exprInput"]');
const submitBtn=inputForm.querySelector('[type="submit"]');
const errorInfo=document.getElementById('errorInfo');
const calcResult=document.getElementById('calcResult');
const calcResultNum=document.getElementById('calcResultNum');
function displayResult(value){
    calcResult.style.display='block';
    calcResultNum.innerHTML=value;
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
        calcResult.style.display='none';
        errorInfo.style.display='none';
        let calc=new Calc(e.target[0].value);
        let varTable=parseVarInput(e.target[1].value);
        displayResult(calc.calc(varTable));
        return false;
    }catch(e){
        console.error(e);
        errorInfo.style.display='block';
        errorInfo.innerHTML=e.message;
    }
    return false;
});
