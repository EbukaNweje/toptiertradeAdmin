import {useEffect, useState} from "react";
import {FaArrowLeft, FaCaretDown} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {Modal} from "antd";
import {toast} from "react-hot-toast";
import axios from "axios";
import {useParams} from "react-router-dom";

const UserDetails = () => {

    const [oneUserData, setOneUserData] = useState({});
    const {id} = useParams();

    const Nav = useNavigate()

    const handleGetOneUserData = () => {
        const url = `https://toptiertrade-back-end-new.vercel.app/api/userdata/${id}`;
        axios
            .get(url)
            .then((res) => {
                console.log(res?.data);
                setOneUserData(res?.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // const handlDeleteOneUserData = () => {
       
    // };

    useEffect(() => {
        if (id) {
            handleGetOneUserData();
        }
    }, [id]);

    console.log(oneUserData);

    const [showActions, setShowActions] = useState(false);
    const [blockUser, setBlockUser] = useState(false);
    const handleBlockUser = () => {
        setBlockUser(false);
        console.log("Blocking user");
        setShowActions(false);
    };

    const handleOnRoi = () => {
        setShowActions(false);
        const toastLoadingId = toast.loading("Please wait...");
        setTimeout(() => {
            toast.dismiss(toastLoadingId);
            toast.success("ROI turned of successfully");
        }, 3000);
    };

    const [creditDebit, setCreditDebit] = useState(false);
    const [creditOrDebit, setCreditOrDebit] = useState("Credit");

    const [creditDebitValue, setCreditDebitValue] = useState("");
    const [creditDebitItem, setCreditDebitItem] = useState("");
    let reqData;
    console.log(creditDebitItem);

    // if (creditDebitItem === "bonus") {
    //     reqData = {bonus: `${Number(creditDebitValue) + Number(oneUserData.bonus)}`};
    // } else if (creditDebitItem === "profit") {
    //     reqData = {totalProfit:`${Number(creditDebitValue) + Number(oneUserData.totalProfit)}`};
    // } else if (creditDebitItem === "refBonus") {
    //     reqData = {ref: `${Number(creditDebitValue) + Number(oneUserData.ref)}`};
    // } else if (creditDebitItem === "accountBalance") {
    //     reqData = {accountBalance: `${Number(creditDebitValue) + Number(oneUserData.accountBalance)}`};
    // } else if (creditDebitItem === "deposit") {
    //     reqData = {totalDeposit: `${Number(creditDebitValue) + Number(oneUserData.totalDeposit)}`};
    // } else if (creditDebitItem === "totalInv") {
    //     reqData = {totalInvestment: `${Number(creditDebitValue) + Number(oneUserData.totalInvestment)}`};
    // } 

    // const handleCreditDebit = () => {
    //     if (!creditDebitValue) {
    //         alert("Please enter a value");
    //     } else if (!reqData) {
    //         alert("Please select a column");
    //     } else {
    //         const toastLoadingId = toast.loading("Please wait...");
    //         const data = reqData;
    //         console.log(data);
    //         const url = `https://boss2-k-back-end.vercel.app/api/userdata/${id}`;
    //         console.log(url);
    //         axios
    //             .patch(url, data)
    //             .then((response) => {
    //                 toast.dismiss(toastLoadingId);
    //                 console.log(response);
    //                 setCreditDebit(false);
    //                 toast.success("Account updated successfully");
    //                 setTimeout(() => {
    //                     handleGetOneUserData();
    //                 }, 1000);
    //                 setShowActions(false);
    //                 reqData = {};
    //                 setCreditDebitValue("");
    //                 setCreditDebitItem("");
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // };

    const handleCreditDebit = () => {
        if (!creditDebitValue) {
            alert("Please enter a value");
        } else if (!creditDebitItem) {
            alert("Please select a column");
        } else {
            const toastLoadingId = toast.loading("Please wait...");
    
            // Determine whether to add (credit) or subtract (debit)
            const value = Number(creditDebitValue); // Input value
            const isCredit = creditOrDebit === "Credit"; // Check if credit or debit
    
            if (creditDebitItem === "bonus") {
                reqData = { bonus: isCredit 
                    ? `${Number(oneUserData.bonus) + value}` 
                    : `${Number(oneUserData.bonus) - value}` };
            } else if (creditDebitItem === "profit") {
                reqData = { totalProfit: isCredit 
                    ? `${Number(oneUserData.totalProfit) + value}` 
                    : `${Number(oneUserData.totalProfit) - value}` };
            } else if (creditDebitItem === "refBonus") {
                reqData = { ref: isCredit 
                    ? `${Number(oneUserData.ref) + value}` 
                    : `${Number(oneUserData.ref) - value}` };
            } else if (creditDebitItem === "accountBalance") {
                reqData = { accountBalance: isCredit 
                    ? `${Number(oneUserData.accountBalance) + value}` 
                    : `${Number(oneUserData.accountBalance) - value}` };
            } else if (creditDebitItem === "deposit") {
                reqData = { totalDeposit: isCredit 
                    ? `${Number(oneUserData.totalDeposit) + value}` 
                    : `${Number(oneUserData.totalDeposit) - value}` };
            } else if (creditDebitItem === "totalInv") {
                reqData = { totalInvestment: isCredit 
                    ? `${Number(oneUserData.totalInvestment) + value}` 
                    : `${Number(oneUserData.totalInvestment) - value}` };
            }
    
            console.log(reqData);
    
            // Proceed with the API call
            const url = `https://toptiertrade-back-end-new.vercel.app/api/userdata/${id}`;
            axios
                .patch(url, reqData)
                .then((response) => {
                    toast.dismiss(toastLoadingId);
                    console.log(response);
                    setCreditDebit(false);
                    toast.success("Account updated successfully");
                    setTimeout(() => {
                        handleGetOneUserData();
                    }, 1000);
                    setShowActions(false);
                    reqData = {};
                    setCreditDebitValue("");
                    setCreditDebitItem("");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const [resetPwd, setResetPwd] = useState(false);
    const handleResetPwd = () => {
        setResetPwd(false);
        const toastLoadingId = toast.loading("Please wait...");
        setTimeout(() => {
            toast.dismiss(toastLoadingId);
            toast.success("Password reset successfully");
        }, 3000);
        setShowActions(false);
    };

    const [clearAcc, setClearAcc] = useState(false);
    const handleClearAcc = () => {
        setClearAcc(false);
        const toastLoadingId = toast.loading("Please wait...");
        const Clr = {accountBalance: 0, bonus: 0, totalDeposit: 0, totalInvestment:0, totalProfit:0, totalWithdrawal: 0, tradingAccounts: 0}
        const url = `https://toptiertrade-back-end-new.vercel.app/api/userdata/${id}`;
            axios
                .patch(url, Clr)
                .then((response) => {
                    toast.dismiss(toastLoadingId);
                    console.log(response);
                    toast.success("Account Clear successfully");
                    setTimeout(() => {
                        handleGetOneUserData();
                    }, 1000);
                    setShowActions(false);
                })
                .catch((error) => {
                    console.log(error);
                });
    };

    const [addRoi, setAddRoi] = useState(false);
    const handleAddRoi = () => {
        setAddRoi(false);
        const toastLoadingId = toast.loading("Please wait...");
        setTimeout(() => {
            toast.dismiss(toastLoadingId);
            toast.success("ROI added successfully");
        }, 3000);
        setShowActions(false);
    };

    const AddProfit = () => {
        const url = `https://toptiertrade-back-end-new.vercel.app/api/add-profit/${id}`;
        const profitAmount = creditDebitValue
        console.log("This is it",profitAmount)
        const toastLoadingId = toast.loading("Please wait...");
        axios
            .post(url, {profitAmount})
            .then((response) => {
                toast.dismiss(toastLoadingId);
                console.log("Profile",response);
                toast.success("Profit Added successfully");
                setTimeout(() => {
                    handleGetOneUserData();
                }, 1000);
                setShowActions(false);
            })
            .catch((error) => {
                console.log("Profile",error);
            });

    }

    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(false);
        const toastLoadingId = toast.loading("Please wait...");
        setTimeout(() => {
            toast.dismiss(toastLoadingId);
            toast.success("Account updated successfully");
        }, 3000);
        setShowActions(false);
    };

    const [sendEmail, setSendEmail] = useState(false);
    const handleSendEmail = () => {
        setSendEmail(false);
        const toastLoadingId = toast.loading("Please wait...");
        setTimeout(() => {
            toast.dismiss(toastLoadingId);
            toast.success("Email sent successfully");
        }, 3000);
        setShowActions(false);
    };

    const [login, setLogin] = useState(false);
    const handleLogin = () => {
        setLogin(false);
        const toastLoadingId = toast.loading("Please wait...");
        setTimeout(() => {
            toast.dismiss(toastLoadingId);
            toast.success("Success");
            window.location.href = `https://myfininvestohub-dashboard.vercel.app/#/${id}`;
        }, 3000);
        setShowActions(false);

    };

    const [deleteUser, setDeleteUser] = useState(false);
    const handleDelete = () => {
        setDeleteUser(false);
        const toastLoadingId = toast.loading("Please wait...");
        setShowActions(false);
        const url = `https://toptiertrade-back-end-new.vercel.app/api/userdata/${id}`;
        axios
            .delete(url)
            .then((res) => {
                console.log(res?.data);
                setTimeout(() => {
                    toast.dismiss(toastLoadingId);
                    toast.success("Success");
                }, 3000);
                window.history.back()
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const goBack = () => {
        window.history.back()
      };

      const TextClick = () => {
        if(creditDebitItem === "profit"){
            AddProfit()
        }else{
            handleCreditDebit()
        }
      }
    

    return (
        <>
            <div className="w-full h-max px-6 py-10 flex flex-col gap-2 phone:gap-8 bg-[#f9fbfd] text-[rgb(87,89,98)]">
                <div className="w-full h-max bg-white shadow-md px-5 py-2 flex flex-col gap-5">
                    <div className="w-full h-20 px-5 phone:px-0 flex items-center justify-between ">
                        <p className="text-[27px] font-semibold text-[rgb(14,65,82)]">
                            {oneUserData.userName}
                        </p>
                        <div className="flex items-center gap-2">
                            <NavLink to={"/admin/dashboard/manageusers"}>
                                <button className="py-2 px-3 flex gap-1 items-center text-xs bg-[#0e4152] text-white rounded" onClick={goBack}>
                                    <FaArrowLeft /> Back
                                </button>
                            </NavLink>
                            <div className="w-max h-max relative">
                                <button
                                    className="py-2 px-3 flex gap-1 items-center text-xs bg-[#6861ce] text-white rounded"
                                    onClick={() => setShowActions(!showActions)}
                                >
                                    Actions <FaCaretDown />
                                </button>
                                {showActions && (
                                    <div className="w-44 h-max absolute top-10 right-0 border border-gray-200 rounded p-3 bg-white shadow">
                                        <NavLink
                                            to={`/admin/dashboard/login-activity/${2}`}
                                        >
                                            <div className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer">
                                                Login Activity
                                            </div>
                                        </NavLink>
                                        {/* <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={() =>
                                                setBlockUser(!blockUser)
                                            }
                                        >
                                            Block
                                        </div> */}
                                        {/* <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={handleOnRoi}
                                        >
                                            Turn off auto ROI
                                        </div> */}
                                        <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={() =>
                                                setCreditDebit(!creditDebit)
                                            }
                                        >
                                            Credit/Debit
                                        </div>
                                        {/* <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={() =>
                                                setResetPwd(!resetPwd)
                                            }
                                        >
                                            Reset Password
                                        </div> */}
                                        <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={() =>
                                                setClearAcc(!clearAcc)
                                            }
                                        >
                                            Clear Account
                                        </div>
                                        {/* <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={() => setAddRoi(!addRoi)}
                                        >
                                            Add ROI history
                                        </div> */}
                                        {/* <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={() => setEdit(!edit)}
                                        >
                                            Edit
                                        </div> */}
                                        {/* <div className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer">
                                            Add Referral
                                        </div> */}
                                        {/* <div
                                            className="w-full h-7 flex items-center pl-1 text-sm hover:bg-gray-300 cursor-pointer"
                                            onClick={() =>
                                                setSendEmail(!sendEmail)
                                            }
                                        >
                                            Send Email
                                        </div> */}
                                        {/* <div
                                            className="w-full h-max flex items-center pl-1 py-1 text-sm hover:bg-gray-300 cursor-pointer text-[#31ce36]"
                                            onClick={() => setLogin(!login)}
                                        >
                                            Login as {oneUserData.userName}
                                        </div> */}
                                        <div
                                            className="w-full h-max flex items-center pl-1 py-1 text-sm hover:bg-gray-300 cursor-pointer text-[#f25961]"
                                            onClick={() =>
                                                {setDeleteUser(!deleteUser);}
                                            }
                                        >
                                            Delete {oneUserData.userName}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-max flex phone:flex-col phone:gap-5 p-4 phone:p-2 phone:py-4 px-8 border border-gray-200 rounded">
                        <div className="w-1/4 phone:w-full h-28 phone:h-max flex flex-col phone:flex-row justify-between ">
                            <div className="w-full h-[45%] flex flex-col justify-between">
                                <h1 className=" text-[rgb(14,65,82)] font-bold">
                                    Account Balance
                                </h1>
                                <p className="text-sm">
                                    ${oneUserData?.accountBalance}.00
                                </p>
                            </div>
                            <div className="w-full h-[45%]">
                                <h1 className=" text-[rgb(14,65,82)] font-bold">
                                    User Account Status
                                </h1>
                                <p className="text-xs bg-[#31ce36] text-white w-max py-1 px-2 rounded-full">
                                    Active
                                </p>
                            </div>
                        </div>
                        <div className="w-1/4 phone:w-full h-28 phone:h-max flex flex-col phone:flex-row justify-between ">
                            <div className="w-full h-[45%] flex flex-col justify-between">
                                <h1 className=" text-[rgb(14,65,82)] font-bold">
                                    Profit
                                </h1>
                                <p className="text-sm">
                                    ${oneUserData?.totalProfit}.00
                                </p>
                            </div>
                            <div className="w-full h-[45%]">
                                <h1 className=" text-[rgb(14,65,82)] font-bold">
                                    Inv. Plans
                                </h1>
                                <button className="py-[0.40rem] px-3 flex gap-1 items-center text-xs bg-[#0e4152] text-white rounded">
                                    View Plans
                                </button>
                            </div>
                        </div>
                        <div className="w-1/4 phone:w-full h-28 phone:h-max flex flex-col phone:flex-row justify-between ">
                            <div className="w-full h-[45%] flex flex-col justify-between">
                                <h1 className=" text-[rgb(14,65,82)] font-bold">
                                    Referral Bonus
                                </h1>
                                <p className="text-sm">${oneUserData?.ref}.00</p>
                            </div>
                            <div className="w-full h-[45%]">
                                <h1 className=" text-[rgb(14,65,82)] font-bold">
                                   Total Investment
                                </h1>
                                <p className="text-sm ">
                                    ${oneUserData?.totalInvestment}.00
                                </p>
                            </div>
                        </div>
                        <div className="w-1/4 phone:w-full h-28 phone:h-max flex flex-col phone:flex-row justify-between ">
                            <div className="w-full h-[45%] flex flex-col justify-between">
                                <h1 className=" text-[rgb(14,65,82)] font-bold">
                                    Bonus
                                </h1>
                                <p className="text-sm">
                                    ${oneUserData?.bonus}.00
                                </p>
                            </div>
                            <div className="w-full h-[45%]">
                            <h1 className=" text-[rgb(14,65,82)] font-bold">
                                   Total Deposit
                                </h1>
                                <p className="text-sm ">
                                    ${oneUserData?.totalDeposit}.00
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-max mb-5">
                        <p className="px-4">USER INFORMATION</p>
                        <div className="w-full h-max border border-gray-200 rounded">
                            <div className="w-full h-14 border-b border-b-gray-200 flex items-center py-3">
                                <div className="w-[30%] h-full flex items-center px-4">
                                    FullName
                                </div>
                                <div className="w-[70%] h-full flex items-center px-4 border-l border-l-gray-200">
                                    {oneUserData.firstName} {oneUserData.lastName}
                                </div>
                            </div>
                            <div className="w-full h-14 border-b border-b-gray-200 flex items-center py-3">
                                <div className="w-[30%] h-full flex items-center px-4">
                                    UserName
                                </div>
                                <div className="w-[70%] h-full flex items-center px-4 border-l border-l-gray-200">
                                    {oneUserData.userName}
                                </div>
                            </div>
                            <div className="w-full h-14 border-b border-b-gray-200 flex items-center py-3">
                                <div className="w-[30%] h-full flex items-center px-4">
                                    Email                                
                                </div>
                                <div className="w-[70%] h-full flex items-center px-4 border-l border-l-gray-200">
                                    {oneUserData.email}
                                </div>
                            </div>
                            <div className="w-full h-14 flex border-b border-b-gray-200  items-center py-3">
                                <div className="w-[30%] h-full flex items-center px-4">
                                    Mobile Number
                                </div>
                                <div className="w-[70%] h-full flex items-center px-4 border-l border-l-gray-200">
                                    {oneUserData.phoneNumber}   
                                </div>
                            </div>
                            <div className="w-full h-14 border-b border-b-gray-200 flex items-center py-3">
                                <div className="w-[30%] h-full flex items-center px-4">
                                    Country
                                </div>
                                <div className="w-[70%] h-full flex items-center px-4 border-l border-l-gray-200">
                                    {oneUserData.country}
                                </div>
                            </div>
                            <div className="w-full h-14 flex items-center py-3">
                                <div className="w-[30%] h-full flex items-center px-4">
                                    Registered
                                </div>
                                <div className="w-[70%] h-full flex items-center px-4 border-l border-l-gray-200">
                                    {oneUserData.updatedAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={blockUser}
                onOk={handleBlockUser}
                onCancel={() => setBlockUser(false)}
                okButtonProps={{
                    className: "bg-[#0A503D] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#0e4152",
                    },
                }}
                okText={"Yes block"}
                closeIcon={true}
                title={"Block User"}
            >
                <p className="text-2xl">
                    Are you sure you want to block {oneUserData.fullName}?
                </p>
            </Modal>
            <Modal
                open={creditDebit}
                onOk={handleCreditDebit}
                onCancel={() => setCreditDebit(false)}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{
                    className: "bg-[#0A503D] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#0e4152",
                    },
                }}
                okText={`${creditOrDebit}`}
                closeIcon={true}
                title={`Credit/Debit ${oneUserData.fullName} account.`}
            >
                <div className="w-full h-max pt-6 flex flex-col gap-4">
                    <div className="w-full h-max flex">
                        <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
                            $
                        </div>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                            onChange={(e) => {
                                setCreditDebitValue(e.target.value);
                            }}
                            value={creditDebitValue}
                        />
                    </div>
                    <div className="w-full h-max">
                        <p>Select where to Credit/Debit</p>
                        <select
                            name=""
                            id=""
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                            onChange={(e) => {
                                setCreditDebitItem(e.target.value);
                            }}
                            value={creditDebitItem}
                        >
                            <option value="">Select Column</option>
                            <option value="bonus">Bonus</option>
                            <option value="profit">Profit</option>
                            <option value="refBonus">Ref_Bonus</option>
                            <option value="accountBalance">
                                Account Balance
                            </option>
                            <option value="deposit">Deposit</option>
                            <option value="totalInv">Total Investment</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <p>Select credit to add, debit to subtract</p>
                        <select
                            name=""
                            id=""
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                            onChange={(e) => setCreditOrDebit(e.target.value)}
                            value={creditOrDebit}
                        >
                            <option value="Credit">Credit</option>
                            <option value="Debit">Debit</option>
                        </select>
                        <p>
                            <span>NOTE: &nbsp;</span>You cannot debit the
                            deposit column of users
                        </p>
                    </div>
                </div>
            </Modal>
            <Modal
                open={resetPwd}
                onOk={handleResetPwd}
                onCancel={() => setResetPwd(false)}
                okButtonProps={{
                    className: "bg-[#0A503D] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#0e4152",
                    },
                }}
                okText={"Reset Now"}
                closeIcon={true}
                title={"Reset Password"}
            >
                <p className="text-base">
                    Are you sure you want to reset password for{" "}
                    {oneUserData.fullName} to user01236
                </p>
            </Modal>
            <Modal
                open={clearAcc}
                onOk={handleClearAcc}
                onCancel={() => setClearAcc(false)}
                okButtonProps={{
                    className: "bg-[#ffad46] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#ffad46",
                    },
                }}
                okText={"Proceed"}
                closeIcon={true}
                title={"Clear Account"}
            >
                <p className="text-base">
                    You are clearing account for {oneUserData.fullName} to $0.00
                </p>
            </Modal>
            <Modal
                open={addRoi}
                onOk={handleAddRoi}
                onCancel={() => setAddRoi(false)}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{
                    className: "bg-[#0A503D] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#0e4152",
                    },
                }}
                okText={"Add History"}
                closeIcon={true}
                title={`Add Trading History for ${oneUserData.fullName}`}
            >
                <div className="w-full h-max pt-6 flex flex-col gap-4">
                    <div className="w-full h-max">
                        <p>Select Investment Plan</p>
                        <select
                            name=""
                            id=""
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        >
                            <option value="">Select Plan</option>
                            <option value="">Bronze Plan</option>
                            <option value="">Silver Plan</option>
                            <option value="">Gold Plan</option>
                            <option value="">Daimond Plan</option>
                        </select>
                    </div>
                    <div className="w-full h-max">
                        <p>Select Investment Plan</p>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                    </div>
                    <div className="w-full">
                        <p>Type</p>
                        <select
                            name=""
                            id=""
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        >
                            <option value="">Select Type</option>
                            <option value="">Bonus</option>
                            <option value="">ROI</option>
                        </select>
                    </div>
                </div>
            </Modal>
            <Modal
                open={edit}
                onOk={handleEdit}
                onCancel={() => setEdit(false)}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{
                    className: "bg-[#0A503D] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#0e4152",
                    },
                }}
                okText={"Update"}
                closeIcon={true}
                title={`Edit ${oneUserData.fullName} details.`}
            >
                <div className="w-full h-max pt-6 flex flex-col gap-4">
                    <div className="w-full h-max">
                        <p>Username</p>
                        <input
                            type="text"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                        <p>
                            Note: same username should be use in the referral
                            link.
                        </p>
                    </div>
                    <div className="w-full h-max">
                        <p>Full name</p>
                        <input
                            type="text"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                    </div>
                    <div className="w-full h-max">
                        <p>Email</p>
                        <input
                            type="text"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                    </div>
                    <div className="w-full h-max">
                        <p>Phone number</p>
                        <input
                            type="text"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                    </div>
                    <div className="w-full h-max">
                        <p>Country</p>
                        <input
                            type="text"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                    </div>
                    <div className="w-full h-max">
                        <p>Referral link</p>
                        <input
                            type="text"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                open={sendEmail}
                onOk={handleSendEmail}
                onCancel={() => setSendEmail(false)}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{
                    className: "bg-[#0A503D] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#0e4152",
                    },
                }}
                okText={"Send"}
                closeIcon={true}
                title={"Send Email"}
            >
                <div className="w-full h-max pt-6 flex flex-col gap-4">
                    <p>This message will be sent to {oneUserData.fullName}</p>
                    <div className="w-full h-max">
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full h-10 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        />
                    </div>
                    <div className="w-full h-max">
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            className="w-full h-20 pl-4 border border-gray-200 rounded-r outline-sky-300"
                        ></textarea>
                    </div>
                </div>
            </Modal>

            <Modal
                open={login}
                onOk={handleLogin}
                onCancel={() => setLogin(false)}
                okButtonProps={{
                    className: "bg-[#ffad46] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#31ce36",
                    },
                }}
                okText={"Proceed"}
                closeIcon={true}
                title={`You are about to login as ${oneUserData.fullName}.`}
            ></Modal>
            <Modal
                open={deleteUser}
                onOk={handleDelete}
                onCancel={() => setDeleteUser(false)}
                okButtonProps={{
                    className: "bg-[#ffad46] text-white",
                    size: "middle",
                    style: {
                        backgroundColor: "#f25961",
                    },
                }}
                okText={"Yes I'm sure"}
                closeIcon={true}
                title={"Delete User"}
            >
                <p>
                    Are you sure you want to delete {oneUserData.fullName}{" "}
                    Account? Everything associated with this account will be
                    loss.
                </p>
            </Modal>
        </>
    );
};

export default UserDetails;
