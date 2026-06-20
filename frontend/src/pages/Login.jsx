import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api";
import "../App.css"


function Login(){

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const navigate = useNavigate()
const [loading,setLoading]=useState(false)
const [message,setMessage] = useState("")

const login=async()=>{

try{
    setLoading(true)

const res=await api.post(
"/users/login",

new URLSearchParams({
username:email,
password:password
}),

{
headers:{
"Content-Type":
"application/x-www-form-urlencoded"
}
}

)

console.log(res.data)

localStorage.setItem(
"token",
res.data.access_token
)



setTimeout(()=>{
    setLoading(false)
    setMessage("")
    navigate("/complaint")
    },1200)

}

catch(err){

setLoading(false)

localStorage.removeItem("token")

const msg =
err.response?.data?.message ||
err.response?.data?.detail ||
"Wrong email or password"

setMessage(msg)

}



}

return(

<div className="auth-page">

<div className="auth-card">
<a
href="/" className= "back-home">
← Back to Home
</a>

<h1>Welcome Back 👋</h1>

<p>Login to continue</p>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={login}
disabled={loading}
>
{
loading
?
"Logging in..."
:
"Login →"
}
</button>
    {message && (
     <p className="error-msg">
 {message}
</p>
)}
</div>

</div>

)

}

export default Login