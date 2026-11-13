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
          id: "E1",
          name: "Eliminator 1",
          format: "BO1",
          team1: "Vortex Gaming",
          team2: "Sky Devil",
          score1: 1,
          score2: 0,
          winner: "Vortex Gaming",
          nextMatchId: "SF2"
        },
        {
          id: "E2",
          name: "Eliminator 2",
          format: "BO1",
          team1: "Dark Hunter",
          team2: "OTC",
          score1: 0,
          score2: 1,
          winner: "OTC",
          nextMatchId: "SF2"
        },
        {
          id: "E3",
          name: "Eliminator 3",
          format: "BO1",
          team1: "Lost Angel",
          team2: "Krack Gaming",
          score1: 1,
          score2: 0,
          winner: "Lost Angel",
          nextMatchId: "Eliminator 5"
        },
        {
          id: "E4",
          name: "Eliminator 4",
          format: "BO1",
          team1: "Agent 03",
          team2: "Gamer Aadi",
          score1: 1,
          score2: 0,
          winner: "Agent 03",
          nextMatchId: "Eliminator 5"
        },
        {
          id: "E5",
          name: "Eliminator 5",
          format: "BO1",
          team1: "Lost Angel",
          team2: "Agent 03",
          score1: 1,
          score2: 0,
          winner: "Lost Angel",
          nextMatchId: "SF3"
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
          team2: "MRAK",
          score1: 2,
          score2: 0,
          winner: "Ans Gaming",
          nextMatchId: "F1",
          loserNextMatchId: "Triple Threat"
        },
        {
          id: "SF2",
          name: "Semi Final 2",
          format: "BO3",
          team1: "Vortex Gaming",
          team2: "OTC",
          score1: 1,
          score2: 2,
          winner: "OTC",
          nextMatchId: "Triple Threat",
          loserNextMatchId: "SF3"
        },
        {
          id: "SF3",
          name: "Semi Final 3",
          format: "BO3",
          team1: "Vortex Gaming",
          team2: "Lost Angel",
          score1: 2,
          score2: 0,
          winner: "Vortex Gaming",
          nextMatchId: "Triple Threat"
        }
      ]
    },

    {
      name: "TRIPLE THREAT",
      matches: [
        {
          id: "TT1",
          name: "Triple Threat - Match 1",
          format: "BO1",
          team1: "MRAK",
          team2: "OTC",
          winner: "OTC",
          nextMatchId: "Triple Threat",
          loserNextMatchId: "CONTINUES"
        },
        {
          id: "TT2",
          name: "Triple Threat - Match 2",
          format: "BO1",
          team1: "OTC",
          team2: "Vortex Gaming",
          winner: "Vortex Gaming",
          nextMatchId: "Triple Threat",
          loserNextMatchId: "CONTINUES"
        },
        {
          id: "TT3",
          name: "Triple Threat - Match 3",
          format: "BO1",
          team1: "Vortex Gaming",
          team2: "MRAK",
          winner: "Vortex Gaming",
          nextMatchId: "F1",
          loserNextMatchId: "CONTINUES"
        }
      ]
    },

    {
      name: "ELIMINATOR 6",
      matches: [
        {
          id: "E6",
          name: "Eliminator 6",
          format: "BO1",
          team1: "OTC",
          team2: "MRAK",
          winner: "MRAK",
          nextMatchId: "F2"
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
          team2: "Vortex Gaming",
          score1: 3,
          score2: 2,
          winner: "Ans Gaming",
          nextMatchId: "GF",
          loserNextMatchId: "F2"
        },
        {
          id: "F2",
          name: "Final 2",
          format: "BO5",
          team1: "Vortex Gaming",
          team2: "MRAK",
          score1: 1,
          score2: 3,
          winner: "MRAK",
          nextMatchId: "GF"
        }
      ]
    },

    {
      name: "GRAND FINAL",
      matches: [
        {
          id: "GF",
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