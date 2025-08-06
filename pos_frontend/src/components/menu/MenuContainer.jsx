import React, { useState } from 'react';
import { menus } from '../../constants/menu';
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

const MenuContainer = () => {
    const [selectedMenu, setSelectedMenu] = useState(menus[0]);
    const [sizeSelections, setSizeSelections] = useState({});
    const [itemCounts, setItemCounts] = useState({});
    const dispatch = useDispatch();

    // ✅ Chọn size cho sản phẩm
    const handleSizeChange = (id, size) => {
        setSizeSelections((prev) => ({
            ...prev,
            [id]: prev[id] === size ? null : size,
        }));
    };

    // ✅ Tăng số lượng
    const increment = (id) => {
        setItemCounts((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    // ✅ Giảm số lượng
    const decrement = (id) => {
        setItemCounts((prev) => {
            const newCount = (prev[id] || 0) - 1;
            return {
                ...prev,
                [id]: newCount > 0 ? newCount : 0,
            };
        });
    };

    // ✅ Thêm vào giỏ
    const handleAddToCart = (item) => {
        const size = sizeSelections[item.id];
        const quantity = itemCounts[item.id] || 0;

        if (!size) {
            alert("Vui lòng chọn size trước khi thêm vào giỏ!");
            return;
        }

        if (quantity === 0) {
            alert("Vui lòng chọn số lượng!");
            return;
        }

        const pricePerQuantity = item.price[size];
        const newObj = {
            id: `${item.id}-${size}-${Date.now()}`,
            name: `${item.name} (${size})`,
            pricePerQuantity,
            quantity,
            price: pricePerQuantity * quantity,
        };

        dispatch(addItems(newObj));

        // Reset số lượng sau khi thêm
        setItemCounts((prev) => ({ ...prev, [item.id]: 0 }));
        setSizeSelections((prev) => ({ ...prev, [item.id]: null }));
    };

    return (
        <>
            {/* Danh sách Menu */}
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
                {menus.map((menu) => (
                    <div
                        key={menu.id}
                        className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
                        style={{ backgroundColor: menu.bgColor }}
                        onClick={() => {
                            setSelectedMenu(menu);
                            setItemCounts({});
                            setSizeSelections({});
                        }}
                    >
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-white text-lg font-semibold">
                                {menu.icon} {menu.name}
                            </h1>
                            {selectedMenu.id === menu.id && (
                                <GrRadialSelected className="text-white" size={20} />
                            )}
                        </div>
                        <p className="text-white opacity-70 text-sm font-semibold">
                            {menu.items.length} Món
                        </p>
                    </div>
                ))}
            </div>

            <hr className="border-gray-400 opacity-50 border-t-2 mt-4" />

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full overflow-y-scroll scrollbar-hide h-[calc(100vh-35rem)]">
                {selectedMenu?.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-start justify-between p-4 rounded-lg h-[180px]
                        hover:bg-passio backdrop-blur-sm border border-white border-opacity-30
                        shadow-xl hover:shadow-2xl transition-all group "
                    >
                        {/* Tên sản phẩm */}
                        <h1 className="text-gray-900 text-lg font-semibold group-hover:text-white transition-colors">
                            {item.name}
                        </h1>

                        {/* Giá theo size */}
                        <p className="text-gray-900 text-lg font-bold group-hover:text-white transition-colors">
                            S: {item.price.S} | M: {item.price.M} | L: {item.price.L}
                        </p>

                        {/* Chọn size */}
                        <div className="flex gap-2 my-1">
                            {["S", "M", "L"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeChange(item.id, size)}
                                    className={`px-2 py-1 rounded group-hover:text-white text-sm transition-colors ${
                                        sizeSelections[item.id] === size
                                            ? "bg-passio text-white border border-white"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        {/* Chọn số lượng + Thêm vào giỏ */}
                        <div className="flex items-center justify-between w-full mt-2">
                            <div className="flex items-center gap-4 border bg-gray-400 bg-opacity-10 px-2 py-1 rounded-lg">
                                <button
                                    onClick={() => decrement(item.id)}
                                    className="text-passio text-2xl group-hover:text-lime-200 transition-colors"
                                >
                                    &minus;
                                </button>
                                <span className="text-gray-900 group-hover:text-white transition-colors">
                                    {itemCounts[item.id] || 0}
                                </span>
                                <button
                                    onClick={() => increment(item.id)}
                                    className="text-passio text-2xl group-hover:text-lime-200 transition-colors"
                                >
                                    &#43;
                                </button>
                            </div>

                            <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-passio text-white p-2 rounded hover:bg-lime-400 transition group-hover:bg-white group-hover:text-passio"
                            >
                                <FaShoppingCart size={25}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MenuContainer;
