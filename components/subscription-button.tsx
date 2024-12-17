"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SubscriptionButtonProps {
  planId: string;
  planName: string;
  amount: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function SubscriptionButton({ planId, planName, amount }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);

      // Create order
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "PhysioFlex",
        description: `Subscribe to ${planName}`,
        order_id: data.orderId,
        handler: async (response: any) => {
          // Verify payment and create subscription
          const verifyResponse = await fetch("/api/subscription/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planId,
            }),
          });

          if (verifyResponse.ok) {
            toast({
              title: "Success!",
              description: "Subscription activated successfully",
            });
          } else {
            throw new Error("Payment verification failed");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: "Error",
        description: "Subscription failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSubscribe} disabled={isLoading}>
      {isLoading ? "Processing..." : "Subscribe Now"}
    </Button>
  );
}