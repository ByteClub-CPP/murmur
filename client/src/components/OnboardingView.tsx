import { useState } from 'react'

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
  
  // Second step - just show summary with no input fields
  if (step === 1) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-center mb-2">{currentStep.title}</h2>
        <p className="text-[#7D7C77] mb-6">{currentStep.description}</p>
        
        <button 
          className="w-full bg-[#A6C4A3] text-white px-6 py-2 rounded-xl hover:bg-[#89B58E] transition-all"
          onClick={nextStep}
        >
          Get Started
        </button>
        
        <div className="flex justify-center space-x-2 mt-4">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${step === i ? 'bg-[#A6C4A3]' : 'bg-[#DAD7D0]'}`}
            />
          ))}
        </div>
      </div>
    )
  }
  
  // First step - welcome screen
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">{currentStep.title}</h2>
      <p className="text-[#7D7C77] mb-4">{currentStep.description}</p>
      
      <div className="space-y-3">
        {currentStep.fields.map((field, i) => (
          <div key={i} className="bg-white border border-[#DAD7D0] rounded-xl p-4 shadow-sm">
            <label htmlFor={`field-${i}`} className="block text-[#7D7C77] text-sm mb-1">
              {field.label}
            </label>
            <input 
              id={`field-${i}`}
              className="w-full bg-[#F5EFE6] border border-[#DAD7D0] rounded-xl p-2 shadow-inner focus:outline-none focus:ring-1 focus:ring-[#A6C4A3]"
              value={field.value}
              aria-label={field.label}
              readOnly
            />
          </div>
        ))}
      </div>
      
      <button 
        className="bg-[#A6C4A3] text-white px-6 py-2 rounded-xl hover:bg-[#89B58E] transition-all"
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  )
}