const fs = require("fs");

const express = require("express");
const app = express();

var cors = require('cors')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(cors())

let { PythonShell } = require("python-shell");

app.get("/", (req, res) => {
  res.send("Use /code to test");
});

app.post("/code", (req, res) => {
  const fileName = "./snake_" + Math.floor(100000 * Math.random()) + ".py";

  let code = req.body.code;
  // replace all \n with new lines
  code = code.replace(/\\n/g, "\n");
  // replace all \r with carriage returns
  code = code.replace(/\\r/g, "\r");
  // replace all \t with tabs
  code = code.replace(/\\t/g, "\t");
  // replace all \" with "
  code = code.replace(/\\"/g, '"');
  // replace all \' with '
  code = code.replace(/\\'/g, "'");
  // replace all \\ with \
  code = code.replace(/\\\\/g, "\\");

  fs.writeFile(fileName, code, (error) => {
    if (error) {
      console.error(error);
      return "Error writing files";
    }
  });

  const package_name = "pylint";
  const options = {
    args: [package_name, fileName],
  };

  PythonShell.run("./install_package.py", options, function (err, results) {
    try {
      fs.unlinkSync(fileName);
      console.log(`File ${fileName} is deleted`);
    } catch (error) {
      console.log(fileName);
      console.log(error);
    }

    if (err) throw err;
    else {
      // console.log('Result: ', results.toString());
      results = results.toString();
      results = results.substring(results.indexOf("OUTPUT STARTS HERE"));
      res.json({
        code: results
      })
      res.send(results);
    }
  });
});

const port = 8000;
app.listen(port, () => console.log(`Server connected to ${port}`));
