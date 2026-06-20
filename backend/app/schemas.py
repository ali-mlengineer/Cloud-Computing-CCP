from pydantic import BaseModel

# Register Schema:
class UserCreate(BaseModel):
    username:str
    email:str
    password:str


# Login Schema:
class UserLogin(BaseModel):
    email: str
    password: str