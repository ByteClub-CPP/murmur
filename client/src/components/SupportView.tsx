interface SupportViewProps {
  response: {
    response: string;
    followUp: string;
  };
  onReset: () => void;
  onRegenerate: () => void;
}

export function SupportView({ response, onReset, onRegenerate }: SupportViewProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center">💬 Suggested Response</h2>
      <div className="bg-white border border-[#DAD7D0] rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-[#7D7C77] text-sm font-medium mb-2">Try saying:</h3>
          <p className="bg-[#F5EFE6] rounded-xl p-4 border border-[#DAD7D0] text-lg">
            {response.response}
          </p>
        </div>
        <div>
          <h3 className="text-[#7D7C77] text-sm font-medium mb-2">Follow-up question:</h3>
          <p className="bg-[#F5EFE6] rounded-xl p-4 border border-[#DAD7D0] text-lg">
            {response.followUp}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="flex-1 bg-[#A6C4A3] text-white px-4 py-3 rounded-xl hover:bg-[#89B58E] transition-all text-lg font-medium"
          onClick={onRegenerate}
        >
          Try Something Else
        </button>
        <button
          className="flex-1 border border-[#A6C4A3] text-[#2F2F2F] px-4 py-3 rounded-xl hover:bg-[#F5EFE6] transition-all text-lg font-medium"
          onClick={onReset}
        >
          Start Over
        </button>
      </div>
    </div>
  );
}