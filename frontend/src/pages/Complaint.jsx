import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function Complaint(){

const [complaint,setComplaint]=useState("")
const [loading,setLoading]=useState(false)
const navigate = useNavigate();

const [message, setMessage] = useState("");

const analyzeComplaint = async () => {

    try{
    
    setLoading(true)
    
    const token = localStorage.getItem("token")
    
    console.log(token)
    
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints/predict?text=${complaint}`,
        
        null,
        
        {
        headers:{
        Authorization:`Bearer ${token}`
        }
        }
        )
    
        console.log("API RESPONSE:", res.data)

        setMessage("✅ Complaint Saved Successfully")

        setComplaint("")

        setTimeout(()=>{

        navigate("/dashboard")

        },1500)
    
    setLoading(false)
    
    }
    
    catch(err){

      console.log(err)

      setLoading(false)

      setMessage("❌ Failed To Save Complaint")

    }
    
    }

return(

<div className="auth-page">
    <a href="/">
      <button className="logout-btn">
      Logout →
      </button>
      </a>

<div className="auth-card">

<div className="complaint-title">

    


<h1>
Complaint
</h1>

<span>📝</span>

</div>



<textarea
rows="5"
placeholder="Describe your complaint..."
value={complaint}
onChange={(e)=>setComplaint(e.target.value)}
className="complaint-box"
/>

<button
className="complaint-btn"
onClick={analyzeComplaint}
disabled={loading}
>

{
loading
?
"Submitting..."
:
"Submit Complaint →"
}

</button>

{message && (

<div className="success-msg">

{message}

</div>

)}

</div>

</div>

)

}