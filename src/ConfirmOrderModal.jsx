import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
const ConfirmOrderModal = ({
  isOrderCompleted,
  data,
  counts,
  totalCount,
  startNewOrder,
}) => {
  return (
    <div
      className={`${
        isOrderCompleted
          ? "absolute inset-0 bg-red-50/90 flex items-center justify-center"
          : "hidden"
      }`}
    >
      <div
        className={`flex flex-col gap-4 rounded-xl p-4 py-6 bg-white w-[550px] justify-center mx-auto my-auto `}
      >
        <IoCheckmarkCircleOutline className="size-12 text-green-600" />
        <h2 className="text-4xl font-bold">Order Confirmed</h2>
        <p className="text-zinc-500">We hope you enjoyed your food!</p>
        <div className="bg-red-50 px-4 py-6 rounded-lg flex flex-col gap-4">
          {data
            .filter((item) => counts[item.id] > 0)
            .map((item) => {
              const count = counts[item.id] || 0;

              return (
                <div
                  className="flex justify-between items-center border-b border-gray-300 pb-4"
                  key={item.id}
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image.desktop}
                      alt=""
                      className="size-16 rounded-lg"
                    />
                    <div className="flex flex-col justify-between">
                      <p>{item.name}</p>
                      <div className="flex gap-3">
                        <p className="text-red-400">{count}x</p>
                        <p className="text-zinc-500">@{item.price}</p>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold">${item.price * count}</p>
                </div>
              );
            })}
          <div className="flex justify-between items-center">
            <p className="text-zinc-500">Order Total</p>
            {totalCount && (
              <p className="text-2xl font-bold">
                ${" "}
                {data
                  .reduce((total, item) => {
                    return total + (counts[item.id] || 0) * item.price;
                  }, 0)
                  .toFixed(2)}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => startNewOrder()}
          className="bg-red-600 text-white py-3 rounded-3xl mt-3"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrderModal;
