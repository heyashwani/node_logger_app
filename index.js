const express = require('express')
const app = express()
const port = 3000;

const fs = require('fs');
const path = require('path');
const fileName = 'Output.txt';
const filePath = path.join("D:/official/logger", fileName);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())


app.post('/createLog', (req, res) => {

    const logContent = req.body.content;
    if (fs.existsSync(filePath)) {
        // file exist, please update the file with requested content
        fs.appendFile(filePath, logContent+'\n', (err) => {
            if (err) {
                return console.error(`Error appending to file: ${err}`);
            }else{
                res.statusCode = 201;
                res.end(`Your file is updated successfully at ${filePath}`);
            }
        });
    } else {
        // file does not exist, create new file and insert content
        console.log(`File ${filePath} does not exist. so i am creating file`);
        fs.writeFile(filePath,  logContent+'\n', (err) => {
            if (err) {
                return console.error(`Error in creating or writing file: ${err}`);
            }else{
                res.statusCode = 201;
                res.end(`File created successfully at ${filePath}`);
            }
        });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})