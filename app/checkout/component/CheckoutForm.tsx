import { formatPrice } from "@/Utils/formatPrice";
import Button from "@/app/component/Button";
import Heading from "@/app/component/products/Heading";
import { useCart } from "@/hooks/useCart";
import { useStripe, useElements, PaymentElement, AddressElement} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSucess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSucess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSucess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("CheckOut Success");

          handleClearCart();
          handleSetPaymentSucess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };

  return <form onSubmit={handleSubmit} id="payment-form">

        <div className="mb-6 ">
        <Heading title="Enter your Details to procced with payment"/>
        </div>
        <h2 className="font-semibold  mb-2 ">
            Adress Information
        </h2>

        <AddressElement options={{
            mode: 'shipping',
            allowedCountries: ["US", "KE" ]
        }}/>

        <h2 className="font-semibold mt-4 mb-2 ">Payment Information</h2>

        <PaymentElement id="payment-element" options={{layout: "tabs"}}  />

        <div className="py-4 text-center  text-teal-500 text-xl font-bold ">
            Total: {formattedPrice}
        </div>

        <Button 
        label={isLoading ? 'Processing' : 'Pay Now'  }
          disabled={isLoading || !stripe || !elements } 
          onClick={() => {}} />
  </form>;
};

export default CheckoutForm;
