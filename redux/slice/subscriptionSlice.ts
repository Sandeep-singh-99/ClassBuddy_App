import { axiosClient } from "@/helper/axios";
import { IStats, ISubscriptionPlan } from "@/types/subscription";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchOwnerSubscriptionPlans = createAsyncThunk(
  "subscription/plans",
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.get("/mobile/subscription/me");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Fetching subscription plans failed"
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const createSubscriptionPlan = createAsyncThunk(
  "subscription/create",
  async (data: Partial<ISubscriptionPlan>, thunkApi) => {
    try {
      const response = await axiosClient.post(
        "/mobile/subscription/plan",
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Creating subscription plan failed"
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const updateSubscriptionPlan = createAsyncThunk(
  "subscription/update",
  async (
    { id, data }: { id: string; data: Partial<ISubscriptionPlan> },
    thunkApi
  ) => {
    try {
      const response = await axiosClient.put(
        `/mobile/subscription/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Updating subscription plan failed"
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deleteSubscriptionPlan = createAsyncThunk(
  "subscription/delete",
  async (id: string, thunkApi) => {
    try {
      await axiosClient.delete(`/mobile/subscription/${id}`);
      return id;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Deleting subscription plan failed"
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchTeacherSubscriptionStats = createAsyncThunk(
  "subscription/stats",
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.get("/mobile/subscription/teacher/stats");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Fetching subscription stats failed"
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  }
);

interface SubscriptionState {
  plans: ISubscriptionPlan[];
  loading: boolean;
  error: string | null;
  stats: IStats | null;
}

const initialState: SubscriptionState = {
  plans: [],
  loading: false,
  error: null,
  stats: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Plans
      .addCase(fetchOwnerSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOwnerSubscriptionPlans.fulfilled,
        (state, action: PayloadAction<ISubscriptionPlan[]>) => {
          state.plans = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchOwnerSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Plan
      .addCase(createSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSubscriptionPlan.fulfilled,
        (state, action: PayloadAction<ISubscriptionPlan>) => {
          state.plans.push(action.payload);
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(createSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Plan
      .addCase(updateSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSubscriptionPlan.fulfilled,
        (state, action: PayloadAction<ISubscriptionPlan>) => {
          const index = state.plans.findIndex(
            (plan) => plan.id === action.payload.id
          );
          if (index !== -1) {
            state.plans[index] = action.payload;
          }
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(updateSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Plan
      .addCase(deleteSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSubscriptionPlan.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.plans = state.plans.filter(
            (plan) => plan.id !== action.payload
          );
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Teacher Stats
      .addCase(fetchTeacherSubscriptionStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeacherSubscriptionStats.fulfilled,
        (state, action: PayloadAction<IStats>) => {
          state.stats = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchTeacherSubscriptionStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subscriptionSlice.reducer;
