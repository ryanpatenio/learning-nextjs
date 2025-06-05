export default function Loading() {
   return (
     <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-20 h-20">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-black opacity-10 animate-ping"></div>

        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-t-4 border-black animate-spin"></div>

        {/* Glowing core (dark aura) */}
        <div className="absolute inset-4 rounded-full bg-black blur-md opacity-40 animate-pulse"></div>

        {/* Solid black core */}
        <div className="absolute inset-6 rounded-full bg-black shadow-md shadow-black/40"></div>
      </div>
    </div>
   )
}