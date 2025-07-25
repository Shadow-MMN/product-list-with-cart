import { useState } from "react";
import "./App.css";
import { MdAddShoppingCart } from "react-icons/md";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { TbCloudComputing } from "react-icons/tb";
import ConfirmOrderModal from "./ConfirmOrderModal";
import data from "./data.json";
function App() {
  const [counts, setCounts] = useState({});
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const increment = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };
  const decrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };
  const removeFromCart = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };
  const totalCount = Object.values(counts).reduce((sum, val) => sum + val, 0);
  const startNewOrder = () => {
    setIsOrderCompleted(false);
    setCounts({});
  };
  return (
    <main className=" p-4 md:p-16 bg-red-50 relative">
      <div className="flex flex-none flex-col gap-4">
        <h1 className="font-bold text-4xl ">Desserts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((item) => {
            const count = counts[item.id] || 0;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 items-center relative"
              >
                <img
                  src={item.image.desktop}
                  alt={item.name}
                  className="size-full sm:size-full md:size-80 rounded-lg"
                />
                {count < 1 ? (
                  <button
                    onClick={() => increment(item.id)}
                    className="absolute border border-gray-600 bottom-16 w-40 md:bottom-24 rounded-3xl flex items-center justify-center gap-1 bg-white px-6 py-2"
                  >
                    <MdAddShoppingCart className="text-red-700" />
                    <p>Add to Cart</p>
                  </button>
                ) : (
                  <div className="absolute border border-red-600 w-40 text-white bottom-16 md:bottom-24  rounded-3xl flex items-center justify-between bg-red-500 px-6 py-2">
                    <button onClick={() => decrement(item.id)}>
                      <CiCircleMinus className="size-6" />
                    </button>
                    <p>{count}</p>
                    <button onClick={() => increment(item.id)}>
                      <CiCirclePlus className="size-6" />
                    </button>
                  </div>
                )}
                <ul className="self-start">
                  <li className="text-gray-400">{item.category}</li>
                  <li className="font-semibold">{item.name}</li>
                  <li className="text-red-800 font-medium">${item.price}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8 bg-white min-h-80 p-6 self-start w-full rounded-xl">
        <h2 className="font-bold text-red-500">Your Cart ({totalCount})</h2>
        {totalCount === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <img src="/illustration-empty-cart.svg" alt="" />
            <p className="text-zinc-500">Your added items will appear here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data
              .filter((item) => counts[item.id] > 0)
              .map((item) => {
                const count = counts[item.id];
                return (
                  <div
                    key={item.id}
                    className="flex w-full justify-between items-center border-b border-b-gray-300 pb-3"
                  >
                    <div className="flex flex-col gap-2">
                      <h3>{item.name}</h3>
                      <div className="flex gap-2">
                        <p className="text-red-500">{count}x</p>
                        <p className="text-zinc-500">@$ {item.price}</p>
                        <p className="text-stone-600">
                          ${(item.price * count).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      <MdOutlineCancel className="size-6" />
                    </button>
                  </div>
                );
              })}
            <div className="flex justify-between items-center">
              <p className="text-zinc-500">Order Total</p>
              <p className="font-bold text-2xl">
                $
                {data
                  .reduce((total, item) => {
                    return total + (counts[item.id] || 0) * item.price;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 bg-red-50 rounded-lg py-4">
              <TbCloudComputing className="text-green-600 size-6" />
              <p>
                This is a <span className="font-extrabold">carbon neutral</span>{" "}
                delivary
              </p>
            </div>
            <button
              onClick={() => setIsOrderCompleted(true)}
              className="bg-red-500 py-3 text-white rounded-3xl"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
      <ConfirmOrderModal
        data={data}
        isOrderCompleted={isOrderCompleted}
        counts={counts}
        totalCount={totalCount}
        startNewOrder={startNewOrder}
      />
    </main>
  );
}

export default App;
