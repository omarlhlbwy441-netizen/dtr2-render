'use client';

import { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const plans = [
  {
    name: 'Starter',
    price: 0,
    features: ['1 Server', '1GB RAM', '10GB Storage', 'Community Support'],
  },
  {
    name: 'Pro',
    price: 29,
    features: ['5 Servers', '4GB RAM', '50GB Storage', 'Priority Support', 'SSL Certificates'],
  },
  {
    name: 'Enterprise',
    price: 99,
    features: ['Unlimited Servers', '16GB RAM', '200GB Storage', '24/7 Support', 'Custom Domains', 'Load Balancing'],
  },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Billing & Plans
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 ${
              selectedPlan === plan.name
                ? 'border-indigo-500'
                : 'border-transparent'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {plan.name}
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${plan.price}
              </span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full mt-6"
              variant={selectedPlan === plan.name ? 'default' : 'outline'}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {plan.price === 0 ? 'Current Plan' : 'Upgrade'}
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Payment Method
        </h2>
        <div className="flex items-center p-4 border rounded-lg">
          <CreditCard className="w-8 h-8 text-gray-400 mr-4" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              •••• •••• •••• 4242
            </p>
            <p className="text-sm text-gray-500">Expires 12/25</p>
          </div>
        </div>
      </div>
    </div>
  );
}
