import { OrderForm } from "@/components/OrderForm";
// blobs
import Blob1 from "../assets/svg/blob1.svg";
import Blob2 from "../assets/svg/blob2.svg";

export default function CreateOrder() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div>
        <img src={Blob1} className="absolute left-32 top-32" alt="blob" />
        <img src={Blob2} className="absolute right-0 top-32" alt="blob" />
      </div>
      <div className="w-full max-w-sm">
        <OrderForm />
      </div>
    </div>
  );
}
