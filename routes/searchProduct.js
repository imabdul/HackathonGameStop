/**
 * Created by fnu.malik on 11/13/15.
 */
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));
var _ = require('lodash');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var product = req.query.product;
    product = product.replace(' ', '+')
   //var product = 'call+of+duty';
    var limitProducts=5;
    var clientSecret = 'dD7nH6cC1qH8yI3sG4xW6fN5vP1jO3vY0xI8lK2vT5oJ1cU3wE';
    var clientId = '20c2d81b-4029-4abd-941a-b72a912e8cb1';
    var url = 'https://api.apim.ibmcloud.com/gamestop/prod/gamestop/Products/?search='+product+'&numRecords='+limitProducts+'&client_secret='+clientSecret+'&client_id='+clientId;
    request.getAsync(url).then(function(result) {
        if(result.body!="[]"){
        //console.log(result);
        var json = result.body;
        if (typeof json === 'string') {//remove
            json = JSON.parse(json);
        }
        //res.send(json);
        send200(res, 200, "json", json);
        }else{
            sendError(res, 404, "text", "Product not found");
        }
    }).catch(function (err) {
        sendError(res, 500, "json", err);
    })

});

function send200(res, code, type, output){
    if(type === "text"){
        res.type('text/plain');
    }
    res.status(code).send(output)
}

function sendError(res, code, type, err){
    if(type === "text" || err.message){
        res.type('text/plain');
    }
    res.status(code).send(err.message || err)
}

module.exports = router;
