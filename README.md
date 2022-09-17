# cpu-simulator

Steps for testing:
  - npm install
  - nodemon app.js 

For testing CPU commands you should add command in  text.txt file
Cpu Registers are r1 ~ r10 
Example commands`
- add r1, 2
- add r3, 4
- mov r2, 5
- LABEL:
- cmp r1,r2
- add r2, r1
- jmp LABEL
- mov r9, 5
- mul r9, 2
