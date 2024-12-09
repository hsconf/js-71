import {useAppDispath, useAppSelector} from "../../app/hooks";
import {openModal} from "../../app/state/orederSlice";

const Modal = () => {

    const {cartDishes, modal, order} = useAppSelector((state) => state.order)
    const dispatch = useAppDispath();

    const x = cartDishes.filter((dish) => {
        const y = Object.keys(order).map(i => {
            if (dish.id === i) {
                return {...dish, quantity: order[i]};
            }
        })
        console.log(y);
    })
    console.log(x);

    const orderView = (
        <div>
            <h3>Your order:</h3>
            <div>
                {cartDishes.map((dish) => (
                    <div>
                        <p>{dish.title}</p>
                        {/*<p>total: {dish.id === }</p>*/}
                    </div>
                ))}
                <p>Delivery: 150</p>
                <p>Total: {cartDishes.reduce((acc, dish) => acc += parseFloat(dish.price), 150)}</p>
            </div>

        </div>
    )

    console.log(Object.keys(order))

    return (
        <div className={`position-fixed bottom-0 start-0 end-0 w-100 bg-white border-top ${modal ? 'top-0' : ''}`}>
            {modal ? orderView : null}
            <div className={`d-flex justify-content-between align-items-center p-3 ${modal ? 'd-none' : ''}`}>
                <h6 className="h6 m-0">Order total: {cartDishes.reduce((acc, dish) => acc += parseFloat(dish.price) , 0)}</h6>
                <button className="btn btn-outline-primary" onClick={() => dispatch(openModal(!modal))}>Checkout</button>
            </div>
        </div>
    );
};

export default Modal;