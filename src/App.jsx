import './App.css'
import { useState } from 'react';

function App() {
  const [tasks,setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = (e) =>{
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev, {id: Date.now(), text:trimmed,done:false},
    ]);
    setInput("");
  };

  const toggleTask =(id) => {
    setTasks((prev) => prev.map((task) => task.id === id ? {...task, done: !task.done}: task))
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const remainingTodos = tasks.filter(task => !task.done).length;

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        {/* Card */}
        <div className='rounded-2xl font-family bg-white shadow-sm ring-1 ring-slate-200 px-6 py-8'>
            <h1 className='text-2xl font-semibold text-slate-800'>
            Your To Do
            </h1>

          {/* Input */}
          <form onSubmit={addTask} className='mt-6 flex items-center gap-3'>
            <input value={input} onChange={(e) => setInput(e.target.value)}
            type="text" placeholder='Add new task' 
            className='h-10 w-full bg-transparent border-0 border-b-2 border-slate-400 px-0 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-700 focus:ring-0'/>
            <button type='submit' className='h-10 w-10 shrink-0 rounded-lg bg-slate-800 text-white shadow-sm hover:bg-slate-700 active:scale-[0.98]'>+</button>
          </form>
          {/* List */}

          {tasks.length === 0 ? (
            <p className='text-x font-semibold text-slate-800 pt-2'>No tasks yet. Add one above</p>
          ): (
            <ul className='mt-5 space-y-3'>
              {tasks.map((task) => (
                <li key={task.id} className='flex items-center justify-between rounded-xl border border-slate-300 bg-white px-3 py-2'>
                  <label className='flex items-center gap-3 cursor-pointer select-none'>
                    <input type="checkbox" checked={task.done} onChange={()=> toggleTask(task.id)}
                    className='h-4 w-4 rounded border-slate-400 text-slate-800 focus:ring-slate-200' 
                    />
                    <span className={"text-sm" + (task.done? "text-slate-400 line-through": "text-slate-800")}>{task.text}</span>
                  </label>
                  <button onClick={() => deleteTask(task.id)} 
                  className='grid h-7 w-7 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700'>x</button>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-6 text-xs text-slate-600 italic">
              Your remaining todos :{" "}
            <span className="font-semibold not-italic">
              {remainingTodos}
            </span>
          </p>

        </div>
        
      </div>
      
    </div>
  )
}

export default App
