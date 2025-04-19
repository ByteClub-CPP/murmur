import calmImage from '../assets/calm.jpg';

export function LoadingView() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src={calmImage}
        alt="Calm background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-[#FAF7F2]/90 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-6 text-center">
          <h2 className="text-xl font-semibold animate-pulse text-[#2F2F2F]">
            ⏳ Getting support...
          </h2>
          <p className="text-[#7D7C77]">
            Please hold tight while we prepare a suggestion for you.
          </p>

          <div className="flex justify-center py-6">
            <div className="relative w-12 h-12">
              <div className="absolute w-12 h-12 border-4 border-[#A6C4A3] rounded-full opacity-25"></div>
              <div className="absolute w-12 h-12 border-4 border-transparent border-t-[#A6C4A3] rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
