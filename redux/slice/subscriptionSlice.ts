import { axiosClient } from "@/helper/axios";
import {
  IAnalytics,
  IStats,
  IStudentGroupSubscription,
  ISubscriptionPlan,
} from "@/types/subscription";
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
          error.response?.data?.detail || "Fetching subscription plans failed",
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  },
);

export const createSubscriptionPlan = createAsyncThunk(
  "subscription/create",
  async (data: Partial<ISubscriptionPlan>, thunkApi) => {
    try {
      const response = await axiosClient.post(
        "/mobile/subscription/plan",
        data,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Creating subscription plan failed",
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  },
);

export const updateSubscriptionPlan = createAsyncThunk(
  "subscription/update",
  async (
    { id, data }: { id: string; data: Partial<ISubscriptionPlan> },
    thunkApi,
  ) => {
    try {
      const response = await axiosClient.put(
        `/mobile/subscription/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Updating subscription plan failed",
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  },
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
          error.response?.data?.detail || "Deleting subscription plan failed",
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  },
);

export const fetchTeacherSubscriptionStats = createAsyncThunk(
  "subscription/stats",
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.get(
        "/mobile/subscription/teacher/stats",
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail || "Fetching subscription stats failed",
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  },
);

export const fetchSubscriptionAnalytics = createAsyncThunk(
  "subscription/analytics",
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.get(
        "/mobile/subscription/teacher/analytics",
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail ||
            "Fetching subscription analytics failed",
        );
      }
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  },
);

export const fetchStudentSubscriptionPlans = createAsyncThunk(
  "subscription/studentPlans",
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.get(
        "/mobile/subscription/student/plans",
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(
          error.response?.data?.detail ??
            error.message ??
            "Fetching student plans failed",
        );
      }
    }
  },
);

interface SubscriptionState {
  plans: ISubscriptionPlan[];
  loading: boolean;
  error: string | null;
  stats: IStats | null;
  analytics: IAnalytics | null;
  studentGroups: IStudentGroupSubscription[];
}

const initialState: SubscriptionState = {
  plans: [],
  loading: false,
  error: null,
  stats: null,
  analytics: null,
  studentGroups: [],
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
        },
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
        },
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
            (plan) => plan.id === action.payload.id,
          );
          if (index !== -1) {
            state.plans[index] = action.payload;
          }
          state.loading = false;
          state.error = null;
        },
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
            (plan) => plan.id !== action.payload,
          );
          state.loading = false;
          state.error = null;
        },
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
        },
      )
      .addCase(fetchTeacherSubscriptionStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Subscription Analytics
      .addCase(fetchSubscriptionAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubscriptionAnalytics.fulfilled,
        (state, action: PayloadAction<IAnalytics>) => {
          state.analytics = action.payload;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchSubscriptionAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Student Plans
    builder.addCase(fetchStudentSubscriptionPlans.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStudentSubscriptionPlans.fulfilled,
      (state, action: PayloadAction<IStudentGroupSubscription[]>) => {
        state.loading = false;
        state.studentGroups = action.payload;
      },
    );
    builder.addCase(fetchStudentSubscriptionPlans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default subscriptionSlice.reducer;
