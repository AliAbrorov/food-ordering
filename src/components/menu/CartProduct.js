import React from "react";
import Trash from "../icons/Trash";
import Image from "next/image";
import { cartProductPrice } from "../AppContext";

export default function CartProduct({ cartProduct, onRemove, index }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="w-24">
        <Image src={"/pizza.jpg"} alt="pizza image" width={240} height={240} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{cartProduct.name}</h3>
        {cartProduct.size && (
          <div className="text-sm ">
            Size: <span>{cartProduct.size.name}</span>
          </div>
        )}
        {cartProduct.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {cartProduct.extras.map((extra) => (
              <div key={extra._id}>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg semibold">${cartProductPrice(cartProduct)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button className="p-2" type="button" onClick={() => onRemove(index)}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
