import React, { useState } from 'react'
import { MdCategory, MdTableBar } from 'react-icons/md';
import { BiSolidDish } from 'react-icons/bi';
import Metrics from '../components/dashboard/Metrics';
import RecentOrders from '../components/dashboard/RecentOrders';
import Modal from '../components/dashboard/Modal';


const buttons = [
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
    { label: "Add Category", icon: <MdCategory />, action: "category" },
    { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payment"];

const Dashboard = () => {

    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Metrics");

    const handleOpenModal = (action) => {
        if (action === "table") setIsTableModalOpen(true)
    }

    return (
        <div className='h-[calc(100vh-12rem)]'>
            <div className='container mx-auto flex items-center justify-between py-14 px-6 md:px-4'>
                <div className='flex items-center gap-3'>
                    {
                        buttons.map(({ label, icon, action }) => {
                            return (
                                <button onClick={() => handleOpenModal(action)} className='bg-passio hover:bg-lime-500 px-8 py-3 gap-2 rounded-lg text-[#f5f5f5] font-semibold text-sm flex items-center'>
                                    {label} {icon}
                                </button>
                            )
                        })
                    }
                </div>

                <div className='flex items-center gap-3'>
                    {
                        tabs.map((tab) => {
                            return (
                                <button
                                    onClick={() => setActiveTab(tab)}
                                    className={` px-8 py-3 gap-2 rounded-lg text-[#f5f5f5] font-semibold text-sm flex items-center ${activeTab === tab ? "bg-lime-500 " : "bg-passio hover:bg-lime-500"}`}>
                                    {tab}
                                </button>
                            )
                        })
                    }
                </div>
            </div>

            {activeTab === "Metrics" && <Metrics />}
            {activeTab === "Orders" && <RecentOrders />}

            {isTableModalOpen && (
                <Modal setIsTableModalOpen={setIsTableModalOpen} />
            )}
        </div>
    )
}

export default Dashboard
