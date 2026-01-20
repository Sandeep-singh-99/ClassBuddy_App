// import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
// import React from "react";
// import { useAuth } from "@/context/AuthContext";
// import RazorpayCheckout from 'react-native-razorpay';
// import { createOrder } from "@/services/CreateOrder";
// import { axiosClient } from "@/helper/axios";

// type Props = {
//   plan_id: string;
//   planName: string;
//   amount: number;
// };

// export default function BuyOrder({ plan_id, planName, amount }: Props) {
//     const { user } = useAuth();

//     const handleSubmit = async () => {
       
//         const order = await createOrder(plan_id);

//         const options = {
//       key: order.key,
//       amount: order.amount,
//       currency: "INR",
//       name: "ClassBuddy",
//       description: planName,
//       order_id: order.order_id,

//     //   handler: async function (response: any) {
//     //     // verify payment backend
//     //     await axiosClient.post("/mobile/subscription/verify-payment", {
//     //       razorpay_payment_id: response.razorpay_payment_id,
//     //       razorpay_order_id: response.razorpay_order_id,
//     //       razorpay_signature: response.razorpay_signature,
//     //       plan_id: plan_id,
//     //     });

//     //     ToastAndroid.show("Payment successful 🎉", ToastAndroid.SHORT);
//     //   },

//     //   prefill: {
//     //     name: user?.full_name,
//     //     email: user?.email,
//     //   },

//     //   theme: {
//     //     color: "#6366f1",
//     //   },
//     };

//     RazorpayCheckout.open(options).then((payment => async () => {
//         await axiosClient.post("/mobile/subscription/verify-payment", {
//           razorpay_payment_id: payment.razorpay_payment_id,
//           razorpay_order_id: payment.razorpay_order_id,
//           razorpay_signature: payment.razorpay_signature,
//           plan_id: plan_id,
//         });

//         ToastAndroid.show("Payment successful 🎉", ToastAndroid.SHORT);
//     })).catch((error) => {
//         ToastAndroid.show("Payment failed 🎉", ToastAndroid.SHORT);
//     })
//     }
//   return (
//     <TouchableOpacity
//       onPress={handleSubmit}
//       className="bg-indigo-600 py-3 rounded-xl items-center active:bg-indigo-700 shadow-sm shadow-indigo-200"
//     >
//       <Text className="text-white text-sm font-bold">Buy Now</Text>
//     </TouchableOpacity>
//   );
// }


import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import RazorpayCheckout from "react-native-razorpay";
import { createOrder } from "@/services/CreateOrder";
import { axiosClient } from "@/helper/axios";

type Props = {
  plan_id: string;
  planName: string;
  amount: number;
};

export default function BuyOrder({ plan_id, planName, amount }: Props) {
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      const order = await createOrder(plan_id);

      const options = {
        key: order.key, // rzp_test_xxxxx
        amount: order.amount, // in paise
        currency: "INR",
        name: "ClassBuddy",
        description: planName,
        order_id: order.order_id,

        prefill: {
          name: user?.full_name || "",
          email: user?.email || "",
        },

        theme: {
          color: "#6366f1",
        },
      };

      const payment = await RazorpayCheckout.open(options);

      // ✅ VERIFY PAYMENT (VERY IMPORTANT)
      await axiosClient.post("/mobile/subscription/verify-payment", {
        razorpay_payment_id: payment.razorpay_payment_id,
        razorpay_order_id: payment.razorpay_order_id,
        razorpay_signature: payment.razorpay_signature,
        plan_id: plan_id,
      });

      ToastAndroid.show("Payment successful 🎉", ToastAndroid.SHORT);
    } catch (error: any) {
      console.log("Razorpay error", error);
      ToastAndroid.show("Payment failed ❌", ToastAndroid.SHORT);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSubmit}
      className="bg-indigo-600 py-3 rounded-xl items-center active:bg-indigo-700"
    >
      <Text className="text-white text-sm font-bold">Buy Now</Text>
    </TouchableOpacity>
  );
}
