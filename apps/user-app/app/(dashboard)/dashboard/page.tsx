export default function () {
  return (
    <div className="">
      <div className=" grid grid-cols-1 md:grid-cols-2 ">
        <div className="  p-6  text-wrap flex flex-col gap-3 m-auto">
          <div className="font-bold text-[#6a51a6] text-5xl ">PayKaro – </div>

          <div className=" font-semibold text-3xl">
            {" "}
            Your Trusted Digital Wallet for Everyday Transactions.
          </div>
        </div>
        <div className=" m-4 h-72 items-center flex">
          <img
            className=" mix-blend-multiply  object-contain"
            src="/assets/paykaro.png"
            alt=" images"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
          <img
            src="/assets/addmoney.png"
            alt="Add Money"
            className="h-24 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
            Add Money Easily
          </h3>
          <p className="text-gray-600 text-center">
            Top up your wallet instantly with multiple payment options. Fast,
            secure, and seamless.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
          <img
            src="/assets/sendmoney.png"
            alt="Send Money"
            className="h-24 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
            Send Money Instantly
          </h3>
          <p className="text-gray-600 text-center">
            Transfer money to your friends and family in seconds using just
            their phone numbers.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
          <img
            src="/assets/lock.png"
            alt="Secure"
            className="h-24 mx-auto mb-4 bg-blend-multiply"
          />
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
            Secure Transactions
          </h3>
          <p className="text-gray-600 text-center">
            Experience top-notch security for every transaction with end-to-end
            encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
