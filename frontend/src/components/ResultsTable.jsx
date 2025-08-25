import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ResultsTable = ({ results }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell>OWNER</TableCell>
            <TableCell>STARS</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>DETAILS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((repo) => (
            <TableRow key={repo.repoId}>
              <TableCell>{repo.name}</TableCell>
              <TableCell>{repo.owner_login}</TableCell>
              <TableCell>{repo.stargazers_count}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  OPEN
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  component={RouterLink}
                  to={`/repo/${repo.repoId}`}
                >
                  VIEW
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;