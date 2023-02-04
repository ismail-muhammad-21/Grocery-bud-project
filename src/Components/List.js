import React from 'react';

import { AiFillEdit , AiFillDelete } from "react-icons/ai";

const List = ({items,removeItem,editItem}) => {
  return (
    <div className='grocery-list'>
      {items.map((item) =>{
        const {id,title} = item;
        return (
          <article key={id} className="grocery-item" >
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button type='button' className='edit-btn' onClick={() => editItem(id)}> <AiFillEdit /> </button>
              <button type='button' className='delete-btn' onClick={() => removeItem(id)}> <AiFillDelete /> </button>

            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List;