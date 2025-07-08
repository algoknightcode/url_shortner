import React from "react";
import Input from "./serch_ui";
import { Card, Box, Typography, Button, Paper, Fade } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const Home = () => {
  const [result, setResult] = React.useState(null);

  return (
    <Box minHeight="70vh" display="flex" alignItems="center" justifyContent="center" sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
      <Card sx={{
        background: 'rgba(255,255,255,0.85)',
        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.18)',
        borderRadius: 6,
        px: { xs: 2, sm: 6 },
        py: { xs: 4, sm: 6 },
        minWidth: { xs: 320, sm: 420 },
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Typography variant="h3" fontWeight={800} letterSpacing={2} color="#1976d2" mb={2} sx={{ textShadow: '0 2px 12px #90caf9' }}>
          <LinkIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Shorten Your URL
        </Typography>
        <Input setResult={setResult} />
        <Fade in={!!result} timeout={600}>
          <Box width="100%">
            {result && (
              <Paper elevation={4} sx={{ mt: 4, p: 3, borderRadius: 3, background: 'linear-gradient(120deg, #e3f2fd 60%, #fff 100%)', textAlign: 'center', boxShadow: '0 2px 12px #90caf9' }}>
                <Typography fontWeight={700} fontSize={20} color="#1976d2" mb={1}>
                  Your Shortened Link
                </Typography>
                <Typography fontSize={16} mb={0.5}><b>Original:</b> <a href={result.originalUrl} target="_blank" rel="noopener noreferrer">{result.originalUrl}</a></Typography>
                <Typography fontSize={16} mb={0.5}><b>Short:</b> <a href={`${window.location.origin}/s/${result.shortUrl.split('/s/')[1]}`}>{`${window.location.origin}/s/${result.shortUrl.split('/s/')[1]}`}</a></Typography>
                <Typography fontSize={15} color="#1976d2" mb={2}><b>Expires:</b> {new Date(result.expiry).toLocaleString()}</Typography>
                <Button variant="contained" size="large" sx={{ mt: 1, borderRadius: 2, fontWeight: 700, fontSize: 16, background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)' }} onClick={() => window.location.href = '/statistics'}>
                  Detailed History
                </Button>
              </Paper>
            )}
          </Box>
        </Fade>
      </Card>
    </Box>
  );
};

export default Home;
