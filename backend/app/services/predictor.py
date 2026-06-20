import pickle
import os

BASE_DIR = os.path.dirname(__file__)

with open(os.path.join(BASE_DIR, "model.pkl"), "rb") as f:
    model = pickle.load(f)

with open(os.path.join(BASE_DIR, "vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)


def predict_complaint(text):

    transformed = vectorizer.transform([text])

    prediction = model.predict(transformed)[0]

    if int(prediction) == 0:
       return "Negative"

    return "Positive"

    