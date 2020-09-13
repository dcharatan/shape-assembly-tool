import * as fs from 'fs';
import { TranspilerInverse } from '@dcharatan/shape-assembly-parser';

// Get the arguments.
const userArguments = process.argv.slice(2);
if (userArguments.length !== 1) {
  console.error('You must specify the input file.');
  process.exit(1);
}

const inFile = userArguments[0];
const program = fs.readFileSync(inFile).toString();
const transpiler = new TranspilerInverse();
console.log(transpiler.transpile(program));
