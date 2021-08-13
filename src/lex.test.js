import assert from 'assert';
import {
    NUM,
    VAR,
    OPER
} from './types';
import lex from './lex';

describe('lex test',function(){
	it('1+1',function(){
		assert.deepStrictEqual([
            ...lex('1+1')
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('1 + 1',function(){
        assert.deepStrictEqual([
            ...lex('1 + 1')
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('  a *   b+1 ',function(){
        assert.deepStrictEqual([
            ...lex('  a *   b+1 ')
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
            ...lex('0x43 + 0.234 - 1334.3244 * 2e-32 / 0.3e+12 + 1')
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
            ...lex('数字1+数字2')
        ],[
            {type:VAR,value:"数字1"},
            {type:OPER,value:'+'},
            {type:VAR,value:"数字2"}
        ]);
    });
    it('数字1 ** 数字2',function(){
        assert.deepStrictEqual([
            ...lex('数字1 ** 数字2')
        ],[
            {type:VAR,value:"数字1"},
            {type:OPER,value:'**'},
            {type:VAR,value:"数字2"}
        ]);
    });
    it('1$1',function(){
        assert.throws(()=>[
            ...lex('1$1')
        ],new SyntaxError('Unexpected Character at position 1'));
    });
    it('!12',function(){
        assert.throws(()=>[
            ...lex('!12')
        ],new SyntaxError('Unexpected Character at position 0'));
    });
    it('   1   +   1   !',function(){
        assert.throws(()=>[
            ...lex('   1   +   1   !')
        ],new SyntaxError('Unexpected Character at position 15'));
    });
    it('23.43.23',function(){
        assert.throws(()=>[
            ...lex('23.43.23')
        ],new SyntaxError('Unexpected Character at position 5'));
    });
});
