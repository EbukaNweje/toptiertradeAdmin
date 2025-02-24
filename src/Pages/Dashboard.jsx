import {ImUsers} from "react-icons/im";
import {IoReceiptOutline} from "react-icons/io5";
import {GoGraph} from "react-icons/go";
import {MdOutlineAccessTime} from "react-icons/md";
import {FaArrowRight} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {SimpleBarChart}   from './SimpleBarChart'
import { SimpleLineChart } from "./SimpleLineChart";

const Dashboard = () => {
    const loadAdminData = () => {
        const adminData = localStorage?.getItem("adminData");
        return adminData ? JSON?.parse(adminData) : {};
    };

    const nav = useNavigate();

    console.log(loadAdminData());

  

    const userData = localStorage?.getItem("allUserData")
        ? JSON.parse(localStorage?.getItem("allUserData"))
        : [];
    console.log(userData);

    return (
        <>
            <div className="w-full h-max px-6 py-10 flex flex-col gap-7 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
                <div className="w-full h-20 flex justify-between phone:flex-col phone:h-[11rem] ">
                    <div className="w-[73%] h-full flex flex-col justify-between py-1 phone:w-full">
                        <h1 className="text-[27.6px] text-[rgb(87,89,98)] font-semibold">
                            Welcome back, Admin Test!
                        </h1>
                        <p className="text-[rgb(87,89,98)]">
                            Yesterday I was clever, so I wanted to change the
                            world. Today I am wise, so I am changing myself.
                        </p>
                    </div>
                    <div className="w-[25%] h-full flex flex-wrap items-center gap-3 phone:w-full">
                        <button className="py-2 rounded px-4 bg-[#31ce36] text-white text-sm">
                            Deposits
                        </button>
                        <button className="py-2 rounded px-4 bg-[#f25961] text-white text-sm">
                            Withdrawals
                        </button>
                        <NavLink to={"/admin/dashboard/manageusers"}>
                            <button className="py-2 rounded px-4 bg-[#6861ce] text-white text-sm">
                                Users
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className="w-full h-max flex gap-8 flex-col justify-between phone:gap-4">
                    <div className="w-full h-[6rem] phone:h-max flex justify-between phone:flex-col phone:gap-4">
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#0e4152]">
                                <ImUsers className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Total Users
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    {userData?.data?.length}
                                </span>
                            </div>
                        </div>
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#48abf7]">
                                <IoReceiptOutline className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Active Subscribers
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    0
                                </span>
                            </div>
                        </div>
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#6861ce]">
                                <GoGraph className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Total Withdrawals
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    $0.00
                                </span>
                            </div>
                        </div>
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#6861ce]">
                                <MdOutlineAccessTime className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Total Deposits
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    $0.00
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[6rem] phone:h-max flex justify-between phone:flex-col phone:gap-4">
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#f25961]">
                                <ImUsers className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Blocked Users
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    0
                                </span>
                            </div>
                        </div>
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#ffad46]">
                                <IoReceiptOutline className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Active Users
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    {userData?.data?.length}
                                </span>
                            </div>
                        </div>
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#f25961]">
                                <GoGraph className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Pending Withdrawals
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    0
                                </span>
                            </div>
                        </div>
                        <div className="w-[23%] phone:w-full h-full rounded bg-white shadow-md flex gap-3 items-center p-5">
                            <div className="w-16 h-16 rounded flex items-center justify-center bg-[#0e4152]">
                                <MdOutlineAccessTime className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-[14px] text-[rgb(141,148,152)]">
                                    Pending Deposits
                                </p>
                                <span className="text-xl text-[rgb(87,89,98)]">
                                    0
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-max flex gap-8 phone:flex-col">
                    <div className="w-[70%] phone:w-full h-[60vh] bg-white shadow-md p-5">
                        <div className="w-full h-[15%] border-b border-b-gray-200 flex justify-between">
                            <p className="text-xl text-[rgb(87,89,98)]">
                                User Statistics
                            </p>
                            <p>2023</p>
                        </div>
                        <div className="w-full h-[85%]  bg-sky-100 flex items-center justify-center">
                            <SimpleLineChart />
                        </div>
                    </div>
                    <div className="w-[30%] phone:w-full h-max bg-white p-8">
                        <div className="w-full h-10 text-xl">
                            <p>Latest Users</p>
                        </div>
                        <div className="w-full h-max max-h-[45vh] overflow-y-auto flex flex-col gap-3">
                            {userData?.data?.map((item, index) => (
                                <div
                                    className="w-full h-14 rounded shadow flex justify-between p-4 cursor-pointer hover:underline"
                                    key={index}
                                    onClick={() => {
                                        nav(
                                            `/admin/dashboard/user-details/${item?._id}`
                                        );
                                    }}
                                >
                                    <div className="flex flex-col justify-center ">
                                        <p className="text-sm text-[rgb(14,65,82)] font-bold">
                                            {item?.fullName}
                                        </p>
                                        <p className="text-xs">{item?.email}</p>
                                    </div>
                                    <div className=" flex items-center">
                                        <FaArrowRight />
                                    </div>
                                </div>
                            ))}
                            {/* <div className="w-full h-14 rounded shadow flex justify-between p-4 cursor-pointer">
                                <div className="flex flex-col justify-center ">
                                    <p className="text-sm text-[rgb(14,65,82)] font-bold">
                                        Jairo Arcila
                                    </p>
                                    <p className="text-xs">
                                        jairoarcila09@gmail.com
                                    </p>
                                </div>
                                <div className=" flex items-center">
                                    <FaArrowRight />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="w-full h-max p-5 bg-white">
                    <div className="w-full h-10 ">
                        <p className=" text-xl">Transactions</p>
                    </div>
                    <div className="w-full h-[50vh] bg-sky-100 flex items-center justify-center ">
                        <SimpleBarChart />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
