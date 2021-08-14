import {
    NUM,
    VAR,
    OPER
} from './types';
import RPN from "./rpn";

export default class Calc extends RPN{
    static NUM=NUM;
    static VAR=VAR;
    static OPER=OPER;
    constructor(input){
        super(input);
    }
}
