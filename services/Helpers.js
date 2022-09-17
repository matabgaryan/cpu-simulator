const constantValues = require('../configs/constants');

class CPUHelpers{

    isRegister(value){
        return constantValues.registerNames().includes(value);
    }

    isNumber(value){
        return !isNaN(value)
    }

    arithmeticAction(arg1, arg2, actiontype){
        return `${Number(arg1)}${actiontype}${arg2} `
    }
}

module.exports = {CPUHelpers};

