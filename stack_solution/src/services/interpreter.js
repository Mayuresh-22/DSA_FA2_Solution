/*
  this code contains the logic for basic interpreter

  func <fuction_name> () {
    -------
    ----
  }
  
  <function_name>() // call the function

  valid code.
*/

import { TOKENS } from "./token";

function delayHelper(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Interpreter {
  setUIStack = null;
  setUIOutput = null;
  constructor(setUIStack, setUIOutput) {
    this.lines = [];
    this.stack = [];
    this.output = '';
    this.setUIStack = setUIStack;
    this.setUIOutput = setUIOutput;
  }

  isStackEmpty() {
    return this.stack.length === 0;
  }

  isPCSackEmpty() {
    return this.pcStack.length === 0;
  }

  toBeSkipped(line) {
    return line === '' || line === TOKENS.CURRLY_OPEN || line === TOKENS.CURRLY_CLOSE;
  }

  getCurrentFuncStackCall() {
    return this.stack[this.stack.length - 1];
  }

  execPrint(value) {
    this.output += value + '\n';
    this.setUIOutput(this.output);
  }

  checkRecursiveFunction(funcNameToBePushed) {
    console.log('original stack', this.stack);
    
    const currentFuncStackCall = this.getCurrentFuncStackCall();
    if (currentFuncStackCall.name === funcNameToBePushed) {
      throw new Error('Runtime Error: Recursive function call not allowed main');
    }
    for (let i = 0; (i < this.stack.length - 1) && this.stack.length > 1; i++) {
      if (this.stack[i].name === currentFuncStackCall.name) {
        throw new Error('Runtime Error: Recursive function call not allowed ' + currentFuncStackCall.name + ' ' + this.stack[i].name);
      }
    }
  }

  async run(code, funcLineMap, delay = 2000) {
    this.stack = [];
    this.pcStack = [];
    this.programCounter = 0;
    this.lines = code.split('\n');
    if (funcLineMap[TOKENS.MAIN] === undefined) {
      throw new Error('Runtime Error: main function not found');
    }
    this.stack.push({ name: 'main', line: funcLineMap[TOKENS.MAIN] });
    this.setUIStack(this.stack);

    while (!this.isStackEmpty()) {
      const currentFuncStackCall = this.getCurrentFuncStackCall();
      this.programCounter = funcLineMap[currentFuncStackCall.name] + 1;
      while (this.programCounter != -1) {
        const line = this.lines[this.programCounter].trim();
        if (this.toBeSkipped()) {
          this.programCounter += 1;
          continue;
        }
        const tokens = line.split(' ');
        const command = tokens[0].trim();

        await delayHelper(delay);  // delay for visualisation

        if (command === TOKENS.PRINT) {
          const value = tokens[1].trim();
          this.execPrint(value);
          this.programCounter += 1;
        } else if (command === TOKENS.RET || command === TOKENS.CURRLY_CLOSE) {
          this.stack.pop();
          this.setUIStack(this.stack);
          if (this.isPCSackEmpty()) {
            this.programCounter = -1;
            break;
          } else {
            this.programCounter = this.pcStack.pop() + 1;
          }
        } else {
          if (funcLineMap[command] === undefined) {
            throw new Error('Runtime Error: Function not found ' + command);
          }
          this.checkRecursiveFunction(command);
          this.stack.push({ name: command, line: this.programCounter });
          this.pcStack.push(this.programCounter);
          this.setUIStack(this.stack);
          break;
        }
      }
    }
  }
}

export default Interpreter;