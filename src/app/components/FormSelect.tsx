"use client";

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface SelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const StatusSelect: React.FC<SelectProps> = ({ value, onChange }) => (
  <FormControl variant="outlined">
    <InputLabel>Status</InputLabel>
    <Select value={value} onChange={onChange}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="Alive">Alive</MenuItem>
      <MenuItem value="Dead">Dead</MenuItem>
      <MenuItem value="Unknown">Unknown</MenuItem>
    </Select>
  </FormControl>
);

export const GenderSelect: React.FC<SelectProps> = ({ value, onChange }) => (
  <FormControl variant="outlined">
    <InputLabel>Gender</InputLabel>
    <Select value={value} onChange={onChange}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="Female">Female</MenuItem>
      <MenuItem value="Male">Male</MenuItem>
      <MenuItem value="Genderless">Genderless</MenuItem>
      <MenuItem value="unknown">unknown</MenuItem>
    </Select>
  </FormControl>
);

export const SpeciesSelect: React.FC<SelectProps> = ({ value, onChange }) => (
  <FormControl variant="outlined">
    <InputLabel>Species</InputLabel>
    <Select value={value} onChange={onChange}>
      <MenuItem value="">None</MenuItem>
      <MenuItem value="Human">Human</MenuItem>
      <MenuItem value="Alien">Alien</MenuItem>
      <MenuItem value="Humanoid">Humanoid</MenuItem>
      <MenuItem value="Poopybutthole">Poopybutthole</MenuItem>
      <MenuItem value="Mythological Creature">Mythological</MenuItem>
      <MenuItem value="Unknown">Unknown</MenuItem>
      <MenuItem value="Animal">Animal</MenuItem>
      <MenuItem value="Disease">Disease</MenuItem>
      <MenuItem value="Robot">Robot</MenuItem>
      <MenuItem value="Cronenberg">Cronenberg</MenuItem>
      <MenuItem value="Planet">Planet</MenuItem>
    </Select>
  </FormControl>
);
