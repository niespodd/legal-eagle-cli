# Legal Eagle command line tool

This library is a wrapper on [legal-eagle](https://github.com/atom/legal-eagle) by Atom. It facilitates the process of 
creating aggregated license listing files based on `package.json` dependencies. 

Keywords: license attribution, legal compliance, license listing, legal eagle cli

![Imgur](http://i.imgur.com/i6PJues.png)

## Getting started
`npm install -g legal-eagle-cli`

## How to
`legal-eagle > licenses.json` for more, help `legal-eagle -h`

## Features 
* Raw JSON output by default (or with `-o json`)
* Optional CSV output with `-o csv`
* Output is sorted by default
* Package duplicates (e.g. two versions of same package) can be easily removed with `-u` flag (if the license is different for multiple package versions - all of them will be listed)
* Templated based listing generation `-o template -t templates/custom.tpl` (see default template: `templates/default.tpl`)
* Help always within reach `--help`

## Tip for creating aggregated license listing from multiple projects
Let's say you have multiple projects sharing the same, common libraries. You would like to create an aggregated list of dependencies with their licenses. The way to do that is just setting up new node project with `npm init` and installing all your projects as a dependencies to it. The `legal-eagle` goes recursive through dependency dependencies so at the end you will see listing of all libraries used in your project(s).

## License
MIT
