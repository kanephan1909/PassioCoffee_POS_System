import React from 'react'

const Modal = ({ title, onClose, isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-[#f7fdf3] w-full max-w-lg rounded-2xl shadow-2xl border border-[#d4e9be] overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 bg-[#A6CE39]">
                    <h2 className="text-white text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-white text-2xl hover:text-gray-200 transition"
                    >
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 text-gray-800 text-sm bg-white">{children}</div>

                {/* Footer (optional) */}
                {/* <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-right">
                    <button onClick={onClose} className="text-sm px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800">Đóng</button>
                </div> */}
            </div>
        </div>
    );
};

export default Modal;
