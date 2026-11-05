require("dotenv").config();

const mongoose = require("mongoose");
const Season = require("./season");

const playoffs = {
  rounds: [
    {
      name: "ELIMINATORS",
      matches: [
        {
          id: "E1",
          name: "Eliminator 1",
          format: "BO1",
          team1: "Ans Gaming",
          team2: "Night Hunters",
          score1: 1,
          score2: 0,
          winner: "Ans Gaming",
          nextMatchId: "SF1",
          nextSlot: 1
        },
        {
          id: "E2",
          name: "Eliminator 2",
          format: "BO1",
          team1: "Madhubhai Gaming",
          team2: "Team Joker",
          score1: 0,
          score2: 1,
          winner: "Team Joker",
          nextMatchId: "SF2",
          nextSlot: 1
        },
        {
          id: "E3",
          name: "Eliminator 3",
          format: "BO1",
          team1: "God Killer",
          team2: "Anil Gaming",
          score1: 1,
          score2: 0,
          winner: "God Killer",
          nextMatchId: "SF3",
          nextSlot: 1
        },
        {
          id: "E4",
          name: "Eliminator 4",
          format: "BO1",
          team1: "Team Legend",
          team2: "Total Gaming",
          score1: 0,
          score2: 1,
          winner: "Total Gaming",
          nextMatchId: "SF4",
          nextSlot: 1
        },
        {
          id: "E5",
          name: "Eliminator 5",
          format: "BO1",
          team1: "Rowdy Gaming",
          team2: "Shivtej Warrior",
          score1: 1,
          score2: 0,
          winner: "Rowdy Gaming",
          nextMatchId: "SF1",
          nextSlot: 2
        },
        {
          id: "E6",
          name: "Eliminator 6",
          format: "BO1",
          team1: "No Name Esports",
          team2: "Loveguru Gaming",
          score1: 0,
          score2: 1,
          winner: "Loveguru Gaming",
          nextMatchId: "SF2",
          nextSlot: 2
        },
        {
          id: "E7",
          name: "Eliminator 7",
          format: "BO1",
          team1: "Vortex Gaming",
          team2: "Blood Line",
          score1: 1,
          score2: 0,
          winner: "Vortex Gaming",
          nextMatchId: "SF3",
          nextSlot: 2
        },
        {
          id: "E8",
          name: "Eliminator 8",
          format: "BO1",
          team1: "Bunny Gaming",
          team2: "Lost Angel",
          score1: 1,
          score2: 0,
          winner: "Bunny Gaming",
          nextMatchId: "SF4",
          nextSlot: 2
        }
      ]
    },

    {
      name: "SEMI FINALS",
      matches: [
        {
          id: "SF1",
          name: "Semi Final 1",
          format: "BO3",
          team1: "Ans Gaming",
          team2: "Rowdy Gaming",
          score1: 2,
          score2: 0,
          winner: "Ans Gaming",
          nextMatchId: "F1",
          nextSlot: 1
        },
        {
          id: "SF2",
          name: "Semi Final 2",
          format: "BO3",
          team1: "Team Joker",
          team2: "Loveguru Gaming",
          score1: 2,
          score2: 0,
          winner: "Team Joker",
          nextMatchId: "F2",
          nextSlot: 1
        },
        {
          id: "SF3",
          name: "Semi Final 3",
          format: "BO3",
          team1: "God Killer",
          team2: "Vortex Gaming",
          score1: 1,
          score2: 2,
          winner: "Vortex Gaming",
          nextMatchId: "F2",
          nextSlot: 2
        },
        {
          id: "SF4",
          name: "Semi Final 4",
          format: "BO3",
          team1: "Total Gaming",
          team2: "Bunny Gaming",
          score1: 2,
          score2: 0,
          winner: "Total Gaming",
          nextMatchId: "F1",
          nextSlot: 2
        }
      ]
    },

    {
      name: "FINALS",
      matches: [
        {
          id: "F1",
          name: "Final 1",
          format: "BO5",
          team1: "Ans Gaming",
          team2: "Total Gaming",
          score1: 3,
          score2: 0,
          winner: "Ans Gaming",
          nextMatchId: "GF",
          nextSlot: 1
        },
        {
          id: "F2",
          name: "Final 2",
          format: "BO5",
          team1: "Team Joker",
          team2: "Vortex Gaming",
          score1: 3,
          score2: 1,
          winner: "Team Joker",
          nextMatchId: "GF",
          nextSlot: 2
        }
      ]
    },

    {
      name: "GRAND FINAL",
      matches: [
        {
          id: "GF",
          name: "Grand Final",
          format: "BO7",
          team1: "Ans Gaming",
          team2: "Team Joker",
          score1: 4,
          score2: 0,
          winner: "Ans Gaming"
        }
      ]
    }
  ]
};

async function seedSeason4Playoffs() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const result = await Season.updateOne(
      { seasonNumber: 4 },
      { $set: { playoffs } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new Error(
        "Season 4 not found. Run the existing Season 4 seed first."
      );
    }

    console.log("Season 4 playoff data saved successfully.");
    console.log("Eliminators: 8 | Semi Finals: 4 | Finals: 2 | Grand Final: 1");
    console.log("Champion: Ans Gaming");
  } catch (error) {
    console.error("Failed to save Season 4 playoffs:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason4Playoffs();