import {FaEye} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


const ManageWithdrawal = () => {
  const [userData, setUserData] = useState([]);

  const sendSignUpEmail = async (id) => {
    const urlemail = `https://toptiertrade-back-end-new.vercel.app/api/confirmwithdrawalemailsend/${id}`
    axios.post(urlemail)
       .then(response => {
         console.log(response);
         window.location.reload();
       })
       .catch((error) => {
         console.log(error);
       });
   };

    const acceptDeposit = (withdrawId) => {
        const url = `https://toptiertrade-back-end-new.vercel.app/api/confirm-withdrawal/${withdrawId}`;
        axios.post(url)
            .then((response) => {
                console.log(response.data.user._id)
                sendSignUpEmail(response.data.user._id)
                console.log(response.data.message);
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getallDeposit = () => {
        const url = "https://toptiertrade-back-end-new.vercel.app/api/allwithdrawal";
        axios.get(url)
            .then((response) => {
                console.log(response.data);
                setUserData(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getallDeposit();
    }, []);

    return (
        <>
            <div className="w-full h-max px-6 py-10 flex flex-col gap-2 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
                <p className="text-[27px] font-semibold text-[rgb(87,89,98)]">
                    Manage clients Withdrawal
                </p>
                <div className="w-full h-max bg-white shadow p-5">
                    <div className="w-full h-max flex phone:flex-col gap-2 border-b border-b-gray-200 pb-3">
                        <div>
                            <p className="text-sm text-[rgb(73,80,87)]">
                                search
                            </p>
                            <input
                                type="text"
                                placeholder="Search by user name"
                                className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                            />
                        </div>
                        <div>
                            <p className="text-sm  text-[rgb(73,80,87)]">
                                status
                            </p>
                            <select
                                name=""
                                id=""
                                className="w-max phone:w-full h-10 rounded pl-2 text-sm border outline-sky-100"
                            >
                                <option value="all">All</option>
                                <option value="all">Processed</option>
                                <option value="all">Pending</option>
                            </select>
                        </div>
                        <div className="phone:w-full phone:flex flex gap-2">
                            <div>
                                <p className="text-sm text-[rgb(73,80,87)]">
                                    page
                                </p>
                                <select
                                    name=""
                                    id=""
                                    className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-sm text-[rgb(73,80,87)]">
                                    order
                                </p>
                                <select
                                    name=""
                                    id=""
                                    className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                                >
                                    <option value="descending">
                                        Descending
                                    </option>
                                    <option value="ascending">Ascending</option>
                                </select>
                            </div>
                        </div>

                        <div className="phone:w-full phone:flex flex gap-2">
                            <div>
                                <p className="text-sm text-[rgb(73,80,87)]">
                                    from
                                </p>
                                <input
                                    type="date"
                                    className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-[rgb(73,80,87)]">
                                    to
                                </p>
                                <input
                                    type="date"
                                    className="w-max h-10 rounded pl-2 text-sm border outline-sky-100"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-y-auto">
                        <div className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]">
                            <div className="w-24 phone:w-36 h-max">Client</div>
                            <div className="w-36 phone:w-48 h-max">
                                Amount
                            </div>
                            <div className="w-36 h-max">Withdraw Method</div>
                            <div className="w-36 h-max">Status</div>
                            <div className="w-36 h-max">Date</div>
                            <div className="w-36 h-max opacity-0">Date</div>
                        </div>

                            {
                                userData.map((props)=> (
                                    <div className="w-full phone:w-max h-16 items-center justify-between flex border-b border-b-gray-200 font-semibold text-[rgb(33,37,41)]" key={props._id}>
                                    <div className="w-24 phone:w-36 h-max" style={{color: props?.user === null ? "red": "black"}}>
                                        { props?.user === null ? "Deleted User" : props?.user.userName} 
                                    </div>
                                    <div className="w-36 phone:w-48 h-max">{props.amount}</div>
                                    <div className="w-36 h-max">{props.coin}</div>
                                    <div className="w-36 h-max">
                                        <p className={`py-1 px-2 text-white w-max  rounded-full text-xs 
                                            ${
                                                props?.status === "pending"
                                                    ? `bg-[red]`
                                                    : `bg-[#31ce36]`
                                            }
                                        `}>
                                            {props.status}
                                        </p>
                                    </div>
                                    <div className="w-36 h-max">{props.withdrawDate}</div>
                                    <div className="w-36 h-max flex items-center gap-2">
                                        <button className="py-2 px-3 bg-[#48abf7] rounded text-white" onClick={()=>acceptDeposit(props._id)}>
                                            Accept
                                        </button>
                                        <button className="p-2 bg-[#f25961] rounded text-xs text-white">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                ))
                            }

                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageWithdrawal