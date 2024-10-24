// this code contains the logic to mimic the I/O behavior

class IO {
  constructor(setUIIOMsg, delay = 1000, timeSlice = 1) {
    this.timeSlice = timeSlice;
    this.delay = delay;
    this.currentTask = null;
    this.setUIIOMsg = setUIIOMsg;
  }

  async run(task) {
    this.currentTask = task;
    for (let i = 0; (task.ioTime != 0 && i < this.timeSlice); i++) {
      await this.executeCycle(this.timeSlice);
      task.ioTime -= this.timeSlice;
    }
  }

  async executeCycle(numOfCycles) {
    this.setUIIOMsg(this.currentTask.name + " is executing IO");
    await new Promise((resolve) => setTimeout(resolve, numOfCycles * this.delay));
    this.setUIIOMsg(this.currentTask.name + " executed IO for " + numOfCycles + " cycles");
  }
}

export default IO;