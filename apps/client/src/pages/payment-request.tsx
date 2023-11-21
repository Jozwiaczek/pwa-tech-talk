import React, { forwardRef } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Button } from '@/client/components/Button';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { checkIsPaymentRequestSupported } from '@/client/utils/checkPwaFeatures';
import { toast } from 'react-toastify';

async function startPayment() {
  const checkoutDetails = {
    id: 'pwa-tech-talk-order',
    displayItems: [{ label: 'PWA Tech Talk', amount: { currency: 'EUR', value: '1' } }],
    total: { label: 'Total', amount: { currency: 'EUR', value: '1' } },
  };

  const paymentMethods = [
    {
      supportedMethods: 'https://google.com/pay',
      data: {
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
          // A merchant ID is available after approval by Google: https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist
          // merchantId: '12345678901234567890',
          merchantName: 'Jakub Jóźwiak',
        },
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              // Check with your payment gateway on the parameters to pass: https://developers.google.com/pay/api/web/reference/request-objects#gateway
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
      },
    },
    {
      supportedMethods: 'https://apple.com/apple-pay',
      data: {
        version: 3,
        merchantIdentifier: 'pwa-tech-talk.vercel.app',
        merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit'],
        supportedNetworks: ['amex', 'discover', 'masterCard', 'visa', 'maestro'],
        countryCode: 'US',
      },
    },
  ];

  const paymentRequest = new PaymentRequest(paymentMethods, checkoutDetails);
  const response = await paymentRequest.show();
  await response.complete('success');
  toast.success('Payment completed');
}

export function PaymentRequestPage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const isPaymentRequestSupported = checkIsPaymentRequestSupported();

  if (!isPaymentRequestSupported) {
    return (
      <SlideContainer ref={ref}>
        <h1 className="text-4xl font-bold">Payment Request API</h1>
        <p className="text-xl">Payment Request API is not supported in your browser.</p>
      </SlideContainer>
    );
  }

  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Payment Request API</h1>
      <p className="max-w-2xl">
        With the Payment Request API, your PWA can simplify the checkout process by providing a
        standardized way for users to make payments with their saved payment methods, reducing
        friction and enhancing user experience.
      </p>
      <Button
        onPress={startPayment}
        size="lg"
        color="primary"
        endContent={<CreditCardIcon className="size-5" />}
      >
        Test checkout
      </Button>
    </SlideContainer>
  );
}

export default forwardRef(PaymentRequestPage);
