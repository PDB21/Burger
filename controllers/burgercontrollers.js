const express = require("express");

const db = require("../models");


let router = express.Router();

router.get("/", (req, res) => {
    db.burgers.findAll({}).then( data => {
        let burgerObj = {
            burger: data
        }
        res.render("index", burgerObj);
    })
});

router.post("/api/burgers", (req, res) => {
    console.log(req.body.name);
    db.burgers.create({burgerName: req.body.name}).then( result => {
        res.json({ id: result.insertId });
    })
});

router.put("/api/burgers/:id", (req, res) => {
    db.burgers.update({devoured: true, customerName: req.body.custName}, {where: {id: req.params.id} })
    .then(result => {
        if (result.changedRows === 0) {

            return res.status(404).end();
        }
        res.status(200).end();
    })
});

module.exports = router;