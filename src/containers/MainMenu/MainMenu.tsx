import {useAppDispath, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {fetchDishes} from "../../app/state/pizzaSlice";
import Modal from "../../components/Modal/Modal";
import {addToCart} from "../../app/state/orederSlice";

const MainMenu = () => {
    const {dishes} = useAppSelector((state) => state.pizza);
    const {cartDishes} = useAppSelector((state) => state.order);
    const dispatch = useAppDispath();
    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch])


    return (
        <>
        <div className="px-1" style={cartDishes.length > 0 ? {marginBottom: 80} : {marginBottom: 0}}>
            {dishes.map((dish) => (
                <div
                    onClick={() => dispatch(addToCart(dish))}
                    className="row align-items-center justify-content-between p-md-3 p-sm-2 p-1 border rounded shadow mb-1"
                    key={dish.id}
                >
                    <img src={dish.image} alt={dish.title} className="col-sm-4 col-md-2 col-4"/>
                    <h5 className="col-sm-4 col-4 fs-4">{dish.title}</h5>
                    <span className="col-sm-4 col-4 fs-5" style={{lineHeight: 1}}>{dish.price} COM</span>
                </div>
            ))}
        </div>
            {cartDishes.length > 0 ? <Modal /> : null}
        </>
    );
};

export default MainMenu;