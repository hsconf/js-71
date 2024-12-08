import {useEffect, useState} from "react";
import {Dish} from "../../../app/types";
import {useAppDispath, useAppSelector} from "../../../app/hooks";
import {editDish, newDish} from "../../../app/state/pizzaSlice";
import Loader from "../../../components/Loader/Loader";
import {Link, useNavigate, useParams} from "react-router-dom";

const AddDish = () => {
    const dispatch = useAppDispath();
    const {isLoading, dish} = useAppSelector((state) => state.pizza)
    const navigate = useNavigate();
    const {id: params} = useParams();
    const [dishState, setDishState] = useState<Dish>({
        title: '',
        price: '',
        image: '',
    });

    useEffect(() => {
        if (params) {
            setDishState({
                title: dish.title,
                price: dish.price,
                image: dish.image,
            })
        }
    }, [dispatch, params, dish]);

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDishState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (params) {
            dispatch(editDish({...dishState, id: dish.id}))
        } else {
            dispatch(newDish(dishState));
        }
        navigate("/admin/dishes");
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="row px-2">
            <form onSubmit={onSubmit} className="col-sm-6 d-flex flex-column gap-3 align-items-center mx-auto border p-3 rounded shadow mt-sm-5">
                <h3>Add new dish</h3>
                <input type="text" className="form-control" placeholder="Title" name="title" onChange={onHandleChange} value={dishState.title} />
                <input type="text" className="form-control" placeholder="Price" name="price" onChange={onHandleChange} value={dishState.price} />
                <input type="text" className="form-control" placeholder="Image" name="image" onChange={onHandleChange} value={dishState.image} />
                {dishState.image.length > 10 ? <img src={dishState.image} alt={dishState.title} className="end-50" style={{width: 200}}/> : null}
                <div className="d-flex gap-2 mt-3">
                    <Link to="/admin/dishes/" className="btn btn-outline-danger px-sm-5">Back</Link>
                    <button type="submit" className="btn btn-outline-warning px-sm-5">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddDish;