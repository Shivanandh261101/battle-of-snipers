require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

// Season 6: 112 matches
const matches = [
  { matchNumber: 1, date: "12/12/2025", match: "Blue Devil VS The Legend", winner: "The Legend", loser: "Blue Devil" },
  { matchNumber: 2, date: "12/12/2025", match: "Dark Hunter VS Death Gun", winner: "Dark Hunter", loser: "Death Gun" },
  { matchNumber: 3, date: "12/12/2025", match: "OTC VS Night Hunters", winner: "OTC", loser: "Night Hunters" },
  { matchNumber: 4, date: "12/12/2025", match: "Vinay Gaming VS Vortex Gaming", winner: "Vortex Gaming", loser: "Vinay Gaming" },
  { matchNumber: 5, date: "12/12/2025", match: "Smarty Boy VS Agent 03", winner: "Agent 03", loser: "Smarty Boy" },
  { matchNumber: 6, date: "13/12/2025", time: "3:00", match: "Death Gun VS Sky Shooter", winner: "Sky Shooter", loser: "Death Gun" },
  { matchNumber: 7, date: "13/12/2025", time: "4:00", match: "OTC VS Agent 03", winner: "OTC", loser: "Agent 03" },
  { matchNumber: 8, date: "13/12/2025", match: "Dark Hunter VS Krack Gaming", winner: "Dark Hunter", loser: "Krack Gaming" },
  { matchNumber: 9, date: "13/12/2025", match: "Night Hunters VS The Shield", winner: "The Shield", loser: "Night Hunters" },
  { matchNumber: 10, date: "13/12/2025", match: "Vortex Gaming VS Smarty Boy", winner: "Vortex Gaming", loser: "Smarty Boy" },
  { matchNumber: 11, date: "13/12/2025", match: "Vortex Gaming VS Ans Gaming", winner: "Ans Gaming", loser: "Vortex Gaming" },
  { matchNumber: 12, date: "13/12/2025", match: "Gamer Aadi VS The Legend", winner: "Gamer Aadi", loser: "The Legend" },
  { matchNumber: 13, date: "14/12/2025", time: "3:00", match: "MRAK VS Sky Shooter", winner: "MRAK", loser: "Sky Shooter" },
  { matchNumber: 14, date: "14/12/2025", time: "4:00", match: "The Shield VS Vinay Gaming", winner: "Vinay Gaming", loser: "The Shield" },
  { matchNumber: 15, date: "14/12/2025", match: "Dark Hunter VS Blue Devil", winner: "Dark Hunter", loser: "Blue Devil" },
  { matchNumber: 16, date: "14/12/2025", match: "The Shield VS Smarty Boy", winner: "The Shield", loser: "Smarty Boy" },
  { matchNumber: 17, date: "14/12/2025", match: "Ans Gaming VS Agent 03", winner: "Ans Gaming", loser: "Agent 03" },
  { matchNumber: 18, date: "14/12/2025", match: "Krack Gaming VS The Legend", winner: "Krack Gaming", loser: "The Legend" },
  { matchNumber: 19, date: "14/12/2025", match: "Sky Shooter VS Dark Hunter", winner: "Sky Shooter", loser: "Dark Hunter" },
  { matchNumber: 20, date: "15/12/2025", match: "Blue Devil VS MRAK", winner: "MRAK", loser: "Blue Devil" },
  { matchNumber: 21, date: "15/12/2025", match: "Krack Gaming VS Sky Shooter", winner: "Sky Shooter", loser: "Krack Gaming" },
  { matchNumber: 22, date: "15/12/2025", match: "MRAK VS Dark Hunter", winner: "MRAK", loser: "Dark Hunter" },
  { matchNumber: 23, date: "15/12/2025", match: "Smarty Boy VS Vinay Gaming", winner: "Vinay Gaming", loser: "Smarty Boy" },
  { matchNumber: 24, date: "15/12/2025", match: "Blue Devil VS Gamer Aadi", winner: "Gamer Aadi", loser: "Blue Devil" },
  { matchNumber: 25, date: "16/12/2025", match: "The Shield VS Vortex Gaming", winner: "Vortex Gaming", loser: "The Shield" },
  { matchNumber: 26, date: "16/12/2025", match: "Blue Devil VS Sky Shooter", winner: "Sky Shooter", loser: "Blue Devil" },
  { matchNumber: 27, date: "16/12/2025", match: "The Legend VS Krack Gaming", winner: "Krack Gaming", loser: "The Legend" },
  { matchNumber: 28, date: "16/12/2025", match: "Night Hunters VS Vinay Gaming", winner: "Vinay Gaming", loser: "Night Hunters" },
  { matchNumber: 29, date: "16/12/2025", match: "Gamer Aadi VS MRAK", winner: "MRAK", loser: "Gamer Aadi" },
  { matchNumber: 30, date: "17/12/2025", match: "Ans Gaming VS Vortex Gaming", winner: "Ans Gaming", loser: "Vortex Gaming" },
  { matchNumber: 31, date: "17/12/2025", match: "OTC VS Ans Gaming", winner: "OTC", loser: "Ans Gaming" },
  { matchNumber: 32, date: "17/12/2025", match: "Agent 03 VS Smarty Boy", winner: "Agent 03", loser: "Smarty Boy" },
  { matchNumber: 33, date: "17/12/2025", match: "Death Gun VS Gamer Aadi", winner: "Death Gun", loser: "Gamer Aadi" },
  { matchNumber: 34, date: "17/12/2025", match: "Dark Hunter VS MRAK", winner: "MRAK", loser: "Dark Hunter" },
  { matchNumber: 35, date: "18/12/2025", match: "The Shield VS Night Hunters", winner: "The Shield", loser: "Night Hunters" },
  { matchNumber: 36, date: "18/12/2025", match: "The Legend VS Sky Shooter", winner: "Sky Shooter", loser: "The Legend" },
  { matchNumber: 37, date: "18/12/2025", match: "Gamer Aadi VS Death Gun", winner: "Gamer Aadi", loser: "Death Gun" },
  { matchNumber: 38, date: "18/12/2025", match: "The Shield VS OTC", winner: "OTC", loser: "The Shield" },
  { matchNumber: 39, date: "18/12/2025", match: "Ans Gaming VS Vinay Gaming", winner: "Ans Gaming", loser: "Vinay Gaming" },
  { matchNumber: 40, date: "19/12/2025", match: "Vortex Gaming VS Agent 03", winner: "Vortex Gaming", loser: "Agent 03" },
  { matchNumber: 41, date: "19/12/2025", match: "Night Hunters VS Vortex Gaming", winner: "Vortex Gaming", loser: "Night Hunters" },
  { matchNumber: 42, date: "19/12/2025", match: "Agent 03 VS Ans Gaming", winner: "Ans Gaming", loser: "Agent 03" },
  { matchNumber: 43, date: "19/12/2025", match: "OTC VS Vinay Gaming", winner: "Vinay Gaming", loser: "OTC" },
  { matchNumber: 44, date: "19/12/2025", match: "Death Gun VS Krack Gaming", winner: "Krack Gaming", loser: "Death Gun" },
  { matchNumber: 45, date: "20/12/2025", time: "3:00", match: "The Legend VS MRAK", winner: "MRAK", loser: "The Legend" },
  { matchNumber: 46, date: "20/12/2025", time: "4:00", match: "Blue Devil VS Krack Gaming", winner: "Krack Gaming", loser: "Blue Devil" },
  { matchNumber: 47, date: "20/12/2025", match: "Night Hunters VS Ans Gaming", winner: "Ans Gaming", loser: "Night Hunters" },
  { matchNumber: 48, date: "20/12/2025", match: "Vinay Gaming VS The Shield", winner: "The Shield", loser: "Vinay Gaming" },
  { matchNumber: 49, date: "20/12/2025", match: "Dark Hunter VS Sky Shooter", winner: "Dark Hunter", loser: "Sky Shooter" },
  { matchNumber: 50, date: "20/12/2025", match: "MRAK VS Death Gun", winner: "MRAK", loser: "Death Gun" },
  { matchNumber: 51, date: "20/12/2025", match: "Vortex Gaming VS OTC", winner: "Vortex Gaming", loser: "OTC" },
  { matchNumber: 52, date: "21/12/2025", time: "3:00", match: "Gamer Aadi VS Krack Gaming", winner: "Krack Gaming", loser: "Gamer Aadi" },
  { matchNumber: 53, date: "21/12/2025", time: "4:00", match: "Ans Gaming VS The Shield", winner: "Ans Gaming", loser: "The Shield" },
  { matchNumber: 54, date: "21/12/2025", match: "MRAK VS Blue Devil", winner: "MRAK", loser: "Blue Devil" },
  { matchNumber: 55, date: "21/12/2025", match: "Vinay Gaming VS Agent 03", winner: "Agent 03", loser: "Vinay Gaming" },
  { matchNumber: 56, date: "21/12/2025", match: "Ans Gaming VS OTC", winner: "Ans Gaming", loser: "OTC" },
  { matchNumber: 57, date: "21/12/2025", match: "Gamer Aadi VS Sky Shooter", winner: "Sky Shooter", loser: "Gamer Aadi" },
  { matchNumber: 58, date: "21/12/2025", match: "Agent 03 VS Vinay Gaming", winner: "Agent 03", loser: "Vinay Gaming" },
  { matchNumber: 59, date: "22/12/2025", match: "Death Gun VS Blue Devil", winner: "Blue Devil", loser: "Death Gun" },
  { matchNumber: 60, date: "22/12/2025", match: "MRAK VS The Legend", winner: "MRAK", loser: "The Legend" },
  { matchNumber: 61, date: "22/12/2025", match: "The Legend VS Blue Devil", winner: "The Legend", loser: "Blue Devil" },
  { matchNumber: 62, date: "22/12/2025", match: "Vinay Gaming VS OTC", winner: "Vinay Gaming", loser: "OTC" },
  { matchNumber: 63, date: "22/12/2025", match: "Sky Shooter VS Gamer Aadi", winner: "Sky Shooter", loser: "Gamer Aadi" },
  { matchNumber: 64, date: "23/12/2025", match: "Night Hunters VS Smarty Boy", winner: "Night Hunters", loser: "Smarty Boy" },
  { matchNumber: 65, date: "23/12/2025", match: "Death Gun VS MRAK", winner: "MRAK", loser: "Death Gun" },
  { matchNumber: 66, date: "23/12/2025", match: "Krack Gaming VS Gamer Aadi", winner: "Gamer Aadi", loser: "Krack Gaming" },
  { matchNumber: 67, date: "23/12/2025", match: "Death Gun VS Dark Hunter", winner: "Dark Hunter", loser: "Death Gun" },
  { matchNumber: 68, date: "23/12/2025", match: "The Shield VS Agent 03", winner: "Agent 03", loser: "The Shield" },
  { matchNumber: 69, date: "24/12/2025", match: "Vinay Gaming VS Ans Gaming", winner: "Ans Gaming", loser: "Vinay Gaming" },
  { matchNumber: 70, date: "24/12/2025", match: "Smarty Boy VS Night Hunters", winner: "Smarty Boy", loser: "Night Hunters" },
  { matchNumber: 71, date: "24/12/2025", match: "Vinay Gaming VS Night Hunters", winner: "Vinay Gaming", loser: "Night Hunters" },
  { matchNumber: 72, date: "24/12/2025", match: "Gamer Aadi VS Blue Devil", winner: "Blue Devil", loser: "Gamer Aadi" },
  { matchNumber: 73, date: "24/12/2025", match: "The Legend VS Death Gun", winner: "Death Gun", loser: "The Legend" },
  { matchNumber: 74, date: "25/12/2025", match: "Krack Gaming VS Dark Hunter", winner: "Dark Hunter", loser: "Krack Gaming" },
  { matchNumber: 75, date: "25/12/2025", match: "OTC VS Smarty Boy", winner: "OTC", loser: "Smarty Boy" },
  { matchNumber: 76, date: "25/12/2025", match: "Ans Gaming VS Smarty Boy", winner: "Ans Gaming", loser: "Smarty Boy" },
  { matchNumber: 77, date: "25/12/2025", match: "Vortex Gaming VS The Shield", winner: "Vortex Gaming", loser: "The Shield" },
  { matchNumber: 78, date: "25/12/2025", match: "Sky Shooter VS Krack Gaming", winner: "Sky Shooter", loser: "Krack Gaming" },
  { matchNumber: 79, date: "26/12/2025", match: "Agent 03 VS Night Hunters", winner: "Agent 03", loser: "Night Hunters" },
  { matchNumber: 80, date: "26/12/2025", match: "Dark Hunter VS Gamer Aadi", winner: "Dark Hunter", loser: "Gamer Aadi" },
  { matchNumber: 81, date: "26/12/2025", match: "Smarty Boy VS OTC", winner: "Smarty Boy", loser: "OTC" },
  { matchNumber: 82, date: "26/12/2025", match: "Agent 03 VS The Shield", winner: "The Shield", loser: "Agent 03" },
  { matchNumber: 83, date: "26/12/2025", match: "Krack Gaming VS Death Gun", winner: "Krack Gaming", loser: "Death Gun" },
  { matchNumber: 84, date: "27/12/2025", time: "3:00", match: "Sky Shooter VS The Legend", winner: "Sky Shooter", loser: "The Legend" },
  { matchNumber: 85, date: "27/12/2025", time: "4:00", match: "Vortex Gaming VS Vinay Gaming", winner: "Vortex Gaming", loser: "Vinay Gaming" },
  { matchNumber: 86, date: "27/12/2025", match: "Death Gun VS The Legend", winner: "The Legend", loser: "Death Gun" },
  { matchNumber: 87, date: "27/12/2025", match: "Krack Gaming VS MRAK", winner: "MRAK", loser: "Krack Gaming" },
  { matchNumber: 88, date: "27/12/2025", match: "Gamer Aadi VS Dark Hunter", winner: "Dark Hunter", loser: "Gamer Aadi" },
  { matchNumber: 89, date: "27/12/2025", match: "Night Hunters VS Agent 03", winner: "Agent 03", loser: "Night Hunters" },
  { matchNumber: 90, date: "27/12/2025", match: "Vinay Gaming VS Smarty Boy", winner: "Vinay Gaming", loser: "Smarty Boy" },
  { matchNumber: 91, date: "28/12/2025", time: "3:00", match: "Agent 03 VS Vortex Gaming", winner: "Vortex Gaming", loser: "Agent 03" },
  { matchNumber: 92, date: "28/12/2025", time: "4:00", match: "Ans Gaming VS Night Hunters", winner: "Ans Gaming", loser: "Night Hunters" },
  { matchNumber: 93, date: "28/12/2025", match: "MRAK VS Gamer Aadi", winner: "MRAK", loser: "Gamer Aadi" },
  { matchNumber: 94, date: "28/12/2025", match: "OTC VS The Shield", winner: "OTC", loser: "The Shield" },
  { matchNumber: 95, date: "28/12/2025", match: "Sky Shooter VS Death Gun", winner: "Sky Shooter", loser: "Death Gun" },
  { matchNumber: 96, date: "28/12/2025", match: "OTC VS Vortex Gaming", winner: "Vortex Gaming", loser: "OTC" },
  { matchNumber: 97, date: "28/12/2025", match: "Smarty Boy VS The Shield", winner: "The Shield", loser: "Smarty Boy" },
  { matchNumber: 98, date: "29/12/2025", match: "The Legend VS Dark Hunter", winner: "Dark Hunter", loser: "The Legend" },
  { matchNumber: 99, date: "29/12/2025", match: "Sky Shooter VS Blue Devil", winner: "Blue Devil", loser: "Sky Shooter" },
  { matchNumber: 100, date: "29/12/2025", match: "MRAK VS Krack Gaming", winner: "MRAK", loser: "Krack Gaming" },
  { matchNumber: 101, date: "29/12/2025", match: "Blue Devil VS Death Gun", winner: "NA", loser: "NA", note: "Both Teams not join" },
  { matchNumber: 102, date: "29/12/2025", match: "The Shield VS Ans Gaming", winner: "Ans Gaming", loser: "The Shield" },
  { matchNumber: 103, date: "30/12/2025", match: "Agent 03 VS OTC", winner: "OTC", loser: "Agent 03" },
  { matchNumber: 104, date: "30/12/2025", match: "Dark Hunter VS The Legend", winner: "NA", loser: "NA", note: "Both Teams not join" },
  { matchNumber: 105, date: "30/12/2025", match: "Smarty Boy VS Vortex Gaming", winner: "Vortex Gaming", loser: "Smarty Boy" },
  { matchNumber: 106, date: "30/12/2025", match: "Blue Devil VS Dark Hunter", winner: "NA", loser: "NA", note: "Both Teams not join" },
  { matchNumber: 107, date: "30/12/2025", match: "The Legend VS Gamer Aadi", winner: "Gamer Aadi", loser: "The Legend" },
  { matchNumber: 108, date: "31/12/2025", match: "Sky Shooter VS MRAK", winner: "MRAK", loser: "Sky Shooter" },
  { matchNumber: 109, date: "31/12/2025", match: "Vortex Gaming VS Night Hunters", winner: "Vortex Gaming", loser: "Night Hunters" },
  { matchNumber: 110, date: "31/12/2025", match: "Smarty Boy VS Ans Gaming", winner: "Ans Gaming", loser: "Smarty Boy" },
  { matchNumber: 111, date: "31/12/2025", match: "Krack Gaming VS Blue Devil", winner: "Krack Gaming", loser: "Blue Devil" },
  { matchNumber: 112, date: "31/12/2025", match: "Night Hunters VS OTC", winner: "OTC", loser: "Night Hunters" }
];

const matchTimes = [
  "7:00 PM",
  "7:45 PM",
  "8:30 PM",
  "9:15 PM",
  "10:00 PM"
];

let timeIndex = 0;

matches.forEach((match) => {
  if (!match.time) {
    match.time = matchTimes[timeIndex % matchTimes.length];
    timeIndex++;
  }
});

async function seedSeason6Matches() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI .env file mein nahi mila.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 6 },
      { $set: { matches } }
    );

    if (result.matchedCount === 0) {
      throw new Error(
        "Season 6 nahi mila. Pehle seedSeason6.js run karo."
      );
    }

    console.log(`Season 6: ${matches.length} matches saved.`);
    console.log(
      "Only Season 6 matches updated; standings and playoffs unchanged."
    );
  } catch (error) {
    console.error("Season 6 matches update failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedSeason6Matches();