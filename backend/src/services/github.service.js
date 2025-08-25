const axios = require('axios');

const searchRepos = async (keyword, perPage = 20, page = 1) => {
    const url = 'https://api.github.com/search/repositories';
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const params = {
        q: keyword,
        sort: 'stars',
        order: 'desc',
        per_page: perPage,
        page
    };

    const { data } = await axios.get(url, { headers, params });
    return data.items || [];
};

module.exports = { searchRepos };