import TurnBar from "@/features/game/components/turn-bar";

export default function GamePage() {
  return (
    <main className="flex min-h-screen flex-col gap-3 bg-neutral-100 p-4">
      {/* Turn bar — full width */}
      {"Turn Bar will display here"}
      <TurnBar />

      {/* Three panels */}
      <div className="grid flex-1 grid-cols-3 gap-3">
        {"Player Hand Panel will display here"}

        {"Lab Bench will display here"}

        {"PlayerPanel will display here"}
      </div>
    </main>
  );
}
