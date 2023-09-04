
// import {FaSearch} from 'react-icons/fa'
// import { Input } from 'semantic-ui-react'
// export const SearchBar = () => {
  //   const [input, setInput] = useState("")
//   const fetchData = (value) => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((json) => {
  //       const results = json.filter((user) => {
    
    //       })
    //     });
    //   }
    //   const handleChange = (value) => {
      //     setInput(value)
      //     fetchData(value)
      //   }
      //   return (
        //     <div className='search-bar'>
        //         <Input  
        //         placeholder='Search for more than 20,000 products'
        //         value={input}
        //         onChange={(e) => setInput(e.target.value)}/>
        
        //         <FaSearch id='search-icon'/>
        //     </div>
        //   )
        // }
import React, {useState} from 'react'
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";
import { Input } from 'semantic-ui-react';
import axios from 'axios';
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    axios
      .get('http://localhost:8080/products/searchProducts', { params: { keyword: value } })
      .then((response) => {
        setResults(response.data);
      });
  };
  

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <div className='input-container'>
        <Input
          placeholder="Search for more than 20,000 products"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className='search-container'>
        <FaSearch className="search-icon" size={24}/>
      </div>
    </div>
  );
};




