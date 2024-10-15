import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

// Define the types for the lyrics and chords
type LyricWithChords = {
    lyrics: string;
    chords?: string; // Chords are optional
};

type ChordsLyricsDisplayProps = {
    data: LyricWithChords[][]; // Array of lines, where each line contains lyric-chord objects
};

// Functional component to display chords and lyrics
const ChordsLyricsDisplay: React.FC<ChordsLyricsDisplayProps> = ({ data }) => {
    return (
        <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', padding: '20px' }}>
            {data.map((line, lineIndex) => (
                <Box key={lineIndex} sx={{ marginBottom: '20px' }}>
                    <Grid container spacing={1} justifyContent="center">
                        {line.map((item, index) => (
                            <Grid item key={index}>
                                {/* Chord above the lyric, if chord exists */}
                                <Typography
                                    variant="body1"
                                    align="center"
                                    sx={{ color: item.chords ? 'blue' : 'inherit', fontWeight: item.chords ? 'bold' : 'normal' }}
                                >
                                    {item.chords || '\u00A0'} {/* If no chord, use non-breaking space */}
                                </Typography>
                                <Typography variant="body1" align="center">
                                    {item.lyrics}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default ChordsLyricsDisplay;
