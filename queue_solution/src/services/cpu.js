// this code contains the logic to mimic the CPU behavior

class CPU {
  constructor(setUICPUMsg, delay = 1000, timeSlice = 1) {
    this.timeSlice = timeSlice;
    this.delay = delay;
    this.currentTask = null;
    this.setUICPUMsg = setUICPUMsg;
  }

  async run(task) {
    this.currentTask = task;
    for (let i = 0; (task.cpuTime != 0 && i < this.timeSlice); i++) {
      await this.executeCycle(this.timeSlice);
      task.cpuTime -= this.timeSlice;
    }
  }

  async executeCycle(numOfCycles) {
    this.setUICPUMsg(this.currentTask.name + " is executing CPU");
    await new Promise((resolve) => setTimeout(resolve, numOfCycles * this.delay));
    this.setUICPUMsg(this.currentTask.name + " executed CPU for " + numOfCycles + " cycles");
  }
}

export default CPU;