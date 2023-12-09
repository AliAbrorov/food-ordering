import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import Down from "../icons/Down";
import { useState } from "react";
import Up from "../icons/Up";

function MenuItemPriceProps({ props, setProps, name, addLabel }) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
    // setIsOpen(true);
  }

  function editProp(e, index, prop) {
    const newValue = e.target.value;
    setProps((prevProps) => {
      const newProps = [...prevProps];
      newProps[index][prop] = newValue;
      return newProps;
    });
  }

  function removeProp(index) {
    setProps((prev) => prev.filter((v, i) => i !== index));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        className="inline-flex p-1 border-0 justify-start"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen && <Up />}
        {!isOpen && <Down />}
        <span>
          {name}({props?.length})
        </span>
      </button>

      <div className={isOpen ? "" : "hidden"}>
        {props.map((size, index) => (
          <div key={size.index} className="flex gap-2 items-center">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(e) => editProp(e, index, "name")}
              />
            </div>

            <div>
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(e) => editProp(e, index, "price")}
              />
            </div>
            <div>
              <button
                className="bg-white mt-1 px-2"
                type="button"
                onClick={() => removeProp(index)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={addProp} className="bg-white items-center">
        <Plus classname="w-4 h-4" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}

export default MenuItemPriceProps;
