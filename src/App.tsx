import Layout from "./containers/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Dishes from "./containers/Dishes/Dishes";
import AddDish from "./containers/Dishes/AddDish/AddDish";
import MainMenu from "./containers/MainMenu/MainMenu";

const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<MainMenu />} />
                    <Route path="admin" element={<Dishes />} />
                    <Route path="admin/dishes" element={<Dishes />} />
                    <Route path="admin/dishes/new-dish" element={<AddDish />} />
                    <Route path="admin/dishes/:id/edit" element={<AddDish />} />
                </Routes>
            </Layout>
        </>
    );
};

export default App
