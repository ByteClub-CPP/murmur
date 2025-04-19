# 🫧 Murmur

**Murmur** is a real-time support tool for caregivers of neurodivergent children. It guides users through emotionally intense moments by helping them identify observable behavior and receive trauma-informed, empathetic responses generated via AI.

---

## 🧠 Purpose

Murmur aims to improve caregiver-child communication by:
- Guiding caregivers through structured, observation-based prompts
- Generating helpful, real-time language and behavioral insights using LLMs
- Supporting co-regulation and empathy during difficult moments

---

## ⚙️ How It Works (MVP)

1. **Onboarding**: Users answer a short questionnaire about their child to create a personalized `BaseContext` (e.g., age, diagnosis, communication style, tone preference).
2. **Observation Selection**: During a challenging moment, the user selects from a curated list of observable behaviors (e.g., "They are covering their ears"). These come from a static, Firestore-hosted **Situational Context Tree (SCT)**.
3. **Prompt Generation**: The app combines the `BaseContext` and selected observations into a structured prompt, which is sent to OpenAI's API.
4. **AI Response**: The backend returns a **brief suggested caregiver response** and a **follow-up question**, which are displayed in the app.
5. *(Optional)*: The user can provide feedback or request a refined suggestion.

---

## 🧱 Tech Stack

### 🖥️ Frontend (`console/`)
- **React** with **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Axios** (for API requests)
- Loads and displays:
  - Observation prompts (from Firestore)
  - User responses (from backend API)
  - Calming and accessible UI

### 🔧 Backend (`server/`)
- **Python** + **FastAPI**
- Receives base context + user-selected observations
- Generates and sends a structured prompt to the **OpenAI API**
- Returns: suggested caregiver response + follow-up question

### 📦 Database (Firebase Firestore)
- **BaseContext**: stored per user in `/users/{userId}/baseContext`
- **Situational Context Trees (SCTs)**: static, app-wide trees stored in `/contextTrees/`, loaded by the frontend
- No per-session or chat data is stored for MVP

---

## 🛠 Developer Notes

- The situational context tree is **read-only** and should be structured as a nested JSON object with:
  - `prompt`: the current question
  - `options`: an array of choices, each with a `label`, `value`, and optional `followUp`
- The frontend builds a list of selected observations which, together with the base context, forms the basis for the AI prompt
- All LLM interactions are handled by the backend to avoid exposing the API key

---

## 💻 To Run Client

```bash
cd client
npm install
npm run dev
```

## 🛜 To Run Server
```bash
cd server
uvicorn main:app --reload
```

---

## 🗂️ Data & State Management

### 🔹 Base Context (User-specific)
During onboarding, each user submits a `baseContext` that is stored in Firestore at:

This includes: `/users/{userId}/baseContext`

```json
{
  "caregiverName": "Alex",
  "childName": "Sam",
  "childAgeRange": "4–6",
  "diagnoses": ["autism"],
  "communicationStyle": "non-verbal",
  "language": "English (US)"
}
##youtube link: https://youtu.be/yGCSw11w2pc

