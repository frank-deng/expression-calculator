import {
    NUM,
    VAR,
    OPER
} from './types';
import RPN from "./rpn";

export default class Calc extends RPN{
    static TOKEN_NUM=NUM;
    static TOKEN_VAR=VAR;
    static TOKEN_OPER=OPER;
    constructor(input){
        super(input);
    }
}
