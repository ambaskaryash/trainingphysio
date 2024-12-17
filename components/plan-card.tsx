import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionButton } from "@/components/subscription-button";
import { Check } from "lucide-react";

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    categories: Array<{ name: string }>;
  };
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-3xl font-bold mb-4">
          ${plan.price}<span className="text-lg font-normal">/month</span>
        </div>
        <ul className="space-y-2 mb-6">
          {plan.categories.map((category, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              {category.name}
            </li>
          ))}
        </ul>
        <SubscriptionButton 
          planId={plan.id}
          planName={plan.name}
          amount={plan.price}
        />
      </CardContent>
    </Card>
  );
}