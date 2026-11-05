require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const season6 = {
  seasonNumber: 6,
  title: "BOS Season 6",
  status: "Completed",

  standingsColumns: [
    { key: "matches", label: "Matches" },
    { key: "wins", label: "Win" },
    { key: "losses", label: "Lose" },
    { key: "roundPoints", label: "Round Points" },
    { key: "totalPoints", label: "Total Points" }
  ],

  standings: [],

  groups: [
    {
      name: "Group A",
      teams: [
        { rank: 1, name: "Ans Gaming", stats: { matches: 14, wins: 13, losses: 1, roundPoints: 91, totalPoints: 52 }, status: "Q" },
        { rank: 2, name: "Vortex Gaming", stats: { matches: 14, wins: 12, losses: 2, roundPoints: 82, totalPoints: 48 }, status: "Q" },
        { rank: 3, name: "OTC", stats: { matches: 14, wins: 8, losses: 6, roundPoints: 32, totalPoints: 32 }, status: "Q" },
        { rank: 4, name: "Vinay Gaming", stats: { matches: 14, wins: 7, losses: 7, roundPoints: 3, totalPoints: 28 }, status: "Q" },
        { rank: 5, name: "Agent 03", stats: { matches: 14, wins: 7, losses: 7, roundPoints: -2, totalPoints: 28 }, status: "Q" },
        { rank: 6, name: "The Shield", stats: { matches: 14, wins: 6, losses: 8, roundPoints: -20, totalPoints: 24 }, status: "E" },
        { rank: 7, name: "Smarty Boy", stats: { matches: 14, wins: 2, losses: 12, roundPoints: -86, totalPoints: 8 }, status: "E" },
        { rank: 8, name: "Night Hunters", stats: { matches: 14, wins: 1, losses: 13, roundPoints: -100, totalPoints: 4 }, status: "E" }
      ]
    },
    {
      name: "Group B",
      teams: [
        { rank: 1, name: "MRAK", stats: { matches: 14, wins: 13, losses: 1, roundPoints: 107, totalPoints: 56 }, status: "Q" },
        { rank: 2, name: "Sky Shooter", stats: { matches: 14, wins: 10, losses: 4, roundPoints: 52, totalPoints: 40 }, status: "Q" },
        { rank: 3, name: "Dark Hunter", stats: { matches: 14, wins: 9, losses: 5, roundPoints: 34, totalPoints: 36 }, status: "Q" },
        { rank: 4, name: "Krack Gaming", stats: { matches: 14, wins: 7, losses: 7, roundPoints: -4, totalPoints: 28 }, status: "Q" },
        { rank: 5, name: "Gamer Aadi", stats: { matches: 14, wins: 5, losses: 9, roundPoints: -24, totalPoints: 20 }, status: "Q" },
        { rank: 6, name: "The Legend", stats: { matches: 14, wins: 3, losses: 11, roundPoints: -68, totalPoints: 12 }, status: "E" },
        { rank: 7, name: "Blue Devil", stats: { matches: 14, wins: 3, losses: 11, roundPoints: -68, totalPoints: 12 }, status: "E" },
        { rank: 8, name: "Death Gun", stats: { matches: 14, wins: 2, losses: 12, roundPoints: -89, totalPoints: 8 }, status: "E" }
      ]
    }
  ],

  matches: [],
  playoffs: null
};

async function seedSeason6() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

// Convert Group A and Group B teams into the schema-supported standings format
season6.standings = season6.groups.flatMap((group) =>
  group.teams.map((team) => ({
    ...team,
    group: group.name.replace("Group ", "")
  }))
);

// Remove unsupported groups property
delete season6.groups;

await Season.updateOne(
  { seasonNumber: 6 },
  {
    $set: season6
  },
  { upsert: true, runValidators: true }
);

    console.log("BOS Season 6 standings saved successfully.");
    console.log("Group A and Group B saved.");
    console.log("Only Season 6 was targeted.");
    console.log("Season 6 matches and playoffs are not added yet.");
    console.log("Other seasons were not targeted.");
  } catch (error) {
    console.error("Season 6 seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason6();
