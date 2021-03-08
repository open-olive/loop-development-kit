import fs from 'fs';
import path from 'path';

// The proto compiler uses the only grpc moduled "grpc".
// We need to use the new module "@grpc/grpc-js" which supports sockets.
const searchJsValue = "var grpc = require('grpc');";
const replaceJsValue = "var grpc = require('@grpc/grpc-js');";

// .d.ts files also need to reference grpc/grpc-js instead of grpc.
const searchTsValue = 'import * as grpc from "grpc";';
const replaceTsValue = 'import * as grpc from "@grpc/grpc-js";';

// load files that need edited
const protoDir = path.join(__dirname, '../src/grpc');

// Get all the proto files.
// Finding matching _grpc_pb files (.js, .d.ts)
// Apply the appropriate update for each file type.

fs.readdirSync(protoDir, { withFileTypes: true })
  .filter((dirEnt: fs.Dirent) => dirEnt.isFile() && dirEnt.name.endsWith('.proto'))
  .forEach((protoFileName) => {
    const serviceName = path.basename(protoFileName.name, '.proto');
    const jsFileName = `${serviceName}_grpc_pb.js`;
    const tsFileName = `${serviceName}_grpc_pb.d.ts`;
    const jsFilePath = path.join(protoDir, jsFileName);
    const tsFilePath = path.join(protoDir, tsFileName);
    let jsFileRead = fs.readFileSync(jsFilePath, 'utf-8');
    let tsFileRead = fs.readFileSync(tsFilePath, 'utf-8');
    jsFileRead = jsFileRead.replace(searchJsValue, replaceJsValue);
    tsFileRead = tsFileRead.replace(searchTsValue, replaceTsValue);
    // There is an issue with the "@grpc/grpc-js" module when you require it multiple times.
    // So, we need to export it from "ldk_grpc_pb.js" so that it can be used to create credentials.
    if (!jsFileRead.includes('exports.grpc = grpc;')) {
      jsFileRead += '\nexports.grpc = grpc;\n';
    }

    // grpc is exported by generated files, but .d.ts does not include it by default
    if (!tsFileRead.includes('export { grpc }')) {
      tsFileRead += '\nexport { grpc }\n';
    }

    fs.writeFileSync(jsFilePath, jsFileRead);
    fs.writeFileSync(tsFilePath, tsFileRead);
  });
