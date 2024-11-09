import { useEffect, useState } from "react";
import UserLineChart from "./UserLineChart";
import axios from "axios";
import { formatNumber } from "../assets/FormatedNumber";

export default function Admin_All_UserData() {
    const [userGrowthData, setUserGrowthData] = useState([]);
    useEffect(() => {
      fetchUserGrowthData();
    }, []);
  const fetchUserGrowthData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_LINK + `/api/user/monthlyUserData`);
      if (response && response.data) {
        setUserGrowthData(response.data); // Set the monthly user count data
      } else {
        console.log("No monthly user count data returned from server.");
      }
    } catch (error) {
      console.error("Error fetching monthly user count data:", error);
    }
  };
  return (
    <section>
      <h1 className="allUserData">Total User : { formatNumber(userGrowthData.totalUser)}</h1>
      <UserLineChart userData={userGrowthData.formattedData} />
    </section>
  );
}
