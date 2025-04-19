from openai import OpenAI
import os
from dotenv import load_dotenv
import json  # Safer JSON parsing

# Load .env and set up client
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # or just `client = OpenAI()` if the env variable is already set globally

def generate_response_prompt(user_context, observations):
    prompt = f"""You are an AI helping caregivers of neurodivergent children. Based on the following context and observations, suggest a calm and supportive response the caregiver can use to ease the current observations, plus ask a follow-up question.

Base Context:
- Caregiver Name: {user_context['caregiver_name']}
- Child Name: {user_context['child_name']}
- Child Age Range: {user_context['child_age_range']}
- Diagnoses: {', '.join(user_context['diagnoses'])}
- Communication Style: {user_context['communication_style']}
- Language: {user_context['language']}

Observations:
{', '.join(observations)}

Respond in this JSON format:
{{
    "caregiver_response": "...",
    "follow_up_question": "..."
}}
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful parenting assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    content = response.choices[0].message.content.strip()
    try:
        return json.loads(content)  # Use json.loads to safely parse the response
    except Exception as e:
        print(f"Error parsing response: {e}")
        return {"caregiver_response": "Sorry, I couldn't generate a response.", "follow_up_question": ""}

def generate_followup_prompt(followup_text, user_context):
    prompt = f"""The caregiver provided this additional follow-up detail: "{followup_text}"

Given this, provide a refined suggestion for how the caregiver can support their child right now. Consider the following user context:

Base Context:
- Caregiver Name: {user_context['caregiver_name']}
- Child Name: {user_context['child_name']}
- Child Age Range: {user_context['child_age_range']}
- Diagnoses: {', '.join(user_context['diagnoses'])}
- Communication Style: {user_context['communication_style']}
- Language: {user_context['language']}

Respond in this JSON format:
{{
    "refined_suggestion": "..."
}}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful parenting assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        content = response.choices[0].message.content.strip()
        return json.loads(content)  # Use json.loads to safely parse the response
    except Exception as e:
        print(f"Error during followup prompt generation: {e}")
        return {"refined_suggestion": "Error in generating follow-up response"}
