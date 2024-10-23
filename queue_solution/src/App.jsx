import { useState } from 'react'
import Button from './components/ui/button'
import Compiler from './services/compile'
import Interpreter from './services/interpreter'

function App() {
  const [stack, setStack] = useState([]) // Empty stack
  const [stackPointer, setStackPointer] = useState([])
  const [delay, setDelay] = useState(1)
  const [output, setOutput] = useState('')
  const [code, setCode] = useState('')

  const handleCompileRunBtn = async () => {
    if (!code) {
      setOutput('Please enter some code to run.')
      return
    }
    setOutput('')
    setStack([])
    try {
      // Compile the code
      const compiler = new Compiler()
      const funcLineMap = compiler.compile(code)

      // Run the code
      const interpreter = new Interpreter(setStack, setOutput)
      await interpreter.run(code, funcLineMap, delay * 1000)
      setStack([])
    } catch (error) {
      setOutput(error.message)
    }
  }

  return (
    <div className="lora-font flex flex-col min-h-screen">
      <header className="flex flex-col items-center justify-between px-6 py-4 bg-background shadow-sm">
        <span className="text-xl font-bold">Function calling visualisation with Stack</span>
      </header>

      <main className="flex flex-grow">
        <div className="flex-grow p-6 md:p-12 flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full max-w-screen-lg space-y-5">
            {/* code editor */}
            <div className="flex flex-col w-full space-y-2">
              <div className="items-center justify-between">
                <span className="text-lg font-bold">Code Editor</span>
              </div>
              <textarea
                className="w-full h-96 p-4 bg-gray-100 rounded-md"
                placeholder="Type your code here"
                value={code}
                onChange={e => setCode(e.target.value)}></textarea>
              {/* action buttons */}
              <div className="flex flex-row justify-between">
                <input
                  value={delay}
                  type="number"
                  min="1"
                  max="5"
                  onChange={e => {
                    if (e.target.value < 1) setDelay(1)
                    else if (e.target.value > 5) setDelay(5)
                    else setDelay(e.target.value)
                  }}
                  className="w-20 p-2 border border-gray-400 rounded-md"
                  placeholder="Delay" />
                <Button onClick={handleCompileRunBtn}>
                  Compile & Run
                </Button>
              </div>
            </div>

            {/* terminal */}
            <div className="flex flex-col w-full space-y-2">
              <div className="items-center justify-between">
                <span className="text-lg font-bold">Terminal</span>
              </div>
              <div className="w-full h-96 p-4 bg-gray-100 rounded-md">
                <div className="flex flex-row space-x-2">
                  <span className="text-gray-400">{output || "Click on 'Run' button to get the output."}</span>
                </div>
              </div>
            </div>
          </div>

          {/* memory, stack */}
          <div className="flex-1 flex-col w-full max-w-screen-lg space-y-5">
            {/* memory */}
            <div className="flex flex-col w-full space-y-2">
              <div className="items-center justify-between">
                <span className="text-lg font-bold">Function Call Stack</span>
              </div>
              <div className="flex flex-col h-96 p-4 bg-gray-100 px-20 py-5 rounded-md">
                <div className="flex flex-row flex-grow space-x-5">
                  <div className='w-32 rounded-lg bg-gray-50 text-black'>
                    {stackPointer.map((pointer, index) => (
                      <div key={index} className='flex flex-col items-center justify-center h-16'>
                        <span>{stack[pointer]}</span>
                      </div>
                    ))}
                  </div>
                  <div className='w-full rounded-lg bg-gray-50 text-black border border-black'>
                    {stack.map((item, index) => (
                      <div key={index} className='flex flex-col p-2 items-center justify-center border border-gray-400'>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
