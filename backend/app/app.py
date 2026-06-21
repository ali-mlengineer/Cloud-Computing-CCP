from fastapi import FastAPI
from app.routes import users, complaints
from app.database import engine, Base
from app import models


app = FastAPI(title="AI Powered Virtual Try-On API")

# connecting frontend:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
CORSMiddleware,

allow_origins=[
"https://complaint-frontend-poqr.onrender.com"
],

allow_credentials=True,

allow_methods=["*"],

allow_headers=["*"]
)

# Database tables create
Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(complaints.router)


@app.get("/")
def home():
    return {
        "message":"AI Virtual Try ON Backend Running"
    }