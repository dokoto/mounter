#!/usr/bin/env node

'use strict';

const sh = require('shelljs');
sh.exec(process.cwd() + '/node_modules/nw/bin/nw');
