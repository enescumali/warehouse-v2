import { Outlet } from "react-router-dom";
import CustomLink from "../components/CustomLink";

function Layout() {
    return (
        <>
            <nav className="tab-titles border-b items-center mb-4">
                <ul className="flex">
                    <li>
                        <h2 className="mr-8">
                            <CustomLink to="/product-list">Product List</CustomLink>
                        </h2>
                    </li>
                    <li>
                        <h2>
                            <CustomLink to="/sales">Sales</CustomLink>
                        </h2>
                    </li>
                </ul>
            </nav>
            
            <main className="tab-content bg-white border-gray-200 border-r p-5 shadow sm:rounded-lg">
                <Outlet />
            </main>
        </>
    );
  }

  export default Layout;