const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/departments", (req, res) => {
  fs.readFile("departments.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    res.send(JSON.parse(data));
  });
});

router.post('/departments', (req, res) => {
    fs.readFile('departments.json', 'utf8', (error, data) => {
        var departments = JSON.parse(data);
        departments.push(req.body);
        fs.writeFile('departments.json', JSON.stringify(departments), (error) => {
            if( error ){
                res.send(error);
                return;
            };
        
            res.send(req.body);
        
        })
    })
})

module.exports = router;
