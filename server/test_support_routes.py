from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_generate_response():
    payload = {
        "user_id": "mockUser123",
        "observations": [
            "They are covering their ears",
            "They are avoiding eye contact"
        ]
    }

    response = client.post("/generate-response", json=payload)
    
    # Debug output
    print("Status Code:", response.status_code)
    print("Response Text:", response.text)

    assert response.status_code == 200, f"Failed with status: {response.status_code}\nResponse: {response.text}"
    data = response.json()
    assert "caregiver_response" in data
    assert "follow_up_question" in data
    print("✅ /generate-response test passed")
    print(data)



def test_followup_response():
    payload = {
        "user_id": "mockUser123",
        "followup_input": "Try using a visual schedule next time"
    }

    response = client.post("/followup-response", json=payload)

    # Debug output
    print("Status Code:", response.status_code)
    print("Response Text:", response.text)

    assert response.status_code == 200, f"Failed with status: {response.status_code}\nResponse: {response.text}"
    data = response.json()
    assert "refined_suggestion" in data  # ✅ correct already
    print("✅ /followup-response test passed")
    print(data)

if __name__ == "__main__":
    test_generate_response()
    test_followup_response()
    