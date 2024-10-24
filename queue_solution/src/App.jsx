import { useEffect, useState } from 'react'
import Button from './components/ui/button'
import CPU from './services/cpu'
import IO from './services/io'
import Scheduler from './services/scheduler'

function App() {
  const [cpu, setCPU] = useState('')
  const [io, setIO] = useState('')
  const [readyQueue, setReadyQueue] = useState([])
  const [endQueue, setEndQueue] = useState([])
  const [ioQueue, setIOQueue] = useState([])
  const [jobName, setJobName] = useState('')
  const [jobCPUTime, setJobCPUTime] = useState('')
  const [jobIOTime, setJobIOTime] = useState('')
  const [output, setOutput] = useState('')
  const [cpuMsg, setCPUMsg] = useState('')
  const [ioMsg, setIOMsg] = useState('')

  const handleJobAdd = async () => {
    if (!jobName || !jobCPUTime || !jobIOTime) {
      setOutput('Please enter Job name/cpu/io')
      return
    }
    setOutput('')

    const job = {
      name: jobName,
      cpuTime: parseInt(jobCPUTime),
      ioTime: parseInt(jobIOTime)
    }

    let newReadyQueue = []
    let isAdded = false

    if (readyQueue.length === 0) {
      newReadyQueue.push(job)
      setReadyQueue(newReadyQueue)
      return
    }
    for (let i = 0; i < readyQueue.length; i++) {
      if ((readyQueue[i].cpuTime >= job.cpuTime) && !isAdded) {
        newReadyQueue.push(job)
        isAdded = true
      }
      newReadyQueue.push(readyQueue[i])
    }
    if (!isAdded) {
      newReadyQueue.push(job)
    }
    setReadyQueue(newReadyQueue)
  }

  const handleStart = async () => {
    if (readyQueue.length === 0) {
      setOutput('Please add jobs to the ready queue')
      return
    }
    setCPUMsg('')
    setIOMsg('')
    const scheduler = new Scheduler(cpu, io, readyQueue, setReadyQueue, ioQueue, setIOQueue, endQueue, setEndQueue, 5000)
    await scheduler.run()
    setCPUMsg('')
    setIOMsg('')
  }

  useEffect(() => {
    // initialize cpu, io, and scheduler
    setCPU(new CPU(setCPUMsg, 2000))
    setIO(new IO(setIOMsg, 2000))
  }, [])

  return (
    <div className="lora-font flex flex-col min-h-screen">
      <header className="flex flex-col items-center justify-between px-6 py-4 bg-background shadow-sm">
        <span className="text-xl font-bold">Queue based simulation of CPU Scheduling Algorithms</span>
      </header>
      <span className="mt-10 text-red-600 text-md text-center">{output}</span>
      {/* Main container for the diagram */}
      <main className="flex flex-grow">
        <div className="flex-grow justify-center p-6 md:p-12 flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full max-w-screen-xl space-y-16">
            {/* read and end queue */}
            <div className="flex flex-row w-full justify-between space-x-5">
              <div className="flex flex-col flex-grow max-w-md min-w-md space-y-2">
                <div className="items-center justify-between">
                  <span className="text-lg font-bold">Ready queue</span>
                </div>
                <div
                  className="flex flex-row w-full h-16 bg-gray-100 rounded-md border border-gray-500">
                  {
                    readyQueue.map((job, index) => (
                      <div key={index} className="flex flex-row border border-r-gray-500 justify-between">
                        <div className="flex flex-row justify-center items-center space-x-2 p-1">
                          <span>{job.name}</span>
                          <span>{job.cpuTime}</span>
                          <span>{job.ioTime}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
                {/* action buttons */}
                <div className="flex flex-row justify-between">
                  <div className="space-x-2">
                    <input
                      value={jobName}
                      type="text"
                      maxLength="1"
                      minLength="1"
                      onChange={e => setJobName(e.target.value.toUpperCase())}
                      className="w-14 p-2 border border-gray-400 rounded-md"
                      placeholder="Job" />
                    <input
                      value={jobCPUTime}
                      type="text"
                      maxLength="1"
                      minLength="1"
                      onChange={e => setJobCPUTime(e.target.value.toUpperCase())}
                      className="w-14 p-2 border border-gray-400 rounded-md"
                      placeholder="CPU cycle" />
                    <input
                      value={jobIOTime}
                      type="text"
                      maxLength="1"
                      minLength="1"
                      onChange={e => setJobIOTime(e.target.value)}
                      className="w-14 p-2 border border-gray-400 rounded-md"
                      placeholder="I/O" />
                  </div>
                  <Button onClick={handleJobAdd}>
                    Add
                  </Button>
                </div>
              </div>
              <div className="max-w-md min-w-md flex flex-col flex-grow space-y-2">
                <div className="items-center justify-between">
                  <span className="text-lg font-bold">End queue</span>
                </div>
                <div className="flex flex-row w-full h-16 bg-gray-100 rounded-md border border-gray-500">
                  {
                    endQueue.map((job, index) => (
                      <div key={index} className="flex flex-row border border-r-gray-500 justify-between">
                        <div className="flex flex-row justify-center items-center space-x-2 p-1">
                          <span>{job.name}</span>
                          <span>{job.cpuTime}</span>
                          <span>{job.ioTime}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            {/* cpu */}
            <div className="flex flex-col w-full items-center justify-center">
              <div className="w-96 h-96 p-4 bg-blue-50 border border-blue-200 rounded-full flex flex-col justify-center text-center">
                <span>CPU</span>
                <span className="whitespace-pre-wrap text-lg">{cpuMsg}</span>
              </div>
            </div>

            {/* I/O queue */}
            <div className="flex flex-row w-full justify-center">
              <div className="flex flex-col flex-grow max-w-md min-w-md space-y-2">
                <div className="w-32 h-32 p-4 bg-blue-50 border border-blue-200 rounded-full flex flex-col justify-center text-center">
                  <span>I/O</span>
                  <span className="whitespace-pre-wrap text-sm">{ioMsg}</span>
                </div>
              </div>
              <div className="max-w-md min-w-md flex flex-col flex-grow space-y-2">
                <div className="items-center justify-between">
                  <span className="text-lg font-bold">I/O wait queue</span>
                </div>
                <div className="flex flex-row w-full h-16 bg-gray-100 rounded-md border border-gray-500">
                  {
                    ioQueue.map((job, index) => (
                      <div key={index} className="flex flex-row border border-r-gray-500 justify-between">
                        <div className="flex flex-row justify-center items-center space-x-2 p-1">
                          <span>{job.name}</span>
                          <span>{job.cpuTime}</span>
                          <span>{job.ioTime}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            {/* start button */}
            <div className="flex flex-row justify-center">
              <Button onClick={handleStart} className="bg-gray-900">
                Start
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
