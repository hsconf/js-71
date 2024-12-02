import {useState} from "react";
import {Dish} from "../../app/types";
import {useAppDispath, useAppSelector} from "../../app/hooks";
import {newDish} from "../../app/state/pizzaSlice";
import Loader from "../../components/Loader/Loader";
import {useNavigate, useParams} from "react-router-dom";

const AddDish = () => {
    const dispatch = useAppDispath();
    const {isLoading} = useAppSelector((state) => state.pizza)
    const navigate = useNavigate();
    const {id: params} = useParams();
    const [dish, setDish] = useState<Dish>({
        title: '',
        price: '',
        image: '',
    });

    console.log(params);

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDish(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(newDish(dish));
        navigate("/admin/dishes");
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="row px-2">
            <form onSubmit={onSubmit} className="col-sm-6 d-flex flex-column gap-3 align-items-center mx-auto border p-3 rounded shadow mt-sm-5">
                <h3>Add new dish</h3>
                <input type="text" className="form-control" placeholder="Title" name="title" onChange={onHandleChange} value={dish.title} />
                <input type="text" className="form-control" placeholder="Price" name="price" onChange={onHandleChange} value={dish.price} />
                <input type="text" className="form-control" placeholder="Image" name="image" onChange={onHandleChange} value={dish.image} />
                <button type="submit" className="btn btn-outline-warning mt-2 w-50">Submit</button>
            </form>
        </div>
    );
};

export default AddDish;