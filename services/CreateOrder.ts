import { axiosClient } from "@/helper/axios";

export const createOrder = async (planId: string) => {
  const { data } = await axiosClient.post("/mobile/subscription/create-order", {
    plan_id: planId,
  });
  return data;
};
