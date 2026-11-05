
require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const playoffs = {
  semiFinals: [
    {
      matchNumber: 1,
      format: "",
      date: "02-01-2023",
      team1: "Ans Gaming",
      team2: "Loveguru Gaming",
      score1: 2,
      score2: 1,
      winner: "Ans Gaming"
    },
    {
      matchNumber: 2,
      format: "",
      date: "05-01-2023",
      team1: "Loveguru Gaming",
      team2: "CG Sqaud",
      score1: 2,
      score2: 1,
      winner: "Loveguru Gaming"
    }
  ],

  eliminator: {
    format: "",
    date: "03-01-2023",
    team1: "CG Sqaud",
    team2: "Loverboy Gaming",
    score1: 1,
    score2: 0,
    winner: "CG Sqaud"
  },

  grandFinal: {
    format: "",
    date: "08-01-2023",
    team1: "Ans Gaming",
    team2: "Loveguru Gaming",
    score1: 4,
    score2: 1,
    winner: "Ans Gaming",
    runnerUp: "Loveguru Gaming"
  }
};

async function seedSeason3Playoffs() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 3 },
      { $set: { playoffs } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new Error(
        "Season 3 not found. Run the Season 3 seed first."
      );
    }

    console.log("Season 3 playoff data saved successfully.");
    console.log("Semi-finals: 2 | Eliminator: 1 | Grand Final: Ans Gaming");
  } catch (error) {
    console.error("Failed to save Season 3 playoffs:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason3Playoffs();
