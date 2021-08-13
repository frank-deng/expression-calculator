import assert from 'assert';
import {
    NUM,
    VAR,
    OPER
} from './types';
import SyntaxChecker from './syntax';

describe('Syntax Checker Test',function(){
	it('1+1',function(){
		assert.deepStrictEqual([
            ...new SyntaxChecker('1+1')
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
	it('多次读取',function(){
        let checker=new SyntaxChecker('1+1');
		assert.deepStrictEqual([
            ...checker
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
		assert.deepStrictEqual([
            ...checker
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('1 + 1',function(){
        assert.deepStrictEqual([
            ...new SyntaxChecker('1 + 1')
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('  a *   b+1 ',function(){
        assert.deepStrictEqual([
            ...new SyntaxChecker('  a *   b+1 ')
        ],[
            {type:VAR,value:"a"},
            {type:OPER,value:'*'},
            {type:VAR,value:"b"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('0x43 + 0.234 - 1334.3244 * 2e-32 / 0.3e+12 + 1',function(){
        assert.deepStrictEqual([
            ...new SyntaxChecker('0x43 + 0.234 - 1334.3244 * 2e-32 / 0.3e+12 + 1')
        ],[
            {type:NUM,value:"0x43"},
            {type:OPER,value:'+'},
            {type:NUM,value:"0.234"},
            {type:OPER,value:'-'},
            {type:NUM,value:"1334.3244"},
            {type:OPER,value:'*'},
            {type:NUM,value:"2e-32"},
            {type:OPER,value:'/'},
            {type:NUM,value:"0.3e+12"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('数字1+数字2',function(){
        assert.deepStrictEqual([
            ...new SyntaxChecker('数字1+数字2')
        ],[
            {type:VAR,value:"数字1"},
            {type:OPER,value:'+'},
            {type:VAR,value:"数字2"}
        ]);
    });
    it('数字1 ** 数字2',function(){
        assert.deepStrictEqual([
            ...new SyntaxChecker('数字1 ** 数字2')
        ],[
            {type:VAR,value:"数字1"},
            {type:OPER,value:'**'},
            {type:VAR,value:"数字2"}
        ]);
    });
    it('1$1',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('1$1')
        ],new SyntaxError('Unexpected Character at position 1'));
    });
    it('!12',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('!12')
        ],new SyntaxError('Unexpected Character at position 0'));
    });
    it('   1   +   1   !',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('   1   +   1   !')
        ],new SyntaxError('Unexpected Character at position 15'));
    });
    it('23.43.23',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('23.43.23')
        ],new SyntaxError('Unexpected Character at position 5'));
    });
    it('-1+-1',function(){
        assert.deepStrictEqual([
            ...new SyntaxChecker('-1+-1')
        ],[
            {type:OPER,value:"NEG"},
            {type:NUM,value:"1"},
            {type:OPER,value:"+"},
            {type:OPER,value:"NEG"},
            {type:NUM,value:"1"}
        ]);
    });
});

describe('Syntax Error Test',function(){
    it('--1',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('--1')
        ],new SyntaxError('Invalid input at position 1'));
    });
    it('---1',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('---1')
        ],new SyntaxError('Invalid input at position 1'));
    });
    it('-+-1',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('-+-1')
        ],new SyntaxError('Invalid input at position 1'));
    });
    it('-1+--1',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('-1+--1')
        ],new SyntaxError('Invalid input at position 4'));
    });
    it('((1+2)',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('((1+2)')
        ],new SyntaxError('Bracket mismatch'));
    });
    it('(1+2))',function(){
        assert.throws(()=>[
            ...new SyntaxChecker('(1+2))')
        ],new SyntaxError('Bracket mismatch'));
    });
});
