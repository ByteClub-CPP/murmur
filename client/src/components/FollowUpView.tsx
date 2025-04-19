interface FollowUpViewProps {
  rootObservation: string;
  onSelect: (followUp: string) => void;
}

const followUpOptions: Record<string, string[]> = {
  "They are covering their ears": [
    "The space is loud or chaotic",
    "There was a sudden loud noise",
    "They seem overwhelmed by multiple sounds",
  ],
  "They are crying or sobbing": [
    "They are in physical discomfort",
    "They are frustrated or upset",
    "They are overwhelmed by the environment",
  ],
  "They went completely quiet": [
    "They stopped responding to your voice",
    "They are curled up or hiding",
    "They seem withdrawn or scared",
  ],
};

export function FollowUpView({ rootObservation, onSelect }: FollowUpViewProps) {
  const options = followUpOptions[rootObservation] || [];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center">🔍 What else do you notice?</h2>
      <p className="text-[#7D7C77] text-center">
        You noticed: <span className="font-medium">{rootObservation}</span>
      </p>
      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option}
            className="w-full bg-white border border-[#DAD7D0] rounded-xl p-4 shadow-sm hover:bg-[#F5EFE6] transition-all text-left text-lg"
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="w-full bg-[#A6C4A3] text-white px-6 py-3 rounded-xl hover:bg-[#89B58E] transition-all text-lg font-medium"
        onClick={() => console.log("Get Support pressed")}
      >
        Get Support
      </button>
    </div>
  );
}