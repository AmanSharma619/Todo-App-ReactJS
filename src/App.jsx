import { useState ,useRef, useEffect} from 'react'
import "./App.css"
function App() {
  const [done,func2]=useState(0)
  const [inputvalue,change]=useState("")
  const [donelist,taskdone]=useState([])
  const [list,listadd]=useState([])
  const inputref=useRef()
  const [count,func]=useState(0)
  const listref=useRef()

  useEffect(() => {
    if(listref.current){
      listref.current.scrollTop=listref.current.scrollHeight
    }
  
  }, [list])
  

  function changeinput(e){
    change(e.target.value)
  }
  function resetinput(){
    change("")
    
  }
  function deleter(e){
    e.target.parentNode.parentNode.style.display="none";
    func(count -1)
  }

  function checkerbox(e){
    taskdone([...donelist,e.target.parentNode.parentNode.childNodes[0].textContent])
    e.target.parentNode.parentNode.style.display="none";
    func(count-1)
    func2(done+1)
    

  }
  function revert(e){
    listadd([...list,e.target.parentNode.childNodes[0].textContent])
    e.target.parentNode.style.display='none'
    func2(done-1)
    func(count+1)
    
  }
  
  return (
    <>
      <div className="container  m-auto w-4/12 rounded-xl mt-10 flex flex-col ">
      <div className="heading m-auto mt-0 mb-1">Todo App</div>
      <div className="input w-full flex justify-center gap-4">
        <input type="text" placeholder='Add New Task'className='bg-transparent rounded-lg w-4/6 h-8' ref={inputref} value={inputvalue} onChange={changeinput}
      />
        <button className='rounded-lg hover:bg-violet-700' onClick={()=>{
          if(inputref.current.value.trim()!=""){
          func(count+1)
          listadd([...list,inputref.current.value])
          resetinput()}
          else{
            alert("please enter something before clicking")
            resetinput()
          }


          
        }}  >
        <svg xmlns="http://www.w3.org/2000/svg" className='invert' viewBox="-4 0 24 24" width="24" height="24" color="#000000" fill="white">
    <path d="M12 4V20M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
        </button>
      </div>
      <h2 className='ml-4 mt-2 mb-2' >Tasks to do - {count}</h2>
      <div className="todolist flex-col  min-w-full p-2 max-h-72 overflow-y-scroll " ref={listref}>
      {list.map(e=>{
        return (
        <li className='todo-item list-decimal mt-4 w-full p-2 '  >
          
         {e}
        <span className='float-right flex gap-2 '>
        <button className='p-2 bg-black rounded-md hover ' onClick={deleter} >Delete</button>
        <input type="checkbox" className='w-6 rounded-md' onChange={checkerbox} />
        </span>
        </li>
       
      )
      })}
      </div>
      <h2 className='ml-4 mt-2 mb-2 '>Tasks Done- {done}</h2>
      <div className="done p-2 list-decimal flex-col  min-w-full overflow-y-scroll">
      {donelist.map(item=>{
        return <li className='done-item mt-4 p-2'>{item}
        <button className='rounded-md bg-black p-2 hover float-right' onClick={revert}>Revert</button>
        </li>
      })}
      </div>
      </div>
     
    </>
  )
}

export default App
