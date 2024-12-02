import Layout from "./Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Admin from "./Admin/Admin";
import Dishes from "./Dishes/Dishes";
import AddDish from "./Dishes/AddDish/AddDish";

const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="admin" element={<Admin />} />
                    <Route path="admin/dishes" element={<Dishes />} />
                    <Route path="admin/dishes/new-dish" element={<AddDish />} />
                    <Route path="admin/dishes/:id/edit" element={<AddDish />} />
                    <Route path="admin/orders" element={<Admin />} />
                </Routes>
            </Layout>
        </>
    );
};

export default App
