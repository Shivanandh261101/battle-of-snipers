require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

// Season 5 ke 2 qualifying matches
const matches = [
  {
    matchNumber: 1,
    title: "Match 1",
    results: [
      { rank: 1, name: "Strange Gaming", kp: 3 },
      { rank: 2, name: "Loveguru Gaming", kp: 0 },
      { rank: 3, name: "Total Gaming", kp: 0 },
      { rank: 4, name: "Opnikhil", kp: 1 },
      { rank: 5, name: "MRAK", kp: 2 },
      { rank: 6, name: "Lost Angel", kp: 1 },
      { rank: 7, name: "Bunny Gaming", kp: 2 },
      { rank: 8, name: "God Killer", kp: 0 },
      { rank: 9, name: "Romeo Anil", kp: 0 },
      { rank: 10, name: "Sky Shooter", kp: 3 },
      { rank: 11, name: "Night Hunters", kp: 1 },
      { rank: 12, name: "Dark Hunters", kp: 0 },
      { rank: 13, name: "Vinay Gaming", kp: 1 },
      { rank: 14, name: "Death Gun", kp: 0 },
      { rank: 15, name: "7Bantai", kp: 0 }
    ]
  },
  {
    matchNumber: 2,
    title: "Match 2",
    results: [
      { rank: 1, name: "MRAK", kp: 5 },
      { rank: 2, name: "Loveguru Gaming", kp: 1 },
      { rank: 3, name: "Lost Angel", kp: 2 },
      { rank: 4, name: "Romeo Anil", kp: 0 },
      { rank: 5, name: "Total Gaming", kp: 0 },
      { rank: 6, name: "Sky Shooter", kp: 2 },
      { rank: 7, name: "Death Gun", kp: 1 },
      { rank: 8, name: "Bunny Gaming", kp: 0 },
      { rank: 9, name: "Opnikhil", kp: 0 },
      { rank: 10, name: "Vinay Gaming", kp: 0 },
      { rank: 11, name: "7Bantai", kp: 0 },
      { rank: 12, name: "Night Hunters", kp: 0 }
    ]
  }
];

async function seedSeason5Matches() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 5 },
      { $set: { matches } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new Error("Season 5 not found. Save Season 5 first using seedSeason5.js.");
    }

    console.log(`Season 5: ${matches.length} matches saved successfully.`);
    console.log("Only Season 5 matches were updated.");
    console.log("Season standings, playoffs and other seasons were not changed.");
  } catch (error) {
    console.error("Failed to save Season 5 matches:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason5Matches();