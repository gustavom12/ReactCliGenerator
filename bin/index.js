#! /usr/bin/env node
require = require("esm")(module /* options */)
const prog = require('caporal');

require("../src/component").component(prog)
require("../src/hooks").hooks(prog)

prog.parse(process.argv);