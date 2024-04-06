


import { useState } from 'react';
import { useRef } from 'react';




let listArr = [];

let count = 1;

export default function Main(props){

const inputRef = useRef(null);

const inputRef2 = useRef(null);

 const [listItem,setListItem] = useState('');

 let itemArr = [];

 //localStorage.setItem("arr", "[1,2,3,4]");

 if (localStorage.getItem("arr") == null) localStorage.setItem("arr", "[]");

 let getItemsFromLocal = localStorage.getItem("arr");



 console.log(`getItemsFromLocal: ${getItemsFromLocal}`);

 let parsedItems = JSON.parse(getItemsFromLocal);

 const [itemList,setItemList] = useState(parsedItems);

 const [itemHistInst,setItemHistInst] = useState([]);

 const [itemHistory,setItemHistory] = useState([]);

 //itemList.push("b");


 

const listItems = itemList.map((item,index) => <li key={index}> <button className="deleteButtons" 
onClick={() => {setItemList(itemList.filter((item,arrIndex) => arrIndex !== index)); 
    setItemHistory([...itemHistory,itemList]); 
    //localStorage.removeItem(item);

      //delete items from storage when click x button

      parsedItems.splice(index,1);
  
      let stringRemoveItems = JSON.stringify(parsedItems)
  
      localStorage.setItem("arr", stringRemoveItems);
  
      console.log(`parsedItems: ${parsedItems}`)

    count = 1; 
    console.log(`itemHistory: ${itemHistory}`)}}>X</button>{item}</li>);

  

   





    return (
        <>
        <div id = "flexContainer">
        
        <input  id="inputBox" ref= {inputRef} placeholder='add todo item' value={listItem} onChange={e => setListItem(e.target.value)} onKeyDown={e => {
            if (e.key === "Enter"){
                inputRef2.current.click();
            }
        }} />
        <button ref={inputRef2} className="button" id="add"
        onClick={(e) => {
            if (listItem == ''){
                return
            }
            else {

            
            //save list items to local storage
            
           
            parsedItems.push(listItem);

            localStorage.clear();

            let stringItems = JSON.stringify(parsedItems)

            localStorage.setItem("arr", stringItems);

            console.log(`parsedItems: ${parsedItems}`)

        

            setItemList([...itemList,listItem]); 


          //itemArr.push(listItem);

          console.log(`itemArr ${itemArr}`);


            setItemHistory([...itemHistory,itemList]); 

           
            count = 1; 
            console.log(`listItem: ${listItem}`); 
            console.log(`itemHistory: ${itemHistory}`); 
            console.log(`itemList: ${itemList}`);
            inputRef.current.focus();

         
            
            //localStorage.setItem(Date.now(), listItem);
            setListItem(e.target.value)}}}>Add Item</button>

        <button id="goBack" className="button" onClick={() => {
        if (itemList.length < 1){
            return
        }
        else {
            setItemList(...[itemHistory[itemHistory.length - count]]); count++; console.log(itemList)}}}>Go Back</button>

        <ol className="remove">{listItems}</ol>
        </div>
        </>
    )
}