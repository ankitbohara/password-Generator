import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [CharacterAllowed, setCharacterAllowed] = useState(false)
  const [Password, setPassword] = useState("")
  //useRef: ek aur React Hook hai jo React components me istemal hota hai, lekin iska primary use case component ke render lifecycle se bahar DOM elements ya values ko reference karne mein hota hai. Yani ki useRef ek reference ko create karta hai jo component ke lifecycle se unaffected hota hai aur aap us reference ko istemal karke DOM elements ya kisi value ko store aur access kar sakte hain.                                                      m useRef ek object return karta hai jisme ek current property hoti hai. Aap is current property ko istemal karke value ko store aur access kar sakte hain. Is reference ko aap component ke puri lifecycle me istemal kar sakte hain, lekin iska re-rendering se koi prabhav nahi hota.
  
  
  const passwordRef = useRef(null)
//use callback: ek React Hook hai jo React me state management aur performance optimization ke liye istemal hota hai. useCallback ka upayog aksar event handlers ko ya child components ko optimize karne ke liye hota hai. Iska upayog kisi function ko memoize karke kiya jata hai, jisse wo function bar-bar re-render hone par bhi same reference rakhe.
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(CharacterAllowed) str += "!@#$%*&_"
    for (let i = 1; i <=length; i++) {
      const char = Math.floor(Math.random()*str.length+1) ;
      pass += str.charAt(char)
    
      setPassword(pass)
    } 
  }, [length, numAllowed, CharacterAllowed,setPassword])

 const copyPassword = useCallback(()=>{
  passwordRef.current?.select()
  //copy to clipboard:
 window.navigator.clipboard.writeText(Password)
 }, [Password])

//  useEffect  bhi ek React Hook hai jo React component me side effects ko handle karne ke liye istemal hota hai useEffect ek function hai jo do arguments leta hai. Pehla argument ek callback function hota hai, jise effect function ke roop mein refer kiya jata hai. Dusra argument ek array hota hai jo dependencies ko darust karti hai. Dependencies array me un variables ya values ka list hota hai jinpar effect function depend karta hai. Yadi dependencies me koi bhi value change hoti hai, to effect function dubara chalega.

 useEffect(()=>{
  passwordGenerator()
 },[length,numAllowed,CharacterAllowed, setPassword])

  return (
    <>
      <div className='bg-gray-700 text-orange-400 w-full shadow-md max-w-md  mx-auto rounded-lg px-4 py-3 my-8'>
        <h1 className='text-center text-white'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
      type="text"
      value={Password}
      placeholder='password'
      className='py-1 outline-none w-full px-3 overflow-hidden'
        readOnly
        ref={passwordRef}/>

       <button onClick={copyPassword} 
       className='bg-sky-500 text-white px-3 py-1'>Copy</button>
      </div>
      
      <div className='flex items-center gap-x-2'>
        <div className='flex text-sm gap-x-2'>
          <input 
          type="range"  
          value={length}
          min={8}
          max={100}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label >Length: {length}</label>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input type="checkbox" 
          onChange={(e)=>{setNumAllowed((prev)=>!prev)}}
          defaultChecked = {numAllowed} />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input type="checkbox"
          onChange={(e)=>{setCharacterAllowed((prev)=>!prev)}}
          defaultChecked={setCharacterAllowed} />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>


      </div>
    </>
  )
}

export default App
