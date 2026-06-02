import { currentUser } from "@clerk/nextjs/server";
import GameClient from "./game-client";

export default async function GamePage() {
  const user = await currentUser();
  const playerName = user?.firstName ?? user?.username ?? "Player";

  return <GameClient playerName={playerName} />;
}
