const mongoose = require('mongoose');

const RepoResultSchema = new mongoose.Schema(
    {
        keyword: { type: String, index: true, required: true },
        repoId: { type: Number, required: true },
        name: String,
        full_name: String,
        description: String,
        html_url: String,
        stargazers_count: Number,
        language: String,
        owner_login: String,
        created_at: Date,
        pushed_at: Date,
        fetchedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Avoid duplicates per keyword+repoId
RepoResultSchema.index({ keyword: 1, repoId: 1 }, { unique: true });

module.exports = mongoose.model('RepoResult', RepoResultSchema);