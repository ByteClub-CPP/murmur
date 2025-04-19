interface ObservationViewProps {
  onSelect: (observation: string) => void;
}

const rootObservations = [
  "They are covering their ears",
  "They are crying or sobbing",
  "They went completely quiet",
  "They are rocking back and forth",
  "They are making repetitive sounds",
  "They are refusing to do an activity",
];

export function ObservationView({ onSelect }: ObservationViewProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center">👁️ What are you noticing right now?</h2>
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
      <button
        className="w-full bg-[#A6C4A3] text-white px-6 py-3 rounded-xl hover:bg-[#89B58E] transition-all text-lg font-medium"
        onClick={() => console.log("Next pressed")}
      >
        Next
      </button>
    </div>
  );
}