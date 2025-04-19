from openai import OpenAI
import os
from dotenv import load_dotenv

# Load .env and set up client
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # or just `client = OpenAI()` if the env variable is already set globally

def generate_response_prompt(user_context, observations):
    prompt = f"""You are an AI helping caregivers of neurodivergent children. Talk to them 
Based on the following context and observations, suggest a calm and supportive response the caregiver can use to ease the current observations, plus ask a follow-up question.

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

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful parenting assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    content = response.choices[0].message.content.strip()
    return eval(content)  # Caution: eval is risky, consider using json.loads with stricter formatting

def generate_followup_prompt(followup_text):
    prompt = f"""The caregiver provided this additional follow-up detail: "{followup_text}"

Given this, provide a refined suggestion for how the caregiver can support their child right now.

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
        return eval(content)  # Safe this time, but consider switching to JSON.loads if needed
    except Exception as e:
        print(f"Error during followup prompt generation: {e}")
        return {"refined_response": "Error in generating follow-up response"}
    
'''
Using eval() is a quick dev hack, but can be dangerous in production. Use this safer version if your model always returns valid JSON:

python
Copy
Edit
import json
# Replace:
# return eval(content)
# With:
return json.loads(content)'''