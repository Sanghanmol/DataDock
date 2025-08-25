const express = require('express');
const RepoResult = require('../models/RepoResult');
const asyncHandler = require('../utils/asyncHandler');
const { searchRepos } = require('../services/github.service');

const router = express.Router();

// POST /api/search?keyword=...
router.post(
    '/search',
    asyncHandler(async (req, res) => {
        const keyword = (req.query.keyword || req.body.keyword || '').trim();
        if (!keyword) return res.status(400).json({ message: 'keyword is required' });

        const items = await searchRepos(keyword, 20, 1);
        // Upsert results
        const operations = items.map((i) => ({
            updateOne: {
                filter: { keyword, repoId: i.id },
                update: {
                    $set: {
                        keyword,
                        repoId: i.id,
                        name: i.name,
                        full_name: i.full_name,
                        description: i.description,
                        html_url: i.html_url,
                        stargazers_count: i.stargazers_count,
                        language: i.language,
                        owner_login: i.owner?.login,
                        created_at: i.created_at ? new Date(i.created_at) : null,
                        pushed_at: i.pushed_at ? new Date(i.pushed_at) : null,
                        fetchedAt: new Date()
                    }
                },
                upsert: true
            }
        }));

        if (operations.length) {
            await RepoResult.bulkWrite(operations, { ordered: false });
        }

        res.json({ message: 'Search stored', count: items.length });
    })
);

// GET /api/results?keyword=&page=&limit=
router.get(
    '/results',
    asyncHandler(async (req, res) => {
        const keyword = (req.query.keyword || '').trim();
        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 50);
        const filter = keyword ? { keyword } : {};


        const [total, data] = await Promise.all([
            RepoResult.countDocuments(filter),
            RepoResult.find(filter)
                .sort({ fetchedAt: -1, stargazers_count: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean()
        ]);

        res.json({ page, limit, total, data });
    })
);

module.exports = router;