import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register(){

const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const [loading,setLoading]=useState(false)
const [success,setSuccess]=useState(false)
const navigate = useNavigate()

const register=async(e)=>{

e.preventDefault()

try{

    setLoading(true)
const res=
await axios.post(
`${import.meta.env.VITE_API_URL}/users/register`,
{
username:name,
email,
password
}
)
setLoading(false)
setSuccess(true)

setTimeout(()=>{
    navigate("/login")
    },1200)

}

catch(err){

console.log(err)
setLoading(false)
setSuccess(false)
alert("Register Failed")

}

}

return(

<div className="auth-page">

<div className="auth-card">
<a
href="/" className= "back-home">
← Back to Home
</a>

<h1 style={{marginBottom:"28px"}}>
Create Account ✨
</h1>

<input
type="text"
placeholder="Enter Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Create Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={register}
disabled={loading}
>

{
loading
?
"Creating Account..."
:
"Create Account →"
}

</button>

{
success &&
<p className="success-msg">
✅ Account Created Successfully
</p>
}

</div>

</div>
)

}