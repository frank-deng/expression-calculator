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
	it('RPN compress',function(){
		assert.deepStrictEqual(new RPN('1*1+2*(3-4)').compress().getRPN(),[
            {type:NUM, value:-1},
        ]);
    });
	it('RPN with variable',function(){
		assert.deepStrictEqual(new RPN('(a+3)*2-1').getRPN(),[
            {type:VAR, value:'a'},
            {type:NUM, value:3},
            {type:OPER, value:'+'},
            {type:NUM, value:2},
            {type:OPER, value:'*'},
            {type:NUM, value:1},
            {type:OPER, value:'-'},
        ]);
    });
	it('RPN with variable calculation',function(){
		assert.deepStrictEqual(new RPN('(a+3)*2-1*8').calc({a:666}),(666+3)*2-1*8);
    });
	it('RPN with variable calculation but without value specified',function(){
		assert.throws(()=>new RPN('(TEST+3)*2-1').calc(),
            new ReferenceError('Value of variable TEST not specified.'));
    });
	it('RPN with variable compression',function(){
		assert.deepStrictEqual(new RPN('(a+3)*2-1*8').getRPN(),[
            {type:VAR, value:'a'},
            {type:NUM, value:3},
            {type:OPER, value:'+'},
            {type:NUM, value:2},
            {type:OPER, value:'*'},
            {type:NUM, value:1},
            {type:NUM, value:8},
            {type:OPER, value:'*'},
            {type:OPER, value:'-'},
        ]);
		assert.deepStrictEqual(new RPN('(a+3)*2-1*8').compress().getRPN(),[
            {type:VAR, value:'a'},
            {type:NUM, value:3},
            {type:OPER, value:'+'},
            {type:NUM, value:2},
            {type:OPER, value:'*'},
            {type:NUM, value:8},
            {type:OPER, value:'-'},
        ]);
    });
});
