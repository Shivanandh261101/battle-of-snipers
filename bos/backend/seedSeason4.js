require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const season4 = {
  seasonNumber: 4,
  title: "BOS Season 4",
  status: "Completed",

  standingsColumns: [
    { key: "matches", label: "Matches" },
    { key: "wins", label: "Win" },
    { key: "losses", label: "Lose" },
    { key: "points", label: "Points" }
  ],

  standings: [
    // GROUP A
    { group: "A", rank: 1, name: "Ans Gaming", matches: 11, wins: 9, losses: 2, points: 55, status: "Q" },
    { group: "A", rank: 2, name: "Madhubhai Gaming", matches: 11, wins: 8, losses: 3, points: 52, status: "Q" },
    { group: "A", rank: 3, name: "God Killer", matches: 11, wins: 9, losses: 2, points: 49, status: "Q" },
    { group: "A", rank: 4, name: "Team Legend", matches: 11, wins: 8, losses: 3, points: 42, status: "Q" },
    { group: "A", rank: 5, name: "Rowdy Gaming", matches: 11, wins: 6, losses: 5, points: 15, status: "Q" },
    { group: "A", rank: 6, name: "No Name Esports", matches: 11, wins: 6, losses: 5, points: 11, status: "Q" },
    { group: "A", rank: 7, name: "Vortex Gaming", matches: 11, wins: 6, losses: 5, points: 0, status: "Q" },
    { group: "A", rank: 8, name: "Bunny Gaming", matches: 11, wins: 4, losses: 7, points: -12, status: "Q" },
    { group: "A", rank: 9, name: "Gsg Gamer", matches: 11, wins: 4, losses: 7, points: -17, status: "E" },
    { group: "A", rank: 10, name: "Krack Gaming", matches: 11, wins: 4, losses: 7, points: -24, status: "E" },
    { group: "A", rank: 11, name: "Ssp Gaming", matches: 11, wins: 2, losses: 9, points: -57, status: "E" },
    { group: "A", rank: 12, name: "Opnikhil", matches: 11, wins: 0, losses: 11, points: -104, status: "E" },

    // GROUP B
    { group: "B", rank: 1, name: "Lost Angel", matches: 11, wins: 9, losses: 2, points: 66, status: "Q" },
    { group: "B", rank: 2, name: "Blood Line", matches: 11, wins: 8, losses: 3, points: 43, status: "Q" },
    { group: "B", rank: 3, name: "Loveguru Gaming", matches: 11, wins: 9, losses: 2, points: 38, status: "Q" },
    { group: "B", rank: 4, name: "Shivtej Warrior", matches: 11, wins: 7, losses: 4, points: 28, status: "Q" },
    { group: "B", rank: 5, name: "Total Gaming", matches: 11, wins: 6, losses: 5, points: 17, status: "Q" },
    { group: "B", rank: 6, name: "Anil Gaming", matches: 11, wins: 6, losses: 5, points: 9, status: "Q" },
    { group: "B", rank: 7, name: "Team Joker", matches: 11, wins: 5, losses: 6, points: -2, status: "Q" },
    { group: "B", rank: 8, name: "Night Hunters", matches: 11, wins: 5, losses: 6, points: -10, status: "Q" },
    { group: "B", rank: 9, name: "West Coast", matches: 11, wins: 5, losses: 6, points: -12, status: "E" },
    { group: "B", rank: 10, name: "Malli Gaming", matches: 11, wins: 4, losses: 7, points: -18, status: "E" },
    { group: "B", rank: 11, name: "Ysp Gaming", matches: 11, wins: 2, losses: 9, points: -56, status: "E" },
    { group: "B", rank: 12, name: "7Bantai", matches: 11, wins: 0, losses: 11, points: -106, status: "E" }
  ],

  matches: [],
  playoffs: null
};

async function seedSeason4() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await Season.updateOne(
      { seasonNumber: 4 },
      {
        $set: {
          title: season4.title,
          status: season4.status,
          standingsColumns: season4.standingsColumns,
          standings: season4.standings
        },
        $setOnInsert: {
          seasonNumber: 4,
          matches: [],
          playoffs: null
        }
      },
      { upsert: true, runValidators: true }
    );

    console.log("BOS Season 4 standings saved successfully.");
    console.log("Group A: 12 teams | Group B: 12 teams");
    console.log("Existing seasons were not modified.");
  } catch (error) {
    console.error("Season 4 seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason4();