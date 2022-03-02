const fs = require("fs");

const express = require("express");
const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

let { PythonShell } = require("python-shell");

app.get("/", (req, res) => {
  res.send("Use /code to test");
});

app.get("/code", (req, res) => {
  const fileName = "./snake_" + Math.floor(100000 * Math.random()) + ".py";

  fs.writeFile(fileName, req.body.code, (error) => {
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
      res.send(results);
    }
  });
});

const port = 8000;
app.listen(port, () => console.log(`Server connected to ${port}`));
