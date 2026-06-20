import { useEffect, useState } from "react"

function Dashboard() {

const [data,setData]=useState({
total:0,
positive:0,
negative:0,
complaints:[]
})

useEffect(()=>{

fetch("http://127.0.0.1:8000/complaints/dashboard",{

headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}

})

.then(res=>res.json())

.then(result=>{

console.log(result)

setData({

total:result.total||0,
positive:result.positive||0,
negative:result.negative||0,
complaints:result.complaints||[]

})

})

.catch(err=>console.log(err))

},[])



return(

<div className="dashboard">

<button
className="logout-btn"
onClick={()=>{

localStorage.removeItem("token")
window.location="/"

}}
>

Logout →

</button>



<h1>Dashboard</h1>

<p className="sub-title">
Complaint Analysis Panel
</p>



<div className="stats">

<div className="stat-card">

<h3>Total</h3>

<span>
{data.total}
</span>

</div>



<div className="stat-card">

<h3>Positive</h3>

<span className="positive">
{data.positive}
</span>

</div>



<div className="stat-card">

<h3>Negative</h3>

<span className="negative">
{data.negative}
</span>

</div>

</div>



<h2 className="history-h2">
Complaint History
</h2>



<div className="history">

{

data.complaints.length===0

?

<p>No complaints yet</p>

:

data.complaints.map((item,index)=>(

<div
key={index}
className="history-card"
>

<h3>

👤

{

item.user
?.split("@")[0]

}

</h3>


<p>

📝

{item.text}

</p>



<div

className={

item.result==="Positive"

?

"badge positive"

:

"badge negative"

}

>

{item.result}

</div>

</div>

))

}

</div>

</div>

)

}

export default Dashboard