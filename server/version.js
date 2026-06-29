const fs = require('fs');
// import fs from 'fs';
const path = require('path');
// import path from 'path';
const moment = require('moment');
// import moment from 'moment';
//--------------------------------------------------------------
// import packageJson from './package.json' assert { type: "json" };
const packageJson = require('./package.json');

const timestamp = new Date().toISOString();
const buildNo = moment(timestamp).format('YYYY.MM.DD.HHmmss');
const version = packageJson.version;
console.log(packageJson.version);
const versionData = {
    version,
    buildNo,
    timestamp,
    note: `Version: ${packageJson.version} | Build No: ${buildNo}`,
    asciiBranding: " _______            _ _               _____  _       _    __                     \n |__   __|          | (_)             |  __ \\| |     | |  / _|                    \n    | |_ __ __ _  __| |_ _ __   __ _  | |__) | | __ _| |_| |_ ___  _ __ _ __ ___  \n    | | '__/ _` |/ _` | | '_ \\ / _` | |  ___/| |/ _` | __|  _/ _ \\| '__| '_ ` _ \\ \n    | | | | (_| | (_| | | | | | (_| | | |    | | (_| | |_| || (_) | |  | | | | | |\n    |_|_|  \\__,_|\\__,_|_|_| |_|\\__, | |_|    |_|\\__,_|\\__|_| \\___/|_|  |_| |_| |_|\n                                __/ |                                             \n                               |___/                                              ",
    quote: ``

};
// https://patorjk.com/software/taag/#p=display&f=Big&t=Trading+Platform&x=none&v=4&h=4&w=80&we=false

fs.writeFileSync(path.join('version.json'), JSON.stringify(versionData, null, 2));


console.log(`📝 Build info generated`);
console.log(`   ➤ Version: ${versionData.version}`);
console.log(`   ➤ Build No: ${versionData.buildNo}`);
