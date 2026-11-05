require("dotenv").config();
const mongoose = require("mongoose");
const Season = require("./season");

const playoffs = {
  champion: "Ans Gaming",
  runnerUp: "MRAK",

  rounds: [
    {
      name: "ELIMINATORS",
      matches: [
        {
          name: "Eliminator 1",
          format: "BO1",
          team1: "Vortex Gaming",
          team2: "Sky Devil",
          score1: 1,
          score2: 0,
          winner: "Vortex Gaming"
        },
        {
          name: "Eliminator 2",
          format: "BO1",
          team1: "Dark Hunter",
          team2: "OTC",
          score1: 0,
          score2: 1,
          winner: "OTC"
        },
        {
          name: "Eliminator 3",
          format: "BO1",
          team1: "Lost Angel",
          team2: "Krack Gaming",
          score1: 1,
          score2: 0,
          winner: "Lost Angel"
        },
        {
          name: "Eliminator 4",
          format: "BO1",
          team1: "Agent 03",
          team2: "Gamer Aadi",
          score1: 1,
          score2: 0,
          winner: "Agent 03"
        },
        {
          name: "Eliminator 5",
          format: "BO1",
          team1: "Lost Angel",
          team2: "Agent 03",
          score1: 1,
          score2: 0,
          winner: "Lost Angel"
        }
      ]
    },

    {
      name: "SEMI FINALS",
      matches: [
        {
          name: "Semi Final 1",
          format: "BO3",
          team1: "Ans Gaming",
          team2: "MRAK",
          score1: 2,
          score2: 0,
          winner: "Ans Gaming"
        },
        {
          name: "Semi Final 2",
          format: "BO3",
          team1: "Vortex Gaming",
          team2: "OTC",
          score1: 1,
          score2: 2,
          winner: "OTC"
        },
        {
          name: "Semi Final 3",
          format: "BO3",
          team1: "Vortex Gaming",
          team2: "Lost Angel",
          score1: 2,
          score2: 0,
          winner: "Vortex Gaming"
        }
      ]
    },

    {
      name: "TRIPLE THREAT",
      matches: [
        {
          name: "Triple Threat - Match 1",
          format: "BO1",
          team1: "MRAK",
          team2: "OTC",
          winner: "OTC"
        },
        {
          name: "Triple Threat - Match 2",
          format: "BO1",
          team1: "OTC",
          team2: "Vortex Gaming",
          winner: "Vortex Gaming"
        },
        {
          name: "Triple Threat - Match 3",
          format: "BO1",
          team1: "Vortex Gaming",
          team2: "MRAK",
          winner: "Vortex Gaming"
        }
      ]
    },

    {
      name: "ELIMINATOR 6",
      matches: [
        {
          name: "Eliminator 6",
          format: "BO1",
          team1: "OTC",
          team2: "MRAK",
          winner: "MRAK"
        }
      ]
    },

    {
      name: "FINALS",
      matches: [
        {
          name: "Final 1",
          format: "BO5",
          team1: "Ans Gaming",
          team2: "Vortex Gaming",
          score1: 3,
          score2: 2,
          winner: "Ans Gaming"
        },
        {
          name: "Final 2",
          format: "BO5",
          team1: "Vortex Gaming",
          team2: "MRAK",
          score1: 1,
          score2: 3,
          winner: "MRAK"
        }
      ]
    },

    {
      name: "GRAND FINAL",
      matches: [
        {
          name: "Grand Final",
          format: "BO1",
          team1: "Ans Gaming",
          team2: "MRAK",
          score1: 1,
          score2: 0,
          winner: "Ans Gaming"
        }
      ]
    }
  ]
};

async function seedSeason6Playoffs() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const season = await Season.findOneAndUpdate(
      { seasonNumber: 6 },
      { $set: { playoffs } },
      { new: true, runValidators: true }
    );

    if (!season) {
      throw new Error(
        "Season 6 database record nahi mila. Pehle confirm karo Season 6 MongoDB mein hai."
      );
    }

    console.log("Season 6 playoffs successfully updated.");
    console.log("Champion:", season.playoffs.champion);
    console.log("Rounds:", season.playoffs.rounds.length);
  } catch (error) {
    console.error("Season 6 playoffs update failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedSeason6Playoffs();