import { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import React from "react";

export default function TableForm({description, setDescription,quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    setAmount,
     list,
    setList,
total,
setTotal}) {
 
        const[isEditing,setIsEditing]=useState(false)
        const handleSubmit=(e)=>{
            e.preventDefault()
            if(!description || !quantity|| !price){
                alert("Please enter the details")
            }
            else{
            const newItems={
                 id:uuidv4(),
                 description,
                 quantity,
                 price,
                 amount
            }
            setDescription("")
            setQuantity("")
            setPrice("")
            setAmount("")
            setIsEditing(false)
            setList([...list, newItems])
        }}
        useEffect(()=>{
            const calculateAmount=(amount)=>{
                setAmount(quantity*price)
            }
            calculateAmount(amount)
        },[amount,price,quantity,setAmount])
        useEffect(()=>{
        let rows=document.querySelectorAll(".amount")
        let sum=0
        for(let i=0;i<rows.length;i++){
            if(rows[i].className==="amount"){
                sum+=isNaN(rows[i].innerHTML) ? 0: parseInt(rows[i].innerHTML)
                setTotal(sum)
            }
        }
         })
        const editRow=(id)=>{
            const editingRow=list.find((row)=>row.id===id)
            setList(list.filter((row)=>row.id !==id))
            setIsEditing(true)
            setDescription(editingRow.description)
            setQuantity(editingRow.quantity)
            setPrice(editingRow.price)
        }

        const deleteRow=(id)=> setList(list.filter((row)=>row.id !==id))
        
  return (
   <>
   <form onSubmit={handleSubmit}>
    <div className="flex flex-col md:mt-16">
     <label htmlFor="description">Item description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Item description"
            maxLength={96}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
     </div>
     <div className="md:grid grid-cols-3 gap-10">
          <div className="flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              maxLength={33}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              maxLength={33}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <p>{amount}</p>
          </div>
          </div>
          <button  type="submit"  className="bg-blue-500 mb-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150
           hover:ring-4 hover:ring-blue-400">  {isEditing ? "Finish Editing" : "Add Table Item"}</button>
          </form>
          <table width="100%" className="mb-10 overflow-auto">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td className="amount">{amount}</td>
                <td><button onClick={()=>deleteRow(id)}> <AiOutlineDelete className="text-red-500 font-bold text-xl" /></button></td>
                <td>
                  <button onClick={() => editRow(id)}>
                    <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                  </button>
                </td>
                </tr>
            </tbody>
          </React.Fragment>
        ))}
        </table>
        <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
        Kshs. {total.toLocaleString()}
        </h2>
      </div>
   </>
  )
}
