"use client";

import React, { useEffect, useState } from 'react';
import useCharacter from "../../hooks/useCharacter";
import { Card, CardContent, CardMedia, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Character, LocationData } from '@/app/types';

type CharacterPageProps = {
  params: {
    id: string;
  };
};

const CharacterPage: React.FC<CharacterPageProps> = ({ params }) => {
  const { data: characterData, error: characterError, isLoading: characterLoading } = useCharacter<Character>(
    "character",
    Number(params.id)
  );

  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [episodeNames, setEpisodeNames] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (characterData?.location.url) {
      fetch(characterData.location.url)
        .then(response => response.json())
        .then(data => setLocationData(data));
    }
  }, [characterData]);

  useEffect(() => {
    if (characterData?.episode) {
      Promise.all(characterData.episode.map(url => fetch(url).then(res => res.json())))
        .then(episodes => setEpisodeNames(episodes.map(episode => episode.name)));
    }
  }, [characterData]);

  if (characterLoading) return <div>Loading...</div>;
  if (characterError) return <div>An error has occurred: {characterError.message}</div>;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={characterData?.image}
        alt={characterData?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {characterData?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {characterData?.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Species: {characterData?.species}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {characterData?.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Origin: {characterData?.origin.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {characterData?.location.name}
        </Typography>
        {locationData && (
          <>
            <Typography variant="body2" color="text.secondary">
              Location Name: {locationData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dimension: {locationData.dimension}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Number of Residents: {locationData.residents.length}
            </Typography>
          </>
        )}
        {episodeNames.length > 0 && (
          <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Episodes
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {episodeNames.map((name, index) => (
                <MenuItem key={index} onClick={handleClose}>
                  {name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterPage;
