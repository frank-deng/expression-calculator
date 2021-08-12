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
    it('数字1+数字2',function(){
        assert.deepStrictEqual([
            ...lex('数字1+数字2')
        ],[
            {type:VAR,value:"数字1"},
            {type:OPER,value:'+'},
            {type:VAR,value:"数字2"}
        ]);
    });
});
