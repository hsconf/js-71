import {Link} from "react-router-dom";
import {useAppDispath, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {deleteDish, fetchDishes, getDish} from "../../app/state/pizzaSlice";
import Loader from "../../components/Loader/Loader";

const Dishes = () => {
    const {dishes, isEditing, isLoading, isDeleting} = useAppSelector((state) => state.pizza);
    const dispatch = useAppDispath();

    useEffect(() => {
        dispatch(fetchDishes())
    }, [dispatch, isEditing, isDeleting])

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="row align-items-center">
                <h3 className="col-2">Dishes</h3>
                <Link to="new-dish" className="col-sm-4 btn btn-primary ms-auto me-2" style={{maxWidth: 150}}>Add new Dish</Link>
            </div>
            <div className="mt-5 px-sm-3">
                <div className="row align-items-centerp-2">
                    <b className="col-4 fs-4">
                        Image
                    </b>
                    <b className="col-2 fs-4">
                        Name
                    </b>
                    <b className="col-2 fs-4">
                        Price
                    </b>
                </div>
                {dishes.map((dish) => (
                    <div className="row align-items-center mb-1 border rounded p-2" key={dish.id}>
                        <div className="col-4">
                            <img src={dish.image} alt={dish.title} className="col-sm-4 col-10"/>
                        </div>
                        <div className="col-2 fs-4">
                            {dish.title}
                        </div>
                        <div className="col-2 fs-4">
                            {dish.price}
                        </div>
                        <div className="col-sm-4 col-2 d-flex gap-2 justify-content-end ms-auto">
                            <Link to={dish.id + '/edit'} className="btn btn-outline-warning"
                                  onClick={() => dispatch(getDish(dish))}>Edit</Link>
                            <button className="btn btn-outline-danger"
                                    onClick={() => dispatch(deleteDish(dish.id))}>Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dishes;