#!/usr/bin/env node
'use strict';

var legalEagle = require('legal-eagle'),
    fs = require('fs'),
    nunjucks = require('nunjucks'),
    argv = require('yargs')
        .usage("legal-eagle")
        .alias('t', 'template')
        .nargs('t', 1)
        .describe('t', "Template used for 'template' output-type.")
        .alias('o', 'output-type')
        .nargs('o', 1)
        .choices('o', ['template', 'json', 'csv'])
        .describe('o', 'Output type (default: json, can be: template, json)')
        .alias('p', 'path')
        .nargs('p', 1)
        .describe('u', 'Remove duplicated package and license pairs')
        .alias('u', 'unique')
        .boolean('u')
        .describe('p', "Path to desired node project")
        .help('h')
        .alias('h', 'help')
        .argv;

var template = argv['t'] || __dirname + "/templates/default.tpl";
var path = argv['p'] || process.cwd();

var uniqueness = {};

var parse = function(summary, parse_func) {
    var output = "";
    var packages = Object.keys(summary).sort();

    for(var i=0; i<packages.length; i++) {
        var pkg = packages[i];
        summary[pkg]['_pkg'] = summary[pkg]['_pkg'].split("@").slice(undefined, -1).join("@");

        if(argv['u'] && uniqueness[summary[pkg]['_pkg'][0]] == summary[pkg]['license']) continue;
        else uniqueness[summary[pkg]['_pkg'][0]] = summary[pkg]['license'];

        output += parse_func(summary, pkg);
    }
    return output;
};

var prettify = function(summary) {
    return parse(summary, function(summary, pkg) {
        return nunjucks.renderString(fs.readFileSync(template, 'utf8'), {'package': summary[pkg]});
    });
};

var csvize = function(summary) {
    return parse(summary, function(summary, pkg) {
        return summary[pkg]['_pkg'][0] + "," + summary[pkg]['_pkg'][1] + "," + summary[pkg]['license'] + "," + summary[pkg]['repository'] + "\n";
    });
};

legalEagle({path: path}, function(err, summary) {
    if(err) return console.error(err);

    var outputType = argv['o'];
    var output = "";

    if(!outputType || outputType == "json") {
        output = JSON.stringify(summary);
    } else if(outputType == "template") {
        output = prettify(summary);
    } else if(outputType == "csv") {
        output = csvize(summary);
    } else {
        console.error("Undefined output type " + outputType);
    }

    process.stdout.write(output);
});
