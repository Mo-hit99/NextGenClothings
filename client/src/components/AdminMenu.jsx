import { NavLink } from "react-router-dom";

export default function AdminMenu({dashboard,addproduct,vieworder}) {
  return (
    <aside>
        <div className="adminMenu">
            <ul className="dashboard-link">
                <h2 className="dashboard-analysis">Dashboard</h2>
                <li><NavLink to='/Admin/dashboard' className='dash-link-text'><i className="fa-solid fa-house"></i>{dashboard}</NavLink></li>
                <h2 className="dashboard-add-products">Add Products</h2>
                <li><NavLink to='/Admin/addproduct' className='dash-link-text'><i className="fa-solid fa-plus"></i>{addproduct}</NavLink></li>
                <h2 className="dashboard-View-Orders">Views Orders</h2>
                <li><NavLink to='/Admin/view/order' className='dash-link-text'><i className="fa-solid fa-cart-flatbed"></i>{vieworder}</NavLink></li>
            </ul>
        </div>
    </aside>
  )
}
