import assert from 'assert';
import exprgen from './exprgen';
import RPN from './rpn';

describe('Random expression test',function(){
    let times=40;
    while(times--){
        (function(expr){
            it(expr,function(){
                let myResult=new RPN(expr).calc(), jsResult=new Function(`return ${expr}`)();
                assert.strictEqual(myResult, jsResult);
            });
        })(exprgen());
    }
});
