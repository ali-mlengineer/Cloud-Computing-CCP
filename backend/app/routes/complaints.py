from fastapi import APIRouter, Depends
from app.services.predictor import predict_complaint 
from app.security import get_current_user
from app.services.predictor import predict_complaint
from app.database import SessionLocal
from app.models import ComplaintHistory, User

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)

@router.post("/predict")
def predict(
        text: str,
        current_user: str = Depends(get_current_user)):
        
     db = SessionLocal()

     prediction = predict_complaint(text)

     record = ComplaintHistory(
            user=current_user,
            text=text,
            prediction=prediction
        )

     db.add(record)

     db.commit()

     db.close()

     return {
            "user": current_user,
            "text": text,
            "prediction": prediction
        }


# history:
@router.get("/history")

def history(
    current_user: str = Depends(get_current_user)
):

    db = SessionLocal()

    data = (
        db.query(ComplaintHistory)
        .filter(
            ComplaintHistory.user == current_user
        )
        .all()
    )

    db.close()

    return data



# Dashboard : (protected route):
@router.get("/dashboard")

def dashboard():

    db = SessionLocal()

    complaints = db.query(
        ComplaintHistory
    ).all()


    total = len(complaints)


    positive = sum(
        1
        for c in complaints
        if c.prediction=="Positive"
    )

    negative = sum(
        1
        for c in complaints
        if c.prediction=="Negative"
    )


    return {

    "total": total,

    "positive": positive,

    "negative": negative,

    "complaints": [

        {
            "user": c.user,
            "text": c.text,
            "result": c.prediction

        }

        for c in complaints
    ]
}