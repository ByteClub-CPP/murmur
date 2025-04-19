import { useState } from 'react'
import calmImage from '../assets/calm.jpg'

interface BaseContext {
  caregiverName: string
  childName: string
  childAgeRange: string
  diagnoses: string[]
  communicationStyle: string
  language: string
}

interface OnboardingViewProps {
  baseContext: BaseContext
  onComplete: () => void
}

export function OnboardingView({ baseContext, onComplete }: OnboardingViewProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "👋 Welcome to Murmur",
      description: `Hello ${baseContext.caregiverName}, let's get started with some basic information.`,
      fields: [
        { label: "Your name", value: baseContext.caregiverName },
        { label: "Child's name", value: baseContext.childName }
      ]
    },
    {
      title: `About ${baseContext.childName}`,
      description: `You're caring for ${baseContext.childName}, a ${baseContext.childAgeRange} year-old ${baseContext.communicationStyle} child diagnosed with ${baseContext.diagnoses.join(", ")}.`,
      fields: []
    }
  ]

  const currentStep = steps[step]

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="relative max-w-md mx-auto h-screen overflow-hidden rounded-2xl shadow-lg">
      <img
        src={calmImage}
        alt="Calm background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 bg-[#F9F8F4]/90 backdrop-blur-md p-6 m-4 rounded-2xl space-y-6 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-[#444]">{currentStep.title}</h2>
        <p className="text-[#7D7C77] text-center">{currentStep.description}</p>

        {currentStep.fields.length > 0 && (
          <div className="space-y-4">
            {currentStep.fields.map((field, i) => (
              <div
                key={i}
                className="bg-white border border-[#DAD7D0] rounded-xl p-4 shadow-sm"
              >
                <label
                  htmlFor={`field-${i}`}
                  className="block text-[#7D7C77] text-sm font-medium mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={`field-${i}`}
                  className="w-full bg-[#F5EFE6] border border-[#DAD7D0] rounded-xl p-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#A6C4A3]"
                  value={field.value}
                  aria-label={field.label}
                  readOnly
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={nextStep}
          className="w-full bg-[#A6C4A3] text-white font-semibold py-3 rounded-xl hover:bg-[#89B58E] transition-all"
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
        </button>

        <div className="flex justify-center gap-2 mt-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                step === i ? 'bg-[#A6C4A3]' : 'bg-[#DAD7D0]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
