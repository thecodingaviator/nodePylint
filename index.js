const fs = require('fs');

const express = require('express');
const app = express();

const he = require('he');

let {PythonShell} = require('python-shell');

var package_name = 'pylint'

app.get('/:code', (req, res, next) => {
    console.log(req.params.code);
    const fileName = './' + Math.floor(100000 * Math.random()) + '.py';

    fs.writeFile(fileName, he.decode(req.params.code), error => 
        {
            if (error) {
            console.error(error);
            return 'Error writing files';
        }
    })

    let options = {
        args : [package_name, fileName],
    }

    PythonShell.run('./install_package.py', options, 
        function(err, results)
        {
            fs.unlink(fileName)
            if (err) throw err;
            else {
                console.log('Result: ', results.toString());
                res.send(results.toString())
            }
        }
    )
});

const port=8000;
app.listen(port, ()=>console.log(`Server connected to ${port}`));