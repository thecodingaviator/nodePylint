const fs = require('fs');

const express = require('express');
const app = express();

const he = require('he');

let {PythonShell} = require('python-shell');

app.get('/:code', (req, res, next) => {
    
    const fileName = './snake_' + Math.floor(100000 * Math.random()) + '.py';

    fs.writeFile(fileName, he.decode(req.params.code), error => 
        {
            if (error) {
            console.error(error);
            return 'Error writing files';
        }
    })

    const package_name = 'pylint'
    const options = {
        args : [package_name, fileName],
    }

    PythonShell.run('./install_package.py', options, 
        function(err, results)
        {
            try {
                fs.unlinkSync(fileName);
                console.log(`File ${fileName} is deleted`)
            } catch (error) {
                console.log(fileName)
                console.log(error)
            }
            
            if (err) throw err;
            else {
                // console.log('Result: ', results.toString());
                res.send(results.toString())
            }
        }
    )
});

const port=8000;
app.listen(port, ()=>console.log(`Server connected to ${port}`));