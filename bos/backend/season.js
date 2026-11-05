const mongoose = require("mongoose");

const seasonTeamSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    group: { type: String, enum: ["A", "B"], default: undefined },
    name: { type: String, required: true, trim: true },
    matches: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    damage: { type: Number, default: 0 },
    stats: { type: mongoose.Schema.Types.Mixed, default: undefined },
    status: { type: String, default: undefined }
  },
  { _id: false }
);

const seasonSchema = new mongoose.Schema(
  {
    seasonNumber: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    status: { type: String, default: "Completed" },
    standings: { type: [seasonTeamSchema], default: [] },
    standingsColumns: { type: [mongoose.Schema.Types.Mixed], default: undefined },
    matchColumns: { type: [mongoose.Schema.Types.Mixed], default: undefined },
    matches: { type: [mongoose.Schema.Types.Mixed], default: [] },
    playoffs: { type: mongoose.Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Season", seasonSchema);