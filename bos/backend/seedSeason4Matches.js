require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

// Season 4 ke 132 matches yahan rahenge.
// Har match ka format:
// {
//   matchNumber: 1,
//   date: "11/11/2023",
//   time: "19:00",
//   match: "Bunny Gaming VS Gsg Gamer",
//   winner: "Bunny Gaming",
//   loser: "Gsg Gamer"
// }

const matches = [
    { matchNumber: 1, date: "11/11/2023", time: "19:00", match: "Bunny Gaming VS Gsg Gamer", winner: "Bunny Gaming", loser: "Gsg Gamer" },
    { matchNumber: 2, date: "11/11/2023", time: "19:45", match: "Loveguru Gaming VS 7Bantai", winner: "Loveguru Gaming", loser: "7Bantai" },
    { matchNumber: 3, date: "11/11/2023", time: "20:30", match: "Team Legend VS Madhubhai Gaming", winner: "Team Legend", loser: "Madhubhai Gaming" },
    { matchNumber: 4, date: "11/11/2023", time: "21:45", match: "Hunter Gaming YT YT VS Blood Line", winner: "Blood Line", loser: "Hunter Gaming YT" },
    { matchNumber: 5, date: "11/11/2023", time: "22:00", match: "Opnikhil VS Vortex Gaming", winner: "Vortex Gaming", loser: "Opnikhil" },
    { matchNumber: 6, date: "12/11/2023", time: "19:00", match: "Ysp Gaming VS Total Gaming", winner: "Total Gaming", loser: "Ysp Gaming" },
    { matchNumber: 7, date: "12/11/2023", time: "19:45", match: "No Name Esports VS Rowdy Gaming", winner: "No Name Esports", loser: "Rowdy Gaming" },
    { matchNumber: 8, date: "12/11/2023", time: "20:30", match: "Team Joker VS Malli Gaming", winner: "Malli Gaming", loser: "Team Joker" },
    { matchNumber: 9, date: "12/11/2023", time: "21:45", match: "Ssp Gaming VS God Killer", winner: "God Killer", loser: "Ssp Gaming" },
    { matchNumber: 10, date: "12/11/2023", time: "22:00", match: "Anil Gaming VS Lost Angel", winner: "Lost Angel", loser: "Anil Gaming" },
    { matchNumber: 11, date: "13/11/2023", time: "19:00", match: "Ans Gaming VS Krack Gaming", winner: "Krack Gaming", loser: "Ans Gaming" },
  { matchNumber: 12, date: "13/11/2023", time: "19:45", match: "Shivtej Warrior VS Night Hunters", winner: "Night Hunters", loser: "Shivtej Warrior" },
  { matchNumber: 13, date: "13/11/2023", time: "20:30", match: "Bunny Gaming VS Opnikhil", winner: "Bunny Gaming", loser: "Opnikhil" },
  { matchNumber: 14, date: "13/11/2023", time: "21:45", match: "Anil Gaming VS Blood Line", winner: "Anil Gaming", loser: "Blood Line" },
  { matchNumber: 15, date: "13/11/2023", time: "22:00", match: "Vortex Gaming VS No Name Esports", winner: "Vortex Gaming", loser: "No Name Esports" },
  { matchNumber: 16, date: "14/11/2023", time: "19:00", match: "Lost Angel VS Total Gaming", winner: "Lost Angel", loser: "Total Gaming" },
  { matchNumber: 17, date: "14/11/2023", time: "19:45", match: "Krack Gaming VS Rowdy Gaming", winner: "Rowdy Gaming", loser: "Krack Gaming" },
  { matchNumber: 18, date: "14/11/2023", time: "20:30", match: "Team Joker VS Hunter Gaming YT YT", winner: "Hunter Gaming YT YT", loser: "Team Joker" },
  { matchNumber: 19, date: "14/11/2023", time: "21:45", match: "Ssp Gaming VS Gsg Gamer", winner: "Gsg Gamer", loser: "Ssp Gaming" },
  { matchNumber: 20, date: "14/11/2023", time: "22:00", match: "7Bantai VS Shivtej Warrior", winner: "Shivtej Warrior", loser: "7Bantai" },
  { matchNumber: 21, date: "15/11/2023", time: "19:00", match: "Ans Gaming VS Madhubhai Gaming", winner: "Ans Gaming", loser: "Madhubhai Gaming" },
  { matchNumber: 22, date: "15/11/2023", time: "19:45", match: "Ysp Gaming VS Night Hunters", winner: "Night Hunters", loser: "Ysp Gaming" },
  { matchNumber: 23, date: "15/11/2023", time: "20:30", match: "Team Legend VS God Killer", winner: "God Killer", loser: "Team Legend" },
  { matchNumber: 24, date: "15/11/2023", time: "21:45", match: "Malli Gaming VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Malli Gaming" },
  { matchNumber: 25, date: "15/11/2023", time: "22:00", match: "Vortex Gaming VS Gsg Gamer", winner: "Vortex Gaming", loser: "Gsg Gamer" },
  { matchNumber: 26, date: "16/11/2023", time: "19:00", match: "Total Gaming VS Malli Gaming", winner: "Total Gaming", loser: "Malli Gaming" },
  { matchNumber: 27, date: "16/11/2023", time: "19:45", match: "God Killer VS Bunny Gaming", winner: "God Killer", loser: "Bunny Gaming" },
  { matchNumber: 28, date: "16/11/2023", time: "20:30", match: "Ysp Gaming VS Hunter Gaming YT YT", winner: "Hunter Gaming YT YT", loser: "Ysp Gaming" },
  { matchNumber: 29, date: "16/11/2023", time: "21:45", match: "Madhubhai Gaming VS Ssp Gaming", winner: "Madhubhai Gaming", loser: "Ssp Gaming" },
  { matchNumber: 30, date: "16/11/2023", time: "22:00", match: "Anil Gaming VS Shivtej Warrior", winner: "Shivtej Warrior", loser: "Anil Gaming" },
  { matchNumber: 31, date: "17/11/2023", time: "19:00", match: "Rowdy Gaming VS Opnikhil", winner: "Rowdy Gaming", loser: "Opnikhil" },
  { matchNumber: 32, date: "17/11/2023", time: "19:45", match: "Lost Angel VS Team Joker", winner: "Lost Angel", loser: "Team Joker" },
  { matchNumber: 33, date: "17/11/2023", time: "20:30", match: "Team Legend VS Ans Gaming", winner: "Ans Gaming", loser: "Team Legend" },
  { matchNumber: 34, date: "17/11/2023", time: "21:45", match: "Night Hunters VS 7Bantai", winner: "Night Hunters", loser: "7Bantai" },
  { matchNumber: 35, date: "17/11/2023", time: "22:00", match: "Krack Gaming VS No Name Esports", winner: "No Name Esports", loser: "Krack Gaming" },
  { matchNumber: 36, date: "18/11/2023", time: "15:00", match: "Blood Line VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Blood Line" },
  { matchNumber: 37, date: "18/11/2023", time: "16:00", match: "Gsg Gamer VS Ans Gaming", winner: "Ans Gaming", loser: "Gsg Gamer" },
  { matchNumber: 38, date: "18/11/2023", time: "19:00", match: "Malli Gaming VS Lost Angel", winner: "Lost Angel", loser: "Malli Gaming" },
  { matchNumber: 39, date: "18/11/2023", time: "19:45", match: "Ssp Gaming VS Rowdy Gaming", winner: "Ssp Gaming", loser: "Rowdy Gaming" },
  { matchNumber: 40, date: "18/11/2023", time: "20:30", match: "Hunter Gaming YT YT VS 7Bantai", winner: "Hunter Gaming YT YT", loser: "7Bantai" },
  { matchNumber: 41, date: "18/11/2023", time: "21:45", match: "God Killer VS Opnikhil", winner: "God Killer", loser: "Opnikhil" },
  { matchNumber: 42, date: "18/11/2023", time: "22:00", match: "Night Hunters VS Anil Gaming", winner: "Anil Gaming", loser: "Night Hunters" },
  { matchNumber: 43, date: "19/11/2023", time: "15:00", match: "Vortex Gaming VS Bunny Gaming", winner: "Vortex Gaming", loser: "Bunny Gaming" },
  { matchNumber: 44, date: "19/11/2023", time: "16:00", match: "Loveguru Gaming VS Shivtej Warrior", winner: "Shivtej Warrior", loser: "Loveguru Gaming" },
  { matchNumber: 45, date: "19/11/2023", time: "19:00", match: "No Name Esports VS Madhubhai Gaming", winner: "Madhubhai Gaming", loser: "No Name Esports" },
  { matchNumber: 46, date: "19/11/2023", time: "19:45", match: "Total Gaming VS Blood Line", winner: "Blood Line", loser: "Total Gaming" },
  { matchNumber: 47, date: "19/11/2023", time: "20:30", match: "Team Legend VS Krack Gaming", winner: "Team Legend", loser: "Krack Gaming" },
  { matchNumber: 48, date: "19/11/2023", time: "21:45", match: "Team Joker VS Ysp Gaming", winner: "Team Joker", loser: "Ysp Gaming" },
  { matchNumber: 49, date: "19/11/2023", time: "22:00", match: "Madhubhai Gaming VS Opnikhil", winner: "Madhubhai Gaming", loser: "Opnikhil" },
  { matchNumber: 50, date: "20/11/2023", time: "19:00", match: "Blood Line VS Ysp Gaming", winner: "Blood Line", loser: "Ysp Gaming" },
  { matchNumber: 51, date: "20/11/2023", time: "19:45", match: "Krack Gaming VS Ssp Gaming", winner: "Krack Gaming", loser: "Ssp Gaming" },
  { matchNumber: 52, date: "20/11/2023", time: "20:30", match: "Hunter Gaming YT YT VS Night Hunters", winner: "Night Hunters", loser: "Hunter Gaming YT YT" },
  { matchNumber: 53, date: "20/11/2023", time: "21:45", match: "Vortex Gaming VS Ans Gaming", winner: "Ans Gaming", loser: "Vortex Gaming" },
  { matchNumber: 54, date: "20/11/2023", time: "22:00", match: "Malli Gaming VS 7Bantai", winner: "Malli Gaming", loser: "7Bantai" },
  { matchNumber: 55, date: "21/11/2023", time: "19:00", match: "Team Legend VS No Name Esports", winner: "Team Legend", loser: "No Name Esports" },
  { matchNumber: 56, date: "21/11/2023", time: "19:45", match: "Anil Gaming VS Total Gaming", winner: "Total Gaming", loser: "Anil Gaming" },
  { matchNumber: 57, date: "21/11/2023", time: "20:30", match: "Bunny Gaming VS Rowdy Gaming", winner: "Rowdy Gaming", loser: "Bunny Gaming" },
  { matchNumber: 58, date: "21/11/2023", time: "21:45", match: "Shivtej Warrior VS Team Joker", winner: "Team Joker", loser: "Shivtej Warrior" },
  { matchNumber: 59, date: "21/11/2023", time: "22:00", match: "Gsg Gamer VS God Killer", winner: "God Killer", loser: "Gsg Gamer" },
  { matchNumber: 60, date: "22/11/2023", time: "19:00", match: "Lost Angel VS Loveguru Gaming", winner: "Lost Angel", loser: "Loveguru Gaming" },
  { matchNumber: 61, date: "22/11/2023", time: "19:45", match: "Ans Gaming VS Bunny Gaming", winner: "Ans Gaming", loser: "Bunny Gaming" },
  { matchNumber: 62, date: "22/11/2023", time: "20:30", match: "Ysp Gaming VS Lost Angel", winner: "Lost Angel", loser: "Ysp Gaming" },
  { matchNumber: 63, date: "22/11/2023", time: "21:45", match: "Krack Gaming VS Madhubhai Gaming", winner: "Madhubhai Gaming", loser: "Krack Gaming" },
  { matchNumber: 64, date: "22/11/2023", time: "22:00", match: "Malli Gaming VS Blood Line", winner: "Blood Line", loser: "Malli Gaming" },
  { matchNumber: 65, date: "23/11/2023", time: "19:00", match: "Team Legend VS Rowdy Gaming", winner: "Team Legend", loser: "Rowdy Gaming" },
  { matchNumber: 66, date: "23/11/2023", time: "19:45", match: "Anil Gaming VS Hunter Gaming YT YT", winner: "Anil Gaming", loser: "Hunter Gaming YT YT" },
  { matchNumber: 67, date: "23/11/2023", time: "20:30", match: "No Name Esports VS God Killer", winner: "God Killer", loser: "No Name Esports" },
  { matchNumber: 68, date: "23/11/2023", time: "21:45", match: "Team Joker VS 7Bantai", winner: "Team Joker", loser: "7Bantai" },
  { matchNumber: 69, date: "23/11/2023", time: "22:00", match: "Opnikhil VS Gsg Gamer", winner: "Gsg Gamer", loser: "Opnikhil" },
  { matchNumber: 70, date: "24/11/2023", time: "19:00", match: "Night Hunters VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Night Hunters" },
  { matchNumber: 71, date: "24/11/2023", time: "19:45", match: "Ssp Gaming VS Vortex Gaming", winner: "Vortex Gaming", loser: "Ssp Gaming" },
  { matchNumber: 72, date: "24/11/2023", time: "20:30", match: "Total Gaming VS Shivtej Warrior", winner: "Total Gaming", loser: "Shivtej Warrior" },
  { matchNumber: 73, date: "24/11/2023", time: "21:45", match: "Vortex Gaming VS Krack Gaming", winner: "Krack Gaming", loser: "Vortex Gaming" },
  { matchNumber: 74, date: "24/11/2023", time: "22:00", match: "7Bantai VS Ysp Gaming", winner: "Ysp Gaming", loser: "7Bantai" },
  { matchNumber: 75, date: "25/11/2023", time: "15:00", match: "Gsg Gamer VS Team Legend", winner: "Team Legend", loser: "Gsg Gamer" },
  { matchNumber: 76, date: "25/11/2023", time: "16:00", match: "Team Joker VS Anil Gaming", winner: "Anil Gaming", loser: "Team Joker" },
  { matchNumber: 77, date: "25/11/2023", time: "19:00", match: "Rowdy Gaming VS Ans Gaming", winner: "Ans Gaming", loser: "Rowdy Gaming" },
  { matchNumber: 78, date: "25/11/2023", time: "19:45", match: "Hunter Gaming YT YT VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Hunter Gaming YT YT" },
  { matchNumber: 79, date: "25/11/2023", time: "20:30", match: "Madhubhai Gaming VS God Killer", winner: "Madhubhai Gaming", loser: "God Killer" },
  { matchNumber: 80, date: "25/11/2023", time: "21:45", match: "Total Gaming VS Night Hunters", winner: "Night Hunters", loser: "Total Gaming" },
  { matchNumber: 81, date: "25/11/2023", time: "22:00", match: "Ssp Gaming VS Opnikhil", winner: "Ssp Gaming", loser: "Opnikhil" },
  { matchNumber: 82, date: "26/11/2023", time: "15:00", match: "Lost Angel VS Blood Line", winner: "Blood Line", loser: "Lost Angel" },
  { matchNumber: 83, date: "26/11/2023", time: "16:00", match: "No Name Esports VS Bunny Gaming", winner: "No Name Esports", loser: "Bunny Gaming" },
  { matchNumber: 84, date: "26/11/2023", time: "19:00", match: "Shivtej Warrior VS Malli Gaming", winner: "Shivtej Warrior", loser: "Malli Gaming" },
  { matchNumber: 85, date: "26/11/2023", time: "19:45", match: "Krack Gaming VS Gsg Gamer", winner: "Gsg Gamer", loser: "Krack Gaming" },
  { matchNumber: 86, date: "26/11/2023", time: "20:30", match: "Total Gaming VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Total Gaming" },
  { matchNumber: 87, date: "26/11/2023", time: "21:45", match: "Ans Gaming VS Ssp Gaming", winner: "Ans Gaming", loser: "Ssp Gaming" },
  { matchNumber: 88, date: "26/11/2023", time: "22:00", match: "Hunter Gaming YT YT VS Lost Angel", winner: "Lost Angel", loser: "Hunter Gaming YT YT" },
  { matchNumber: 89, date: "27/11/2023", time: "19:00", match: "Opnikhil VS No Name Esports", winner: "No Name Esports", loser: "Opnikhil" },
  { matchNumber: 90, date: "27/11/2023", time: "19:45", match: "Malli Gaming VS Anil Gaming", winner: "Malli Gaming", loser: "Anil Gaming" },
  { matchNumber: 91, date: "27/11/2023", time: "20:30", match: "Madhubhai Gaming VS Vortex Gaming", winner: "Madhubhai Gaming", loser: "Vortex Gaming" },
  { matchNumber: 92, date: "27/11/2023", time: "21:45", match: "Team Joker VS Night Hunters", winner: "Team Joker", loser: "Night Hunters" },
  { matchNumber: 93, date: "27/11/2023", time: "22:00", match: "Rowdy Gaming VS God Killer", winner: "God Killer", loser: "Rowdy Gaming" },
  { matchNumber: 94, date: "28/11/2023", time: "19:00", match: "Shivtej Warrior VS Ysp Gaming", winner: "Shivtej Warrior", loser: "Ysp Gaming" },
  { matchNumber: 95, date: "28/11/2023", time: "19:45", match: "Bunny Gaming VS Team Legend", winner: "Team Legend", loser: "Bunny Gaming" },
  { matchNumber: 96, date: "28/11/2023", time: "20:30", match: "Blood Line VS 7Bantai", winner: "Blood Line", loser: "7Bantai" },
  { matchNumber: 97, date: "28/11/2023", time: "21:45", match: "Madhubhai Gaming VS Rowdy Gaming", winner: "Rowdy Gaming", loser: "Madhubhai Gaming" },
  { matchNumber: 98, date: "28/11/2023", time: "22:00", match: "Night Hunters VS Lost Angel", winner: "Lost Angel", loser: "Night Hunters" },
  { matchNumber: 99, date: "29/11/2023", time: "19:00", match: "No Name Esports VS Gsg Gamer", winner: "Gsg Gamer", loser: "No Name Esports" },
  { matchNumber: 100, date: "29/11/2023", time: "19:45", match: "Total Gaming VS 7Bantai", winner: "Total Gaming", loser: "7Bantai" },
  { matchNumber: 101, date: "29/11/2023", time: "20:30", match: "Team Legend VS Vortex Gaming", winner: "Vortex Gaming", loser: "Team Legend" },
  { matchNumber: 102, date: "29/11/2023", time: "21:45", match: "Team Joker VS Blood Line", winner: "Blood Line", loser: "Team Joker" },
  { matchNumber: 103, date: "29/11/2023", time: "22:00", match: "Bunny Gaming VS Ssp Gaming", winner: "Bunny Gaming", loser: "Ssp Gaming" },
  { matchNumber: 104, date: "30/11/2023", time: "19:00", match: "Ysp Gaming VS Malli Gaming", winner: "Ysp Gaming", loser: "Malli Gaming" },
  { matchNumber: 105, date: "30/11/2023", time: "19:45", match: "Krack Gaming VS God Killer", winner: "God Killer", loser: "Krack Gaming" },
  { matchNumber: 106, date: "30/11/2023", time: "20:30", match: "Anil Gaming VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Anil Gaming" },
  { matchNumber: 107, date: "30/11/2023", time: "21:45", match: "Ans Gaming VS Opnikhil", winner: "Ans Gaming", loser: "Opnikhil" },
  { matchNumber: 108, date: "30/11/2023", time: "22:00", match: "Hunter Gaming YT YT VS Shivtej Warrior", winner: "Hunter Gaming YT YT", loser: "Shivtej Warrior" },
  { matchNumber: 109, date: "1/12/2023", time: "19:00", match: "No Name Esports VS Ssp Gaming", winner: "No Name Esports", loser: "Ssp Gaming" },
  { matchNumber: 110, date: "1/12/2023", time: "19:45", match: "Anil Gaming VS Ysp Gaming", winner: "Anil Gaming", loser: "Ysp Gaming" },
  { matchNumber: 111, date: "1/12/2023", time: "20:30", match: "God Killer VS Ans Gaming", winner: "Ans Gaming", loser: "God Killer" },
  { matchNumber: 112, date: "1/12/2023", time: "21:45", match: "Team Joker VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Team Joker" },
  { matchNumber: 113, date: "1/12/2023", time: "22:00", match: "Madhubhai Gaming VS Gsg Gamer", winner: "Madhubhai Gaming", loser: "Gsg Gamer" },
  { matchNumber: 114, date: "2/12/2023", time: "15:00", match: "Hunter Gaming YT YT VS Total Gaming", winner: "Total Gaming", loser: "Hunter Gaming YT YT" },
  { matchNumber: 115, date: "2/12/2023", time: "16:00", match: "Krack Gaming VS Bunny Gaming", winner: "Bunny Gaming", loser: "Krack Gaming" },
  { matchNumber: 116, date: "2/12/2023", time: "19:00", match: "Blood Line VS Shivtej Warrior", winner: "Shivtej Warrior", loser: "Blood Line" },
  { matchNumber: 117, date: "2/12/2023", time: "19:45", match: "Vortex Gaming VS Rowdy Gaming", winner: "Rowdy Gaming", loser: "Vortex Gaming" },
  { matchNumber: 118, date: "2/12/2023", time: "20:30", match: "Lost Angel VS 7Bantai", winner: "Lost Angel", loser: "7Bantai" },
  { matchNumber: 119, date: "2/12/2023", time: "21:45", match: "Team Legend VS Opnikhil", winner: "Team Legend", loser: "Opnikhil" },
  { matchNumber: 120, date: "2/12/2023", time: "22:00", match: "Malli Gaming VS Night Hunters", winner: "Malli Gaming", loser: "Night Hunters" },
  { matchNumber: 121, date: "3/12/2023", time: "15:00", match: "No Name Esports VS Ans Gaming", winner: "No Name Esports", loser: "Ans Gaming" },
  { matchNumber: 122, date: "3/12/2023", time: "16:00", match: "Anil Gaming VS 7Bantai", winner: "Anil Gaming", loser: "7Bantai" },
  { matchNumber: 123, date: "3/12/2023", time: "19:00", match: "Team Legend VS Ssp Gaming", winner: "Team Legend", loser: "Ssp Gaming" },
  { matchNumber: 124, date: "3/12/2023", time: "19:45", match: "Malli Gaming VS Hunter Gaming YT YT", winner: "Hunter Gaming YT", loser: "Malli Gaming" },
  { matchNumber: 125, date: "3/12/2023", time: "20:30", match: "God Killer VS Vortex Gaming", winner: "God Killer", loser: "Vortex Gaming" },
  { matchNumber: 126, date: "3/12/2023", time: "21:45", match: "Ysp Gaming VS Loveguru Gaming", winner: "Loveguru Gaming", loser: "Ysp Gaming" },
  { matchNumber: 127, date: "3/12/2023", time: "22:00", match: "Opnikhil VS Krack Gaming", winner: "Krack Gaming", loser: "Opnikhil" },
  { matchNumber: 128, date: "4/12/2023", time: "19:00", match: "Total Gaming VS Team Joker", winner: "Team Joker", loser: "Total Gaming" },
  { matchNumber: 129, date: "4/12/2023", time: "19:45", match: "Rowdy Gaming VS Gsg Gamer", winner: "Rowdy Gaming", loser: "Gsg Gamer" },
  { matchNumber: 130, date: "4/12/2023", time: "20:30", match: "Night Hunters VS Blood Line", winner: "Blood Line", loser: "Night Hunters" },
  { matchNumber: 131, date: "4/12/2023", time: "21:45", match: "Madhubhai Gaming VS Bunny Gaming", winner: "Madhubhai Gaming", loser: "Bunny Gaming" },
  { matchNumber: 132, date: "4/12/2023", time: "22:00", match: "Lost Angel VS Shivtej Warrior", winner: "Shivtej Warrior", loser: "Lost Angel" },
];

async function seedSeason4Matches() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI .env file mein nahi mila.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 4 },
      { $set: { matches } }
    );

    if (result.matchedCount === 0) {
      throw new Error("Season 4 nahi mila. Pehle seedSeason4.js run karo.");
    }

    console.log(`Season 4: ${matches.length} matches saved.`);
  } catch (error) {
    console.error("Season 4 update failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason4Matches();