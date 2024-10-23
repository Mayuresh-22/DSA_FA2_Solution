/*
  this code contains the logic for basic compilation of the code.
  this compiler simply works by registering/mapping
  the line number of funciton call in any map data structure.
*/

import { TOKENS } from "./token";

class Compiler {
  funcLineMap = {};

  constructor() {
    this.funcLineMap = {};
  }

  compile(code) {
    console.log('code', code);

    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const tokens = line.split(' ');
      const command = tokens[0].trim();
      if (command === TOKENS.FUNC) {
        const functionName = tokens[1].trim();
        if (!this.funcValidityCheck(functionName)) {
          throw new Error('Compilation Error: Expected valid function got ' + functionName);
        }
        this.funcLineMap[functionName] = i;
      }
    }
    return this.funcLineMap;
  }

  funcValidityCheck(funcName) {
    // regex to check the validity of function name
    const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    return regex.test(funcName);
  }
}

export default Compiler;