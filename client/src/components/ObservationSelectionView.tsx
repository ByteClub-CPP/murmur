interface ObservationSelectionViewProps {
  onSelect: (observation: string) => void;
}

const rootObservations = [
  "They are covering their ears",
  "They are rocking back and forth",
  "They are making repetitive sounds",
  "They are becoming physically aggressive",
  "They are running away",
  "They are crying",
  "They are refusing to do an activity",
];

export function ObservationSelectionView({ onSelect }: ObservationSelectionViewProps) {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#2F2F2F] py-8">
      <div className="max-w-md mx-auto p-6">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-center">👁️ What are you noticing right now?</h2>
          <p className="text-[#7D7C77] text-center">Select the behavior you're observing:</p>
          <div className="space-y-4">
            {rootObservations.map((observation) => (
              <button
                key={observation}
                className="w-full bg-white border border-[#DAD7D0] rounded-xl p-4 shadow-sm hover:bg-[#F5EFE6] transition-all text-left text-lg"
                onClick={() => onSelect(observation)}
              >
                {observation}
              </button>
            ))}
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg">
            Tailwind is working!
          </div>
        </div>
      </div>
    </div>
  );
}