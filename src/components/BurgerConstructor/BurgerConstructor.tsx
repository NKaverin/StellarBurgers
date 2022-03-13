import {  ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { RootState } from '../../services/redusers/rootReduser';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ADD_TO_ORDER, REMOVE_FROM_ORDER, REORDER_ITEMS } from '../../services/actions/orderReducer';
import propTypesOfDataElement from '../../utils/propTypesOfDataElement';


const  BurgerConstructor = (props) => {
    function onClickDeleteElement(element) {
        dispatch({type:REMOVE_FROM_ORDER, element: element})
        setElementIndex(elementIndex - 1); 
    }

    // нулевой индекс - это булка
    const [elementIndex, setElementIndex] = useState(1);
    const dispatch = useDispatch();
    const order = useSelector((state:RootState) => state.order);

    const data = order.ingredients;
    // не может быть двух разных булок
    const stockBun =  data.filter((element) => element.type === 'bun')[0];
    const [, dropTarget] = useDrop({
        accept: "ingredient",    
        drop(element:Element) {
            if (element.type === 'bun') {
                element = {...element, elementIndex: 0}
                dispatch({type:ADD_TO_ORDER, element: element}); 
            } else {
                element = {...element, elementIndex: elementIndex}
                dispatch({type:ADD_TO_ORDER, element: element});     
                setElementIndex(elementIndex + 1); 
            }
        }        
    });    

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {  
            dispatch({type:REORDER_ITEMS, dragIndex, hoverIndex});
        },
        [data],
    )

    return (  
        <section className={styles.burgerConstructor + " ml-5 pt-25"} ref = { dropTarget }>
            {/* отдельно верх булки*/}
            <div className={styles.burgerConstructor__bun + " pl-8" }>
                <ConstructorElement 
                    isLocked={true}
                    text={stockBun.name + " (верх)"}
                    price={stockBun.price}
                    thumbnail={stockBun.image}
                />
            </div>
            {/* содержимое*/}
            <ul className={styles.burgerConstructor__ingredients + " "}>   
                {data.map( element => {
                    if (element.type !== 'bun') { 
                        return <IngredientInOrder onClickDeleteElement = {(element) => onClickDeleteElement(element)} element={element} moveListItem={moveListItem} />
                    }                    
                })}
            </ul>
            {/* отдельно низ булки*/}
            <div className={styles.burgerConstructor__bun + " pl-8 mt-4"}>
                <ConstructorElement 
                    isLocked={true}
                    text={stockBun.name + " (низ)"}
                    price={stockBun.price}
                    thumbnail={stockBun.image}
                />
            </div>
            {/* подвал*/}
            <div className={styles.burgerConstructor__total + " mt-10 mr-10"}>
                <p className="text text_type_digits-medium mr-2">{order.totalPrice}</p>
                <CurrencyIcon type="primary" />
                <div className="ml-10" onClick={props.openHandler}>
                    <Button type="primary" size="medium">
                        Оформить заказ
                    </Button>   
                </div>
        
            </div>
        </section>      
    );
};

const IngredientInOrder = (props) => { 
    const element = props.element;
    const ref = useRef<HTMLLIElement>(null)

    const [{ isDragging }, dragRef] = useDrag({
        type: 'orderInOrder',  
        item: element,
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const [, dropRef] = useDrop({
        accept: 'orderInOrder',
        hover: (item:Element, monitor) => {
            const dragIndex = item.elementIndex
            const hoverIndex = element.elementIndex
            const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = (monitor.getClientOffset() as XYCoord).y  - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            props.moveListItem(dragIndex, hoverIndex)

        },
    })

    dragRef(dropRef(ref))
    
    return (
        <li className={styles.burgerConstructor__element + " mt-4" } key={element.elementIndex} ref={ref} id ={element.elementIndex}>
            <DragIcon type="primary" />
            <ConstructorElement
                text= {element.name}
                price={element.price}
                thumbnail={element.image}
                handleClose={() => props.onClickDeleteElement(element)}
            />
        </li>
    )

}

BurgerConstructor.propTypes = {
    openHandler: PropTypes.func.isRequired
}

IngredientInOrder.propTypes = {
    onClickDeleteElement: PropTypes.func.isRequired,
    moveListItem: PropTypes.func.isRequired,
    element: propTypesOfDataElement
}

interface Element {
    elementIndex: number   
    id: string
    type: string
}
export default BurgerConstructor;
