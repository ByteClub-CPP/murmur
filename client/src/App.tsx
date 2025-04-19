import { useState } from 'react'
import { OnboardingView } from './components/OnboardingView'
import { ObservationSelectionView } from './components/ObservationSelectionView'
import { FollowUpContextView } from './components/FollowUpContextView'
import { SupportView } from './components/SupportView'
import { LoadingView } from './components/LoadingView'

// App flow stages
type AppStage = 'onboarding' | 'observation' | 'followUp' | 'support' | 'loading'

// Base context interface
interface BaseContext {
  caregiverName: string
  childName: string
  childAgeRange: string
  diagnoses: string[]
  communicationStyle: string
  language: string
}

// Demo base context (pre-filled data)
const demoBaseContext: BaseContext = {
  caregiverName: 'Alex',
  childName: 'Sam',
  childAgeRange: '4-6',
  diagnoses: ['autism'],
  communicationStyle: 'non-verbal',
  language: 'English (US)'
}

function App() {
  // State for tracking app flow
  const [stage, setStage] = useState<AppStage>('onboarding')
  // Base context for the caregiver and child
  const [baseContext, setBaseContext] = useState<BaseContext>(demoBaseContext)
  // Selected observations through the tree
  const [selectedObservations, setSelectedObservations] = useState<string[]>([])
  // LLM generated response
  const [supportResponse, setSupportResponse] = useState<{ response: string, followUp: string } | null>(null)

  // Handle stage transitions
  const nextStage = (next: AppStage) => {
    setStage(next)
  }

  // Select an observation
  const selectObservation = (observation: string) => {
    setSelectedObservations([...selectedObservations, observation])
  }

  // Reset observations
  const resetObservations = () => {
    setSelectedObservations([])
  }

  // Generate AI response (simulated for now)
  const generateResponse = async () => {
    setStage('loading')
    
    // Simulate API call delay
    setTimeout(() => {
      setSupportResponse({
        response: "I notice Sam is covering their ears. The environment might be too loud for them right now.",
        followUp: "Could we try moving to a quieter space or offering noise-cancelling headphones?"
      })
      setStage('support')
    }, 2000)
  }

  // Render the appropriate view based on current stage
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#2F2F2F] py-8">
      <div className="max-w-md mx-auto p-6">
        {stage === 'onboarding' && (
          <OnboardingView 
            baseContext={baseContext} 
            onComplete={() => nextStage('observation')}
          />
        )}
        
        {stage === 'observation' && (
          <ObservationSelectionView
            onSelect={(observation) => {
              selectObservation(observation)
              nextStage('followUp')
            }}
          />
        )}
        
        {stage === 'followUp' && (
          <FollowUpContextView
            rootObservation={selectedObservations[0]}
            onSelect={(observation: string) => {
              selectObservation(observation);
              generateResponse();
            }}
          />
        )}
        
        {stage === 'support' && supportResponse && (
          <SupportView
            response={supportResponse}
            onReset={() => {
              resetObservations()
              nextStage('observation')
            }}
            onRegenerate={generateResponse}
          />
        )}
        
        {stage === 'loading' && <LoadingView />}
      </div>
    </div>
  )
}

export default App
