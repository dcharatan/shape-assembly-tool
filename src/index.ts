import * as fs from 'fs';
import ShapeAssemblyParser, { Transpiler, TranspilerInverse } from '@dcharatan/shape-assembly-parser';

// Get the arguments.
const userArguments = process.argv.slice(2);
if (userArguments.length < 1) {
  console.error('You must specify the function type and input file.');
  process.exit(1);
}

const type = userArguments[0];
if (type === 'transpile') {
  if (userArguments.length > 3) {
    console.error('The format is "<command> transpile <input file> <optional prefix>"');
    process.exit(1);
  }

  const inFile = userArguments[1];
  const programText = fs.readFileSync(inFile).toString();

  const prefixFile = userArguments[2];
  const prefix = prefixFile ? fs.readFileSync(prefixFile).toString() : '';

  const program = new ShapeAssemblyParser().parseShapeAssemblyProgram(programText, prefix);
  const transpiler = new Transpiler();
  console.log(
    transpiler.transpile(program, {
      doBboxAttachPostprocessing: true,
      doBboxParamSubstitution: true,
    })?.text,
  );
} else if (type === 'inverse') {
  if (userArguments.length > 2) {
    console.error('The format is "<command> inverse <input file>"');
    process.exit(1);
  }
  const inFile = userArguments[1];
  const program = fs.readFileSync(inFile).toString();
  const transpiler = new TranspilerInverse();
  console.log(transpiler.transpile(program));
} else {
  console.error('Unknown command. "transpile" and "inverse" are valid.');
  process.exit(1);
}
