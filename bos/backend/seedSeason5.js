require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const season5 = {
  seasonNumber: 5,
  title: "BOS Season 5",
  status: "Completed",

  standingsColumns: [],

  standings: [],

  matches: [],

  playoffs: {
    grandFinal: {
      format: "BO5",
      team1: "Strange Gaming",
      team2: "MRAK",
      score1: 3,
      score2: 2,
      winner: "Strange Gaming",
      runnerUp: "MRAK"
    }
  }
};

async function seedSeason5() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await Season.updateOne(
      { seasonNumber: 5 },
      { $set: season5 },
      { upsert: true, runValidators: true }
    );

    console.log("BOS Season 5 Grand Final saved successfully.");
    console.log("Season 1, Season 2, Season 3, Season 4 and Season 7 data were not targeted.");
  } catch (error) {
    console.error("Season 5 seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason5();