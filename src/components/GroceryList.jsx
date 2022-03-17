import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  {faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faMinus, faTrash, faDeaf} from '@fortawesome/free-solid-svg-icons';
import '../index.css';

const GroceryList = () =>{
    const defaultItemList = [];

    const initialItemList = [
        {itemName: 'Item 1', quantity: 1, isSelected: false},
        {itemName: 'Item 2', quantity: 3, isSelected: false},
        {itemName: 'Item 3', quantity: 2, isSelected: false},
  ];

    const [items, setItems] = useState(initialItemList);

    const [inputValue, setInputValue] = useState('');

	const [totalItemCount, setTotalItemCount] = useState(1);

	const handleAddItem = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};
        if(inputValue ==="")
          return;
		const newItems = [...items, newItem];

		setItems(newItems);
		calculateTotal();
		setInputValue('');
        //Workaround
        
	}

	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal();
	}

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];
    if(newItems[index].quantity >= 1){
		    newItems[index].quantity-- ;

		    setItems(newItems);
		    calculateTotal();
        }
	}

	const toggleComplete = (index) => {
		const newItems = [...items];
        // Sets to the opposite of the current state
		newItems[index].isSelected = ! newItems[index].isSelected;

		setItems(newItems);
	}

    const clearItems = () =>{
    
        const newItems = defaultItemList;
        setItems(newItems);
        calculateTotal();
    }
    
    const clearSelected = () => {
        const newItems = [...items];
        for(var i = 0; i < newItems.length; i++){
		    if(newItems[i].isSelected){
                newItems.splice(i,1);
            }
        }
        setItems(newItems);
        calculateTotal();
    };

    const calculateTotal_EX = () => {
        var totalItems = 0;
		// const totalItems = items.reduce((total, item) => {
		// 	return total + item.quantity;
		// }, 0);

        for(var i = 0; i < items.length; i++){
            totalItems = totalItems + items[i].quantity;

        }
		setTotalItemCount(totalItems);
	};

	const calculateTotal = () => {
		const totalItems = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		setTotalItemCount(totalItems);
       
	};

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddItem()} />
					<FontAwesomeIcon icon={faMinus} onClick={() => clearSelected()} />
					<FontAwesomeIcon icon={faTrash} onClick={() => clearItems()} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
}
export default GroceryList;