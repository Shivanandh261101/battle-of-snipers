
require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

// Season 3 ke 70 matches
// Date aur time ke ascending order mein
const matches = [
  { matchNumber: 1, date: "17/12/2022", time: "19:00", match: "CG Sqaud VS Loverboy Gaming", winner: "CG Sqaud", loser: "Loverboy Gaming" },
  { matchNumber: 2, date: "17/12/2022", time: "19:45", match: "CG Sqaud VS Team BG", winner: "Team BG", loser: "CG Sqaud" },
  { matchNumber: 3, date: "17/12/2022", time: "20:30", match: "Ans Gaming VS Romeo Gamer", winner: "Ans Gaming", loser: "Romeo Gamer" },
  { matchNumber: 4, date: "17/12/2022", time: "21:15", match: "Loverboy Gaming VS Ans Gaming", winner: "Ans Gaming", loser: "Loverboy Gaming" },
  { matchNumber: 5, date: "17/12/2022", time: "22:00", match: "Loverboy Gaming VS Ghost Gamer", winner: "Ghost Gamer", loser: "Loverboy Gaming" },

  { matchNumber: 6, date: "18/12/2022", time: "19:00", match: "FF Gamer VS Team BG", winner: "FF Gamer", loser: "Team BG" },
  { matchNumber: 7, date: "18/12/2022", time: "19:45", match: "TG Esports VS CG Sqaud", winner: "CG Sqaud", loser: "TG Esports" },
  { matchNumber: 8, date: "18/12/2022", time: "20:30", match: "Loveguru Gaming VS FF Gamer", winner: "Loveguru Gaming", loser: "FF Gamer" },
  { matchNumber: 9, date: "18/12/2022", time: "21:15", match: "TG Esports VS FF Gamer", winner: "FF Gamer", loser: "TG Esports" },
  { matchNumber: 10, date: "18/12/2022", time: "22:00", match: "Loveguru Gaming VS Ans Gaming", winner: "Ans Gaming", loser: "Loveguru Gaming" },

  { matchNumber: 11, date: "19/12/2022", time: "19:00", match: "Ans Gaming VS TG Esports", winner: "Ans Gaming", loser: "TG Esports" },
  { matchNumber: 12, date: "19/12/2022", time: "19:45", match: "Romeo Gamer VS Loverboy Gaming", winner: "Loverboy Gaming", loser: "Romeo Gamer" },
  { matchNumber: 13, date: "19/12/2022", time: "20:30", match: "Team BG VS TG Esports", winner: "Team BG", loser: "TG Esports" },
  { matchNumber: 14, date: "19/12/2022", time: "21:15", match: "Ghost Gamer VS CG Sqaud", winner: "CG Sqaud", loser: "Ghost Gamer" },
  { matchNumber: 15, date: "19/12/2022", time: "22:00", match: "Krack Gaming VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Krack Gaming" },

  { matchNumber: 16, date: "20/12/2022", time: "19:00", match: "CG Sqaud VS FF Gamer", winner: "CG Sqaud", loser: "FF Gamer" },
  { matchNumber: 17, date: "20/12/2022", time: "19:45", match: "Team BG VS Ans Gaming", winner: "Ans Gaming", loser: "Team BG" },
  { matchNumber: 18, date: "20/12/2022", time: "20:30", match: "Loveguru Gaming VS Ghost Gamer", winner: "Loveguru Gaming", loser: "Ghost Gamer" },
  { matchNumber: 19, date: "20/12/2022", time: "21:15", match: "TG Esports VS Ghost Gamer", winner: "Ghost Gamer", loser: "TG Esports" },
  { matchNumber: 20, date: "20/12/2022", time: "22:00", match: "Loveguru Gaming VS Romeo Gamer", winner: "Loveguru Gaming", loser: "Romeo Gaming" },

  { matchNumber: 21, date: "21/12/2022", time: "19:00", match: "CG Sqaud VS Krack Gaming", winner: "CG Sqaud", loser: "Krack Gaming" },
  { matchNumber: 22, date: "21/12/2022", time: "19:45", match: "FF Gamer VS Loverboy Gaming", winner: "Loverboy Gaming", loser: "FF Gamer" },
  { matchNumber: 23, date: "21/12/2022", time: "20:30", match: "CG Sqaud VS Ans Gaming", winner: "Ans Gaming", loser: "CG Sqaud" },
  { matchNumber: 24, date: "21/12/2022", time: "21:15", match: "Loverboy Gaming VS Team BG", winner: "Loverboy Gaming", loser: "Team BG" },
  { matchNumber: 25, date: "21/12/2022", time: "22:00", match: "Loverboy Gaming VS CG Sqaud", winner: "Loverboy Gaming", loser: "CG Sqaud" },

  { matchNumber: 26, date: "22/12/2022", time: "19:00", match: "Ans Gaming VS Loveguru Gaming", winner: "Ans Gaming", loser: "Loveguru Gaming" },
  { matchNumber: 27, date: "22/12/2022", time: "19:45", match: "Krack Gaming VS TG Esports", winner: "TG Esports", loser: "Krack Gaming" },
  { matchNumber: 28, date: "22/12/2022", time: "20:30", match: "Ans Gaming VS Ghost Gamer", winner: "Ans Gaming", loser: "Ghost Gamer" },
  { matchNumber: 29, date: "22/12/2022", time: "21:15", match: "Krack Gaming VS FF Gamer", winner: "FF Gamer", loser: "Krack Gaming" },
  { matchNumber: 30, date: "22/12/2022", time: "22:00", match: "Krack Gaming VS Ans Gaming", winner: "Ans Gaming", loser: "Krack Gaming" },

  { matchNumber: 31, date: "23/12/2022", time: "19:00", match: "FF Gamer VS Krack Gaming", winner: "FF Gamer", loser: "Krack Gaming" },
  { matchNumber: 32, date: "23/12/2022", time: "19:45", match: "Team BG VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Team BG" },
  { matchNumber: 33, date: "23/12/2022", time: "20:30", match: "FF Gamer VS Ghost Gamer", winner: "FF Gamer", loser: "Ghost Gamer" },
  { matchNumber: 34, date: "23/12/2022", time: "21:15", match: "Romeo Gamer VS CG Sqaud", winner: "CG Sqaud", loser: "Romeo Gamer" },
  { matchNumber: 35, date: "23/12/2022", time: "22:00", match: "Loveguru Gaming VS CG Sqaud", winner: "Loveguru Gaming", loser: "CG Sqaud" },

  { matchNumber: 36, date: "24/12/2022", time: "19:00", match: "Ghost Gamer Vs Loverboy Gaming", winner: "Loverboy Gaming", loser: "Ghost Gamer" },
  { matchNumber: 37, date: "24/12/2022", time: "19:45", match: "FF Gamer VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "FF Gamer" },
  { matchNumber: 38, date: "24/12/2022", time: "20:30", match: "Ans Gaming VS Loverboy Gaming", winner: "Ans Gaming", loser: "Loverboy Gaming" },
  { matchNumber: 39, date: "24/12/2022", time: "21:15", match: "Romeo Gamer VS Team BG", winner: "Team BG", loser: "Romeo Gaming" },
  { matchNumber: 40, date: "24/12/2022", time: "22:00", match: "Loverboy Gaming VS Krack Gaming", winner: "Loverboy Gaming", loser: "Krack Gaming" },

  { matchNumber: 41, date: "25/12/2022", time: "19:00", match: "Ghost Gamer VS Krack Gaming", winner: "Ghost Gamer", loser: "Krack Gaming" },
  { matchNumber: 42, date: "25/12/2022", time: "19:45", match: "Romeo Gamer VS Krack Gaming", winner: "Krack Gaming", loser: "Romeo Gamer" },
  { matchNumber: 43, date: "25/12/2022", time: "20:30", match: "Ghost Gamer VS TG Esports", winner: "Ghost Gamer", loser: "TG Esports" },
  { matchNumber: 44, date: "25/12/2022", time: "21:15", match: "TG Esports VS Loverboy Gaming", winner: "Loverboy Gaming", loser: "TG Esports" },
  { matchNumber: 45, date: "25/12/2022", time: "22:00", match: "Team BG VS Romeo Gamer", winner: "Team BG", loser: "Romeo Gamer" },

  { matchNumber: 46, date: "26/12/2022", time: "19:00", match: "Romeo Gaming VS TG Esports", winner: "TG Esports", loser: "Romeo Gaming" },
  { matchNumber: 47, date: "26/12/2022", time: "19:45", match: "Ghost Gamer VS Team BG", winner: "Ghost Gamer", loser: "Team BG" },
  { matchNumber: 48, date: "26/12/2022", time: "20:30", match: "CG Sqaud VS TG Esports", winner: "CG Sqaud", loser: "TG Esports" },
  { matchNumber: 49, date: "26/12/2022", time: "21:15", match: "Romeo Gamer VS Ghost Gamer", winner: "Ghost Gamer", loser: "Romeo Gamer" },
  { matchNumber: 50, date: "26/12/2022", time: "22:00", match: "Loveguru Gaming VS Loverboy Gaming", winner: "Loverboy Gaming", loser: "Loveguru Gaming" },

  { matchNumber: 51, date: "27/12/2022", time: "19:00", match: "Ghost Gamer VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Ghost Gamer" },
  { matchNumber: 52, date: "27/12/2022", time: "19:45", match: "Romeo Gaming VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Romeo Gaming" },
  { matchNumber: 53, date: "27/12/2022", time: "20:30", match: "Team BG VS CG Sqaud", winner: "Team BG", loser: "CG Sqaud" },
  { matchNumber: 54, date: "27/12/2022", time: "21:15", match: "Loverboy Gaming VS Romeo Gamer", winner: "Loverboy Gaming", loser: "Romeo Gaming" },
  { matchNumber: 55, date: "27/12/2022", time: "22:00", match: "Team BG VS FF Gamer", winner: "FF Gamer", loser: "Team BG" },

  { matchNumber: 56, date: "28/12/2022", time: "19:00", match: "Ans Gaming VS Team BG", winner: "Ans Gaming", loser: "Team BG" },
  { matchNumber: 57, date: "28/12/2022", time: "19:45", match: "Krack Gaming VS Team BG", winner: "Team BG", loser: "Krack Gaming" },
  { matchNumber: 58, date: "28/12/2022", time: "20:30", match: "Team BG VS Ghost Gamer", winner: "Ghost Gamer", loser: "Team BG" },
  { matchNumber: 59, date: "28/12/2022", time: "21:45", match: "Krack Gaming VS Ghost Gamer", winner: "Ghost Gamer", loser: "Krack Gaming" },
  { matchNumber: 60, date: "28/12/2022", time: "22:00", match: "Krack Gaming VS CG Sqaud", winner: "CG Sqaud", loser: "Krack Gaming" },

  { matchNumber: 61, date: "29/12/2022", time: "19:00", match: "FF Gamer VS TG Esports", winner: "TG Esports", loser: "FF Gamer" },
  { matchNumber: 62, date: "29/12/2022", time: "19:45", match: "Ans Gaming VS Krack Gaming", winner: "Ans Gaming", loser: "Krack Gaming" },
  { matchNumber: 63, date: "29/12/2022", time: "20:30", match: "CG Sqaud VS Loveguru Gaming", winner: "CG Sqaud", loser: "Loveguru Gaming" },
  { matchNumber: 64, date: "29/12/2022", time: "21:45", match: "FF Gamer VS Ans Gaming", winner: "Ans Gaming", loser: "FF Gamer" },
  { matchNumber: 65, date: "29/12/2022", time: "22:00", match: "TG Esports VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "TG Esports" },

  { matchNumber: 66, date: "30/12/2022", time: "19:00", match: "FF Gamer VS Romeo Gamer", winner: "Romeo Gamer", loser: "FF Gamer" },
  { matchNumber: 67, date: "30/12/2022", time: "19:45", match: "TG Esports VS Romeo Gamer", winner: "TG Esports", loser: "Romeo Gaming" },
  { matchNumber: 68, date: "30/12/2022", time: "20:30", match: "Loverboy Gaming VS FF Gamer", winner: "FF Gamer", loser: "Loverboy Gaming" },
  { matchNumber: 69, date: "30/12/2022", time: "21:15", match: "Krack Gaming VS Romeo Gamer", winner: "Romeo Gamer", loser: "Krack Gaming" },
  { matchNumber: 70, date: "30/12/2022", time: "22:00", match: "TG Esports VS Ans Gaming", winner: "Ans Gaming", loser: "TG Esports" }
];

async function seedSeason3Matches() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 3 },
      { $set: { matches } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new Error("Season 3 not found. Save Season 3 standings first.");
    }

    console.log(`Season 3: ${matches.length} matches saved in date/time order.`);
    console.log("Only Season 3 matches were updated.");
    console.log("Season standings, playoffs and Season 7 live data were not changed.");
  } catch (error) {
    console.error("Failed to save Season 3 matches:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason3Matches();
