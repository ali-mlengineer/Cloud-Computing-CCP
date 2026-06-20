from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.security import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends

from app.database import get_db
from app.schemas import UserCreate, UserLogin
from app.models import User
from passlib.hash import bcrypt
from app.security import create_access_token


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# password hash
def hash_password(password: str):
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")


import bcrypt
# password verify
def verify_password(
    plain_password: str,
    hashed_password: str
):
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )

# Register:
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    new_user = User(
        username=user.username,
        email=user.email,
        #Hashing Password
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message":"User registered successfully"
    }


# Login:
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:
        return {"message":"User not found"}

    if not verify_password(
        form_data.password,
        user.password
    ):
        return {"message":"Wrong password"}

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type":"bearer"
    }



# Profile : (protected route):
@router.get("/profile")
def profile(
    current_user: str = Depends(get_current_user)
):

    return {
        "message":"Protected route accessed",
        "user": current_user
    }


