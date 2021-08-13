import assert from 'assert';
import {
    NUM,
    VAR,
    OPER
} from './types';
import RPN from './rpn';

describe('Basic RPN test',function(){
	it('Calculate 1+1',function(){
		assert.strictEqual(new RPN('1+1').calc(),2);
    });
	it('RPN of 1+1',function(){
		assert.deepStrictEqual(new RPN('1+1').getRPN(),[
            {type:NUM, value:1},
            {type:NUM, value:1},
            {type:OPER, value:'+'},
        ]);
    });
	it('Calculate 1+2*(3-4)',function(){
		assert.strictEqual(new RPN('1+2*(3-4)').calc(),-1);
    });
	it('RPN of 1+2*(3-4)',function(){
		assert.deepStrictEqual(new RPN('1+2*(3-4)').getRPN(),[
            {type:NUM, value:1},
            {type:NUM, value:2},
            {type:NUM, value:3},
            {type:NUM, value:4},
            {type:OPER, value:'-'},
            {type:OPER, value:'*'},
            {type:OPER, value:'+'},
        ]);
    });
	it('Calculate 1*1+2*(3-4)',function(){
		assert.strictEqual(new RPN('1*1+2*(3-4)').calc(),-1);
    });
	it('RPN of 1*1+2*(3-4)',function(){
		assert.deepStrictEqual(new RPN('1*1+2*(3-4)').getRPN(),[
            {type:NUM, value:1},
            {type:NUM, value:1},
            {type:OPER, value:'*'},
            {type:NUM, value:2},
            {type:NUM, value:3},
            {type:NUM, value:4},
            {type:OPER, value:'-'},
            {type:OPER, value:'*'},
            {type:OPER, value:'+'},
        ]);
    });
});