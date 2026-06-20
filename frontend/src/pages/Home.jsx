function Home() {
    return (
      <div
        style={{
          background: "#0f172a",
          color: "white",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Complaint Analysis System 🔥</h1>
  
        <p>AI Powered Complaint Sentiment Analysis</p>
  
        <div style={{ marginTop: "35px", display: "flex", gap: "18px" }}>

<a href="/login">
  <button className="hero-btn signin">
    Sign In →
  </button>
</a>

<a href="/register">
  <button className="hero-btn signup">
    Create Account ✨
  </button>
</a>

</div>
      </div>
    );
  }
  
  export default Home;