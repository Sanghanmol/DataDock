import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getResults } from '../api/client';
import {
  Container,
  Typography,
  Box,
  Link,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';

const DetailsPage = () => {
  const { repoId } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        setLoading(true);
        const res = await getResults('', 1, 100);
        const found = res.data.data.find((r) => r.repoId.toString() === repoId);
        if (found) setRepo(found);
        else setError('Repository not found');
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch repository');
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [repoId]);

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 6 }}>
      <Button
        component={RouterLink}
        to="/"
        variant="outlined"
        sx={{ mb: 6 }}
      >
        ← Back to Dashboard
      </Button>

      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {repo.full_name}
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ mt:4,mb: 4, color:'text.secondary'}}>
            {repo.description || 'No description available.'}
          </Typography>

          {/* Stats */}
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Chip
              icon={<StarIcon />}
              label={`Stars: ${repo.stargazers_count}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<CodeIcon />}
              label={`Language: ${repo.language || 'N/A'}`}
              color="secondary"
              variant="outlined"
            />
            <Chip
              icon={<PersonIcon />}
              label={`Owner: ${repo.owner_login}`}
              color="default"
              variant="outlined"
            />
          </Stack>

          {/* Dates */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2">
              <strong>Created At:</strong> {new Date(repo.created_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>Last Push:</strong> {new Date(repo.pushed_at).toLocaleString()}
            </Typography>
          </Box>

          {/* Visit GitHub */}
          <Link href={repo.html_url} target="_blank" rel="noopener" sx={{ fontWeight: 'bold' }}>
            Visit Repository on GitHub
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailsPage;
