export function LoadingView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2 animate-pulse">⏳ Getting support...</h2>
      <p className="text-[#7D7C77]">Please hold tight while we prepare a suggestion for you.</p>
      
      <div className="flex justify-center py-8">
        <div className="relative w-12 h-12">
          <div className="absolute w-12 h-12 border-4 border-[#A6C4A3] rounded-full opacity-25"></div>
          <div className="absolute w-12 h-12 border-4 border-transparent border-t-[#A6C4A3] rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}