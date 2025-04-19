from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from logic.openai_helpers import generate_response_prompt, generate_followup_prompt

router = APIRouter()

# Mock user info for testing/demo
mock_user_context = {
    "userId": "test_user",
    "baseContext": {
        "caregiver_name": "Alex",
        "child_name": "Sam",
        "child_age_range": "4–6",
        "diagnoses": ["autism"],
        "communication_style": "non-verbal",
        "language": "English (US)"
    }
}

# Input/Output Schemas
class ObservationInput(BaseModel):
    user_id: str
    observations: list[str]

class FollowupInput(BaseModel):
    user_id: str
    followup_input: str

class UserInfo(BaseModel):
    user_id: str
    caregiver_name: str
    child_name: str
    child_age_range: str
    diagnoses: list[str]
    communication_style: str
    language: str

@router.get("/user-context")
async def get_user_context(user_id: str):
    if user_id != mock_user_context["userId"]:
        raise HTTPException(status_code=404, detail="User not found")
    return mock_user_context["baseContext"]

@router.post("/user-context")
async def set_user_context(user_info: UserInfo):
    try:
        mock_user_context["userId"] = user_info.user_id
        mock_user_context["baseContext"] = {
            "caregiver_name": user_info.caregiver_name,
            "child_name": user_info.child_name,
            "child_age_range": user_info.child_age_range,
            "diagnoses": user_info.diagnoses,
            "communication_style": user_info.communication_style,
            "language": user_info.language
        }
        return {"message": "User context updated successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-response")
async def generate_response(data: ObservationInput):
    try:
        user_context = mock_user_context["baseContext"]
        result = generate_response_prompt(user_context, data.observations)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/followup-response")
async def generate_followup(data: FollowupInput):
    try:
        user_context = mock_user_context["baseContext"]
        result = generate_followup_prompt(data.followup_input, user_context)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
