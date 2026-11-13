
require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const season2 = {
  seasonNumber: 2,
  title: "BOS Season 2",
  status: "Completed",

  standingsColumns: [
    { key: "b", label: "B" },
    { key: "m", label: "M" },
    { key: "kp", label: "KP" },
    { key: "pp", label: "PP" },
    { key: "total", label: "Total" }
  ],

  matchColumns: [
  { key: "rank", label: "#" },
  { key: "teamName", label: "Team Name" },
  { key: "kp", label: "KP" },
  { key: "pp", label: "PP" }
],

  standings: [
    {
      rank: 1,
      name: "FF Gamers",
      stats: { b: 2, m: 6, kp: 6, pp: 38, total: 44 },
      status: "CHAMPION"
    },
    {
      rank: 2,
      name: "Toxic Gamers",
      stats: { b: 1, m: 6, kp: 6, pp: 31, total: 37 },
      status: "RUNNER-UP"
    },
    {
      rank: 3,
      name: "Aryan Gaming",
      stats: { b: 1, m: 6, kp: 9, pp: 28, total: 37 },
      status: "E"
    }, 
    {
      rank: 4,
      name: "Hunter Gaming",
      stats: { b: 1, m: 6, kp: 7, pp: 28, total: 35 },
      status: "E"
    },
    {
      rank: 5,
      name: "7 Bantai",
      stats: { b: 1, m: 6, kp: 6, pp: 29, total: 35 },
      status: "E"
    },
    {
      rank: 6,
      name: "Night Hunters",
      stats: { b: 0, m: 6, kp: 4, pp: 25, total: 29 },
      status: "E"
    },
    {
      rank: 7,
      name: "Dark Hunter",
      stats: { b: 0, m: 6, kp: 2, pp: 19, total: 21 },
      status: "E"
    },
    {
      rank: 8,
      name: "Dynamo Gaming",
      stats: { b: 0, m: 6, kp: 2, pp: 18, total: 20 },
      status: "E"
    }
  ],

  playoffs: null
};

async function seedSeason2() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await Season.updateOne(
      { seasonNumber: 2 },
      { $set: season2 },
      { upsert: true, runValidators: true }
    );

    console.log("BOS Season 2 saved successfully.");
  } catch (error) {
    console.error("Season 2 seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason2();
