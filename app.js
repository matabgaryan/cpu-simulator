const readFile = require('./services/ReadFile')
const express = require('express');
const app = express();
const port = 3001;
const MainCpu = require('./services/Cpu');
const cpuInstance =  new MainCpu();
cpuInstance.executeCommands();
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
