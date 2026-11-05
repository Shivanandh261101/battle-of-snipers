
require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const season3 = {
  seasonNumber: 3,
  title: "BOS Season 3",
  status: "Completed",

  standingsColumns: [
    { key: "matches", label: "Matches" },
    { key: "wins", label: "Win" },
    { key: "losses", label: "Lose" },
    { key: "points", label: "Points" },
    { key: "status", label: "Status" }
  ],

  standings: [
    { rank: 1, name: "Ans Gaming", stats: { matches: 14, wins: 14, losses: 0, points: 121 }, status: "Q" },
    { rank: 2, name: "Loveguru Gaming", stats: { matches: 14, wins: 10, losses: 4, points: 56 }, status: "Q" },
    { rank: 3, name: "CG Squad", stats: { matches: 14, wins: 9, losses: 5, points: 32 }, status: "Q" },
    { rank: 4, name: "Loveboy Gaming", stats: { matches: 14, wins: 9, losses: 5, points: 22 }, status: "Q" },
    { rank: 5, name: "Ghost Gamer", stats: { matches: 14, wins: 8, losses: 6, points: 20 }, status: "E" },
    { rank: 6, name: "Team BG", stats: { matches: 14, wins: 6, losses: 8, points: -4 }, status: "E" },
    { rank: 7, name: "FF Gamer", stats: { matches: 14, wins: 7, losses: 7, points: -7 }, status: "E" },
    { rank: 8, name: "TG Esports", stats: { matches: 14, wins: 4, losses: 10, points: -43 }, status: "E" },
    { rank: 9, name: "Romeo Gaming", stats: { matches: 14, wins: 2, losses: 12, points: -90 }, status: "E" },
    { rank: 10, name: "Krack Gaming", stats: { matches: 14, wins: 1, losses: 13, points: -91 }, status: "E" }
  ],

  matches: [],
  playoffs: null
};

async function seedSeason3() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await Season.updateOne(
      { seasonNumber: 3 },
      { $set: season3 },
      { upsert: true, runValidators: true }
    );

    console.log("BOS Season 3 standings saved successfully.");
    console.log("Season 1, Season 2 and Season 7 data were not targeted.");
  } catch (error) {
    console.error("Season 3 seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason3();
