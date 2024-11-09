
import { Outlet } from "react-router-dom";
import AdminMenu from "./AdminMenu";

export default function Admin() {
 return(

     <section className="dashboard-home">
      <AdminMenu dashboard='DashBoard' addproduct='AddProducts' vieworder='ViewOrders' UserOrderStatus={'User Order Status'} CustomerMessageHandler={'Customer Message Handler'} AllUserDataByMonth={'All User Data By Month'}/>
      <Outlet/>
    </section>
)
}
