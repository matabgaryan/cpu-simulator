const constantValues = require('../configs/constants');
const readFile = require('./ReadFile');
const helpers = require('../services/helpers');
const { commandNames } = constantValues;

class MainCpu {
    commands = [];
    registers = {}
    registerNames = [];
    flag = 0;
    currentCommand = {commandName: '', arg1: '', arg2: ''};
    currentCommandIndex = 0;
    currentLabelIndex;
    currentLabelName;
    constructor(commandsArr) {
        this.registerNames = constantValues.registerNames();
        this.writeRegisters()
        this.commands = readFile('./text.txt');
    }

    writeRegisters(){
        const registerNames = constantValues.registerNames();
        for(let i = 0; i< registerNames.length; ++i){
            this.registers[registerNames[i]] = 0;
        }
    }

    move(src, dest){
        const registername = src;
        if (this.registerNames.includes(dest)){
            return this.registers[src] = Number(this.registers[dest]);
        }
        if(this.registerNames.includes(src) && helpers.isNum(dest)){
            return this.registers[src] = Number(dest);
        }
        return
    }

    add(arg1, arg2){
        if (this.registerNames.includes(arg1) && helpers.isNum(arg2)){
            this.registers[arg1] = Number(this.registers[arg1]) + Number(arg2);
            return this.registers[arg1];
        }

        if (this.registerNames.includes(arg2) && helpers.isNum(arg1)){
            return Number(this.registers[arg1]) + Number(this.registers[arg2]);
        }
        if (this.registerNames.includes(arg1) && this.registerNames.includes(arg2)){
            this.registers[arg1] = Number(this.registers[arg1]) + Number(this.registers[arg2]);
            return this.registers[arg1];
        }
        if(helpers.isNum(arg1) && helpers.isNum(arg2)){
            return arg1 + arg2
        }
    }

    sub(arg1, arg2){
        if (this.registerNames.includes(arg1) && helpers.isNum(arg2)){
            this.registers[arg1] = Number(this.registers[arg1]) - Number(arg2);
            return this.registers[arg1];
        }
        if (this.registerNames.includes(arg2) && helpers.isNum(arg1)){
            return Number(this.registers[arg1]) - Number(this.registers[arg2]);
        }
        if (this.registerNames.includes(arg1) && this.registerNames.includes(arg2)){
            this.registers[arg1] = Number(this.registers[arg1]) - Number(this.registers[arg2]);
            return this.registers[arg1];
        }
        if(helpers.isNum(arg1) && helpers.isNum(arg2)){
            return arg1 - arg2
        }
    }

    mul(arg1, arg2){
        if (this.registerNames.includes(arg1) && helpers.isNum(arg2)){
            this.registers[arg1] = Number(this.registers[arg1]) * Number(arg2);
            return this.registers[arg1];
        }
        if (this.registerNames.includes(arg2) && helpers.isNum(arg1)){
            return Number(this.registers[arg1]) * Number(this.registers[arg2]);
        }
        if (this.registerNames.includes(arg1) && this.registerNames.includes(arg2)){
            this.registers[arg1] = Number(this.registers[arg1]) * Number(this.registers[arg2]);
            return this.registers[arg1];
        }
        if(helpers.isNum(arg1) && helpers.isNum(arg2)){
            return Number(arg1) * Number(arg2)
        }
    }

    cmp(arg1, arg2){
        const arg1Value = this.registerNames.includes(arg1) ? this.registers[arg1.trim()] : arg1;
        const arg2Value = this.registerNames.includes(arg2) ? this.registers[arg2.trim()] : arg2;
        const isBigger = Number(arg1Value) > Number(arg2Value);
        if (isBigger) return this.flag = +1;
        if (!isBigger) return this.flag = -1;
        else this.flag = 0;
    }

    executeCommands() {
        for(let i = this.currentCommandIndex; i<= this.commands.length; ++i){
            if (this.commands[i]){
                const commandName = this.commands[i].substr(0, this.commands[i].indexOf(' '));
                if (!commandNames[commandName]){
                    this.currentLabelIndex = i;
                    this.currentLabelName = commandName;
                }
                else {
                    const arg1 = this.commands[i].substr(commandName.length + 1, this.commands[i].indexOf(','));
                    const arg1Value = arg1.substr(0, arg1.indexOf(','));
                    const arg2 = arg1.slice(arg1.indexOf(',') + 1);
                    this.executeCommand(commandName, arg1Value, arg2);
                }
            }
        }
    }


    executeCommand(commandName, arg1, arg2){
        this.currentCommandIndex +=1;
        switch (commandName){
            case commandNames.mov:
                this.move(arg1, arg2);
                break;
            case commandNames.add:
                this.add(arg1, arg2);
                break;
            case commandNames.sub:
                this.sub(arg1, arg2);
                break;
            case commandNames.mul:
                this.mul(arg1, arg2);
                break;
            case commandNames.cmp:
                this.cmp(arg1, arg2);
                break;
            case commandNames.jmp:
                if (this.flag > 0){
                    this.currentCommandIndex = this.currentLabelIndex;
                    this.executeCommands();
                }
                break;
            case commandNames.jl:
                if (this.flag === -1){
                    this.currentCommandIndex = this.currentLabelIndex;
                    this.executeCommands();
                }
                break;
            case commandNames.jle:
                if (this.flag === 0 || this.flag === -1){
                    this.currentCommandIndex = this.currentLabelIndex;
                    this.executeCommands();
                }
                break;
            default:
                return
        }
        console.log(this.registers);
    }
}

module.exports = MainCpu
