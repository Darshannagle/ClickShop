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
    asciiBranding: "______ _ _      _        _                 \n/  ____| (_)    | |      | |                \n| |    | |_  ___| | _____| |__   ___  _ __  \n| |    | | |/ __| |/ / __| '_ \\ / _ \\| '_ \\ \n| |____| | | (__|   <\\__ \\ | | | (_) | |_) |\n\\______|_|_|\\___|_|\\_\\___/_| |_|\\___/| .__/ \n                                     | |    \n                                     |_|    \n"
    , quote: ``

};
//https://patorjk.com/software/taag/#p=display&f=Big&t=Clickshop&x=none&v=4&h=4&w=80&we=false
fs.writeFileSync(path.join('version.json'), JSON.stringify(versionData, null, 2));


console.log(`📝 Build info generated`);
console.log(`   ➤ Version: ${versionData.version}`);
console.log(`   ➤ Build No: ${versionData.buildNo}`);
