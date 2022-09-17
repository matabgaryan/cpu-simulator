const commandNames = {
    mov: 'mov',
    add: 'add',
    sub: 'sub',
    mul: 'mul',
    div: 'div',
    cmp: 'cmp',
    jmp: 'jmp',
    jl: 'jl',
    jle: 'jle',
}

const arithmeticActionTypes  = {
    plus: `+`,
    sub: `-`,
    divide: `/`,
    multiply: `*`
}

const registerNames = () => ['r1', 'r2', 'r3', 'r4','r5','r6','r7','r8','r9','r10']

module.exports = {
    registerNames,
    commandNames,
    arithmeticActionTypes
}
