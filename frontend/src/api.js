// Tic Tac Toe v.2.0.0
// Author: Jam Furaque

import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const startGame = async (mode) => {
  return axios.post(`${API_URL}/start`, { mode });
};

export const makeMove = async (row, col) => {
  return axios.post(`${API_URL}/move`, { row, col });
};

export const resetGame = async () => {
  return axios.get(`${API_URL}/reset`);
};
