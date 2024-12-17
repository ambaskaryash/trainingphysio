import { PlanCard } from "@/components/plan-card";
import { prisma } from "@/lib/prisma";

export default async function PlansPage() {
  const plans = await prisma.plan.findMany({
    include: {
      categories: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}