import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// open-weather api key
const API_KEY = "2a0e8387bf39270459e34d376bc4ec12";

// Thunk per fetchare meteo attuale per città
export const fetchCurrentWeather = createAsyncThunk(
  "weather7fetchCurrentWeather",
  async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
    );
    if (!res.ok) throw new Error("Errore nel recupero dei dati meteo");
    const data = await res.json();
    return data;
  }
);

// Thunk per forecast 5 giorni
export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=it`
    );
    if (!res.ok) throw new Error("Errore nel recupero del forecast");
    const data = await res.json();
    return data;
  }
);

const initialState = {
  current: null,
  forecast: [],
  status: "idle",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // se servono azioni sincrone qui
    clearWeather(state) {
      state.current = null;
      state.forecast = [];
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.status = "succeded";
        state.current = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecast = action.payload.list;
      });
  },
});

export const { clearWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
