import openai
import os

# If you're using a .env file
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")  # or hardcode for now

def generate_response_prompt(user_context, observations):
    prompt = f"""You are an AI helping caregivers of neurodivergent children.
Based on the following context and observations, suggest a calm and supportive response the caregiver can use, plus a follow-up question.

Base Context:
- Age: {user_context['child_age']}
- Diagnosis: {user_context['diagnosis']}
- Communication Style: {user_context['communication_style']}
- Tone Preference: {user_context['tone_preference']}

Observations:
{', '.join(observations)}

Respond in this JSON format:
{{
    "caregiver_response": "...",
    "follow_up_question": "..."
}}
"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    content = response['choices'][0]['message']['content']
    return eval(content)  # Make sure this returns a JSON-parsable string

def generate_followup_prompt(followup_text):
    prompt = f"""A caregiver provided this additional follow-up detail: "{followup_text}"

Given this, provide a refined suggestion for how the caregiver can support their child right now.

Respond in this JSON format:
{{
    "refined_suggestion": "..."
}}
"""
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    content = response['choices'][0]['message']['content']
    return eval(content)
