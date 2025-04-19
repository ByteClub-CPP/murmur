import calmImage from '../assets/calm.jpg';

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
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src={calmImage}
        alt="Calm background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-[#FAF7F2]/90 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-8">
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
        </div>
      </div>
    </div>
  );
}
