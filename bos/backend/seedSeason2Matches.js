
require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const matches = [
  {
    matchNumber: 1,
    date: "10/06/2022",
    winner: "Aryan Gaming",
    teams: [
      { rank: 1, teamName: "Aryan Gaming", kp: 3, pp: 8 },
      { rank: 2, teamName: "Hunter Gaming", kp: 0, pp: 7 },
      { rank: 3, teamName: "Toxic Gamers", kp: 1, pp: 6 },
      { rank: 4, teamName: "7 Bantai", kp: 1, pp: 5 },
      { rank: 5, teamName: "Dynamo Gaming", kp: 0, pp: 4 },
      { rank: 6, teamName: "FF Gamers", kp: 2, pp: 3 },
      { rank: 7, teamName: "Night Hunters", kp: 0, pp: 2 },
      { rank: 8, teamName: "Dark Hunter", kp: 0, pp: 1 }
    ]
  },
  {
    matchNumber: 2,
    date: "10/06/2022",
    winner: "Hunter Gaming",
    teams: [
      { rank: 1, teamName: "Hunter Gaming", kp: 2, pp: 8 },
      { rank: 2, teamName: "FF Gamers", kp: 1, pp: 7 },
      { rank: 3, teamName: "Night Hunters", kp: 1, pp: 6 },
      { rank: 4, teamName: "7 Bantai", kp: 0, pp: 5 },
      { rank: 5, teamName: "Aryan Gaming", kp: 1, pp: 4 },
      { rank: 6, teamName: "Dark Hunter", kp: 1, pp: 3 },
      { rank: 7, teamName: "Dynamo Gaming", kp: 1, pp: 2 },
      { rank: 8, teamName: "Toxic Gamers", kp: 0, pp: 1 }
    ]
  },
  {
    matchNumber: 3,
    date: "11/06/2022",
    winner: "7 Bantai",
    teams: [
      { rank: 1, teamName: "7 Bantai", kp: 4, pp: 8 },
      { rank: 2, teamName: "Dark Hunter", kp: 0, pp: 7 },
      { rank: 3, teamName: "FF Gamers", kp: 0, pp: 6 },
      { rank: 4, teamName: "Night Hunter", kp: 1, pp: 5 },
      { rank: 5, teamName: "Dynamo Gaming", kp: 0, pp: 4 },
      { rank: 6, teamName: "Toxic Gamers", kp: 1, pp: 3 },
      { rank: 7, teamName: "Aryan Gaming", kp: 1, pp: 2 },
      { rank: 8, teamName: "Hunter Gaming", kp: 0, pp: 1 }
    ]
  },
  {
    matchNumber: 4,
    date: "11/06/2022",
    winner: "FF Gamers",
    teams: [
      { rank: 1, teamName: "FF Gamers", kp: 1, pp: 8 },
      { rank: 2, teamName: "Hunter Gaming", kp: 3, pp: 7 },
      { rank: 3, teamName: "Toxic Gamers", kp: 0, pp: 6 },
      { rank: 4, teamName: "Aryan Gaming", kp: 2, pp: 5 },
      { rank: 5, teamName: "Dynamo Gaming", kp: 1, pp: 4 },
      { rank: 6, teamName: "Dark Hunter", kp: 0, pp: 3 },
      { rank: 7, teamName: "7 Bantai", kp: 0, pp: 2 },
      { rank: 8, teamName: "Night Hunters", kp: 0, pp: 1 }
    ]
  },
  {
    matchNumber: 5,
    date: "12/06/2022",
    winner: "Toxic Gamers",
    teams: [
      { rank: 1, teamName: "Toxic Gamers", kp: 2, pp: 8 },
      { rank: 2, teamName: "Aryan Gaming", kp: 1, pp: 7 },
      { rank: 3, teamName: "FF Gamers", kp: 1, pp: 6 },
      { rank: 4, teamName: "Night Hunters", kp: 1, pp: 5 },
      { rank: 5, teamName: "7 Bantai", kp: 1, pp: 4 },
      { rank: 6, teamName: "Dynamo Gaming", kp: 0, pp: 3 },
      { rank: 7, teamName: "Hunter Gaming", kp: 1, pp: 2 },
      { rank: 8, teamName: "Dark Hunter", kp: 0, pp: 1 }
    ]
  },
  {
    matchNumber: 6,
    date: "12/06/2022",
    winner: "FF Gamers",
    teams: [
      { rank: 1, teamName: "FF Gamers", kp: 1, pp: 8 },
      { rank: 2, teamName: "Toxic Gamers", kp: 2, pp: 7 },
      { rank: 3, teamName: "Night Hunter", kp: 1, pp: 6 },
      { rank: 4, teamName: "7 Bantai", kp: 0, pp: 5 },
      { rank: 5, teamName: "Dark Hunter", kp: 1, pp: 4 },
      { rank: 6, teamName: "Hunter Gaming", kp: 1, pp: 3 },
      { rank: 7, teamName: "Aryan Gaming", kp: 1, pp: 2 },
      { rank: 8, teamName: "Dynamo Gaming", kp: 0, pp: 1 }
    ]
  }
];

async function seedSeason2Matches() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 2 },
      { $set: { matches } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new Error(
        "Season 2 not found. Save Season 2 standings first."
      );
    }

    console.log("Season 2: all 6 matches saved.");
    console.log("Season 1 was not changed.");
  } catch (error) {
    console.error("Failed to save Season 2 matches:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason2Matches();
