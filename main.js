#!/usr/bin/env node
'use strict';

var legalEagle = require('legal-eagle'),
    fs = require('fs'),
    nunjucks = require('nunjucks'),
    promise = require('promise'),
    argv = require('yargs')
        .usage("legal-eagle")
        .alias('t', 'template')
        .nargs('t', 1)
        .describe('t', "Template used for 'template' output-type.")
        .alias('o', 'output-type')
        .nargs('o', 1)
        .choices('o', ['template', 'json'])
        .describe('o', 'Output type (default: json, can be: template, json)')
        .alias('p', 'path')
        .nargs('p', 1)
        .describe('p', "Path to desired node project")
        .help('h')
        .alias('h', 'help')
        .argv;

var template = argv['t'] || __dirname + "/templates/default.html";
var path = argv['p'] || process.cwd();

var prettify = function(summary) {
    var output = "";
    var packages = Object.keys(summary);

    for(var i=0; i<packages.length; i++) {
        var pkg = packages[i];
        summary[pkg]['_pkg'] = pkg.split("@");
        output += nunjucks.render(template, {'package': summary[pkg]});
    }
    return output;
};

legalEagle({path: path}, function(err, summary) {
    if(err) return console.error(err);

    var outputType = argv['o'];
    var output = "";

    if(!outputType || outputType == "json") {
        output = JSON.stringify(summary);
    } else if(outputType == "template") {
        output = prettify(summary);
    } else {
        console.error("Undefined output type " + outputType);
    }

    process.stdout.write(output);
});
