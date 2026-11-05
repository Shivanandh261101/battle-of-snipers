
require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const playoffs = {
  semiFinals: [
    {
      matchNumber: 1,
      format: "BO3",
      date: "07-12-2021",
      team1: "Night Hunters",
      team2: "Toxic Gamers",
      score1: 2,
      score2: 0,
      winner: "Night Hunters"
    },
    {
      matchNumber: 2,
      format: "BO3",
      date: "08-12-2021",
      team1: "Ans Gaming",
      team2: "Aryan Gaming",
      score1: 2,
      score2: 1,
      winner: "Ans Gaming"
    }
  ],

  grandFinal: {
    format: "BO5",
    date: "12-12-2021",
    team1: "Ans Gaming",
    team2: "Night Hunters",
    score1: 3,
    score2: 2,
    winner: "Ans Gaming",
    runnerUp: "Night Hunters"
  }
};

async function seedSeason1Playoffs() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 1 },
      { $set: { playoffs } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new Error(
        "Season 1 not found. Seed Season 1 before running this script."
      );
    }

    console.log("Season 1 playoff data saved successfully.");
    console.log("Semi-Finals: 2");
    console.log("Grand Final: Ans Gaming 3 - 2 Night Hunters");
    console.log("Standings and league matches were not changed.");
  } catch (error) {
    console.error("Failed to save playoff data:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason1Playoffs();
