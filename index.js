const express=require('express');
const app=express();

let {PythonShell} = require('python-shell');

var package_name = 'pylint'

app.get("/", (req, res, next) => {
    let options = {
        args : [package_name, "aaa"],
    }

    PythonShell.run('./install_package.py', options, 
        function(err, results)
        {
            if (err) throw err;
            else console.log(results);

            console.log('result: ', results.toString());
            res.send(results.toString())
        }
    )

})

const port=8000;
app.listen(port, ()=>console.log(`Server connected to ${port}`));