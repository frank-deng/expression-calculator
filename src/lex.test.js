import assert from 'assert';
import {
    NUM,
    VAR,
    OPER
} from './types';
import LexParser from './lex';

describe('lex test',function(){
	it('1+1',function(){
		assert.deepStrictEqual([
            ...new LexParser('1+1')
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
	it('多次读取',function(){
        let parser=new LexParser('1+1');
		assert.deepStrictEqual([
            ...parser
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
		assert.deepStrictEqual([
            ...parser
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('1 + 1',function(){
        assert.deepStrictEqual([
            ...new LexParser('1 + 1')
        ],[
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"}
        ]);
    });
    it('(1 + 1) ** 6',function(){
        assert.deepStrictEqual([
            ...new LexParser('(1 + 1) ** 6')
        ],[
            {type:OPER,value:'('},
            {type:NUM,value:"1"},
            {type:OPER,value:'+'},
            {type:NUM,value:"1"},
            {type:OPER,value:')'},
            {type:OPER,value:'**'},
            {type:NUM,value:"6"},
        ]);
    });
    it('  a *   b+1 ',function(){
        assert.deepStrictEqual([
            ...new LexParser('  a *   b+1 ')
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
            ...new LexParser('0x43 + 0.234 - 1334.3244 * 2e-32 / 0.3e+12 + 1')
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
            ...new LexParser('数字1+数字2')
        ],[
            {type:VAR,value:"数字1"},
            {type:OPER,value:'+'},
            {type:VAR,value:"数字2"}
        ]);
    });
    it('数字1 ** 数字2',function(){
        assert.deepStrictEqual([
            ...new LexParser('数字1 ** 数字2')
        ],[
            {type:VAR,value:"数字1"},
            {type:OPER,value:'**'},
            {type:VAR,value:"数字2"}
        ]);
    });
    it('1$1',function(){
        assert.throws(()=>[
            ...new LexParser('1$1')
        ],new SyntaxError('Unexpected Character at position 1'));
    });
    it('!12',function(){
        assert.throws(()=>[
            ...new LexParser('!12')
        ],new SyntaxError('Unexpected Character at position 0'));
    });
    it('   1   +   1   !',function(){
        assert.throws(()=>[
            ...new LexParser('   1   +   1   !')
        ],new SyntaxError('Unexpected Character at position 15'));
    });
    it('23.43.23',function(){
        assert.throws(()=>[
            ...new LexParser('23.43.23')
        ],new SyntaxError('Unexpected Character at position 5'));
    });
});
