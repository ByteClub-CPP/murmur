from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from logic.openai_helpers import generate_response_prompt, generate_followup_prompt

router = APIRouter()

# Mock user info
mock_user_context = {
    "userId": "test_user",
    "baseContext": {
        "child_age": 5,
        "diagnosis": "Autism Spectrum Disorder",
        "communication_style": "non-verbal",
        "tone_preference": "gentle"
    }
}

# Input and output schemas
class ObservationInput(BaseModel):
    user_id: str
    observations: list[str]

class FollowupInput(BaseModel):
    user_id: str
    followup_input: str

@router.get("/user-context")
async def get_user_context(user_id: str):
    # In production, you'd query Firestore here
    if user_id != "test_user":
        raise HTTPException(status_code=404, detail="User not found")
    return mock_user_context["baseContext"]

@router.post("/generate-response")
async def generate_response(data: ObservationInput):
    try:
        user_context = mock_user_context["baseContext"]
        result = generate_response_prompt(user_context, data.observations)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-followup")
async def generate_followup(data: FollowupInput):
    try:
        result = generate_followup_prompt(data.followup_input)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))