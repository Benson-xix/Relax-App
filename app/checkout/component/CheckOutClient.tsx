"use client"


import { useCart } from "@/hooks/useCart"
import { Elements } from "@stripe/react-stripe-js"
import {StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import {useState, useEffect, useCallback} from "react"
import toast from "react-hot-toast"
import CheckoutForm from "./CheckoutForm"
import Button from "@/app/component/Button"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

// const stripePromise = loadStripe("pk_test_51OCRmJDyXK18cOoViMAsOZHpi4k7APJacdz6GwIqqYfJIwoRxXOQAoE4nCUs1kZBDBMWIkTwDQay8fTmnm2r1QJh00wILFrKsl");


const CheckOutClient = () => {


 
  const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSucess, setPaymentSucess] = useState(false);


  const router = useRouter();

  console.log("paymenIntent", paymentIntent);
  console.log("clientSecret", clientSecret)

  useEffect(() => {
    if(cartProducts) {
      setLoading(true);
      setError(false);

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent
        }),
      }).then((res) => {
        setLoading(false)
        if(res.status ===  401){
          return router.push('/login');
        }

        return res.json()
      }).then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
      })
      .catch((error) => {
        setError(true);
        console.log("Error", error);
        toast.error('something is not right');
      })
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating"
    }
  }

  const handleSetPaymentSucess = useCallback(
    (value:boolean) => {
      setPaymentSucess(value);
    },
    [],
  )
  

  return (
    <div className="w-full">
       {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret}  handleSetPaymentSucess={handleSetPaymentSucess}/>
        </Elements>
      )}
      {loading && <div className="text-center">
        Checkout is Loading be Patient
        </div>}

        {error && <div className="text-center text-rose-500">
            Something is wrong......
          </div>}

          {paymentSucess && <div className="flex flex-col items-center gap-4 ">
              <div className="text-teal-500 text-center">Payment was Sucessful</div>
              <div className="max-w-[220px] w-full">
                <Button label="View your Purchase" onClick={() => router.push("/orders")} />
              </div>
            </div>}
    </div>

  )
}

export default CheckOutClient