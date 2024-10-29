# DSA_FA2_Solution
This repository contains the solution for the DSA's FA2 activity.

### Stack solution (Function call visualization)
The folder `/stack_solution` contains the code for function call visualization. This code uses stacks to represent function call stack and program counter stack.

<b>Demo code snippet</b>
```
func a () {
	print a_started
	b ()
	print a_finished
	return
}

func b () {
	print b_started
	print b_finished
	return
}

func main () {
	print main_started
	a ()
	print main_finished
	return
}
```

#### Visuals
![image](https://github.com/user-attachments/assets/20a98736-aa43-4ed0-b79f-487716cc6a44)

#### Installation steps
Make sure you have cloned the entire repo
```
cd /stack_solution
npm run dev
```

<hr>

### Queue solution (CPU scheduling algorithm Shortest Job First visualization)
The folder `/queue_solution` contains the code for the queue-based CPU scheduling algorithm SJF. The code demonstrates the CPU and IO behaviour and uses a queue data structure for ready, i/o, and end queues.
(Note: Jobs/processes are added in the increasing order of Job's CPU cycles)

#### Visuals
![image](https://github.com/user-attachments/assets/77268d29-51c6-425e-ac68-6cb1f3b64f18)

#### Installation steps
Make sure you have cloned the entire repo
```
cd /queue_solution
npm run dev
```

<hr>

Want to say hi? here's my mail [mayureshchoudhary22@gmail.com](mailto:mayureshchoudhary22@gmail.com)

This is just an educational project, and no PR's expected.
Thank you.
