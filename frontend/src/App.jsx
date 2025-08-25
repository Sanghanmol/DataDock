import React, { useState } from 'react';
import { useResultsStore } from './store/useResultsStore';
import { Container, Typography, CircularProgress, Alert, Box} from '@mui/material';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';
import Pager from './components/Pager';
import { searchRepos, getResults } from './api/client';

const App = () => {
  const results = useResultsStore((state) => state.results);
  const setResults = useResultsStore((state) => state.setResults);
  const keyword = useResultsStore((state) => state.keyword);
  const setKeyword = useResultsStore((state) => state.setKeyword);
  const page = useResultsStore((state) => state.page);
  const setPage = useResultsStore((state) => state.setPage);
  const totalPages = useResultsStore((state) => state.totalPages);
  const setTotalPages = useResultsStore((state) => state.setTotalPages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchResults = async (kw, pageNum = 1) => {
    try {
      setLoading(true);
      setError('');
      await searchRepos(kw);
      const res = await getResults(kw, pageNum);
      setResults(res.data.data);
      setTotalPages(Math.ceil(res.data.total / res.data.limit));
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (kw) => {
    setKeyword(kw);
    setPage(1);
    fetchResults(kw, 1);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    fetchResults(keyword, pageNum);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3} textAlign="center" sx={{ fontWeight: 500 }}>
        DataDock
      </Typography>
      <SearchForm onSearch={handleSearch} />
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && results.length > 0 && (
        <>
          <ResultsTable results={results} />
          <Pager page={page} totalPages={totalPages} onChange={handlePageChange} />
        </>
      )}
    </Container>
  );
};

export default App;