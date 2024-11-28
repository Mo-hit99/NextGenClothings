import { useEffect, useState } from "react";
import UserLineChart from "./UserLineChart";
import axios from "axios";
import { formatNumber } from "../assets/FormatedNumber";
import ShimmerSkeleton from "./ShimmerSkeleton";

export default function Admin_All_UserData() {
   const [loading,setLoading] = useState(true);
    const [userGrowthData, setUserGrowthData] = useState([]);
    useEffect(() => {
      fetchUserGrowthData();
    }, []);
  const fetchUserGrowthData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_SERVER_USER_LINK + `/users/monthlyUserData`);
      if (response && response.data) {
        setUserGrowthData(response.data); // Set the monthly user count data
      } else {
        console.log("No monthly user count data returned from server.");
      }
    } catch (error) {
      console.error("Error fetching monthly user count data:", error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <section>
      {loading ? (<ShimmerSkeleton cards={4}/>) : userGrowthData.totalUser > 0 ? (

        <>
        <h1 className="allUserData">Total User : { formatNumber(userGrowthData.totalUser)}</h1>
        <UserLineChart userData={userGrowthData.formattedData} />
        </>
      ):(
        <p className="api-para2"> No Results Found!</p>
      )
      }
    </section>
  );
}
