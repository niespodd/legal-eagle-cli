# Legal Eagle command line tool

This library is a wrapper on [legal-eagle library](https://github.com/atom/legal-eagle) developed by Atom. It facilitates the process of creating aggregated license listing based on `package.json` dependencies.

![Imgur](http://i.imgur.com/i6PJues.png)

## Features 
* Raw JSON output by default (or with `-o json`)
* Optional CSV output with `-o csv`
* Templated based listing generation `-o template -t templates/custom.html` (see default template: `templates/default.html`)
* Help always within reach `--help`

## Tip for creating aggregated license listing from multiple projects
Let's say you have multiple projects sharing the same, common libraries. You would like to create an aggregated list of dependencies with their licenses. The way to do that is just setting up new node project with `npm init` and installing all your projects as a dependencies to it. The `legal-eagle` goes recursive through dependency dependencies so at the end you will see listing of all libraries used in your project(s).

## License
MIT