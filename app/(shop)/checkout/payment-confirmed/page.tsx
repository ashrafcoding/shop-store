import Link from "next/link";
import Image from "next/image";

export default function PaymentConfirmed() {
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-4">
      <Image src="/verified.gif" alt="check" width={130} height={130} />
      <h2 className="text-[24px]">Payment Successful !</h2>
      <h3 >Thank You For Your Order</h3>
      <h2 className="text-[17px] text-center mt-6 text-gray-500">
        We sent an email with your order confirmation along with Reciept.
      </h2>
      <Link href="/" className="p-2 mt-6 text-white rounded-md bg-primary">
        Go to Home
      </Link>
    </div>
  );
}
