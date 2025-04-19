interface FollowUpContextViewProps {
  rootObservation: string
  onSelect: (observation: string) => void
}

// Mock data for follow-ups based on root observation
const followUpMap: Record<string, string[]> = {
  "They are covering their ears": [
    "There is loud noise in the environment",
    "There was a sudden unexpected sound",
    "They seem overwhelmed by multiple sounds",
    "This happens during transitions"
  ],
  "They are rocking back and forth": [
    "They appear anxious or stressed",
    "This happens when they're excited",
    "This happens during transitions",
    "This happens in new environments"
  ],
  "They are making repetitive sounds": [
    "This happens when they're focused on something",
    "This happens when they're trying to self-regulate",
    "This happens when they're excited",
    "This happens when they're uncomfortable"
  ],
  "They are becoming physically aggressive": [
    "This happens when they're frustrated",
    "This happens when they can't communicate a need",
    "This happens when they're overwhelmed by sensory input",
    "This happens during transitions"
  ],
  "They are running away": [
    "This happens when they're overwhelmed",
    "This happens when they're scared",
    "This happens when they want to avoid something",
    "This happens when they're excited"
  ],
  "They are crying": [
    "This happens when they're in physical discomfort",
    "This happens when they're frustrated",
    "This happens when they're overwhelmed",
    "This happens when they can't communicate a need"
  ],
  "They are refusing to do an activity": [
    "This activity is new or unfamiliar",
    "This activity involves sensory input they find difficult",
    "They've had a negative experience with this activity before",
    "They're tired or need a break"
  ]
}

export function FollowUpContextView({ rootObservation, onSelect }: FollowUpContextViewProps) {
  // Get follow-up options for the selected root observation
  const followUps = followUpMap[rootObservation] || []
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">🔍 What else do you notice?</h2>
      <p className="text-[#7D7C77] text-sm mb-3">You noticed:</p>
      <div className="bg-white border border-[#DAD7D0] rounded-xl p-3 shadow-sm mb-4">
        {rootObservation}
      </div>
      
      <p className="text-[#7D7C77] text-sm mb-2">Choose one of these:</p>
      <div className="space-y-3">
        {followUps.map((observation) => (
          <button
            key={observation}
            className="w-full bg-white border border-[#DAD7D0] rounded-xl p-4 shadow-sm hover:bg-[#F5EFE6] transition-all text-left"
            onClick={() => onSelect(observation)}
          >
            {observation}
          </button>
        ))}
      </div>
    </div>
  )
}