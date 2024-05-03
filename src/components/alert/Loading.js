import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function Loading() {
  return (
    <Container>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          }}
          size={40}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={40}
          thickness={4}
        />
      </Box>
      <br />
      <BorderLinearProgress variant="determinate" value={50} />
    </Container>
  );
}

export default Loading;


 