import React, { useState } from 'react'
import { mainRow } from './mainRow';
import MOCK_DATA from './MOCK_DATA.json'
import './thetable.css'
function TheTable() {
// eslint-disable-next-line no-unused-vars
const [data, setData] = useState(MOCK_DATA)
const [editIdx, setEditIdx] = useState(-1);
const [input, setInput] = useState()


console.log(data)

const handleChange = (e) => {
    const { value } = e.target;
    setInput({...input,[e.target.id]: value,});
  };

   const edited=(rw)=>{
    const dated=new Date();
    rw.editedOn=dated
    rw.editedBy="editor"
    setInput(rw)
    }
    const startEditing = (index) => {
    setEditIdx(index);
    // copy selected row to input state for editing
    const editord=(rw)=>{setInput(rw);}
    data.map((row, j) => (j === index ? editord(row) : row))
    };

  const removeItem = (index) => {
    setEditIdx(-1);
    console.log("deleting",index,input)
    data.splice(index,1)
    edited(input)
    //handle datadbase delete here
  };

const cancelEdit = (index,) => {
  setEditIdx(-1);
};
  const saveEdits = (index, row,initRow) => {
    setEditIdx(-1);
    edited(input)
    data.splice(index,1,input)
    console.log("editing",index,input,row,initRow)
    //handle datdabase update here
};

const header = [
    {
      name: "Id",
      prop: "id",
    },
  {
      name: "Date",
      prop: "date",
    },
    {
      name: "Gender",
      prop: "gender",
    },
    {
      name: "Number",
      prop: "number",
    },
  ];


    return (
        <div>
        <table border="1" className="plain-table">
        <thead>
        <tr>
        {header&&header.map((x, i) =>
          {return (
              <th key={x.name+i}>
              {x.name}
              </th>
            );
          })}
           <th>update</th>
       
        </tr>
        </thead>
        <tbody>
     {
        data&&data.map((dataitem,dataindex)=>{
           return mainRow(
                dataindex,
                dataitem,
                header,
                handleChange,
                editIdx,
                startEditing,
                saveEdits,
                removeItem,
                cancelEdit,
                input,
                )
   
        })
        
    }
    <tr>
    {data.length === 0 && (
      <td colSpan="6" className="no-records">
        No records found to display!
      </td>
    )}
  </tr>
    </tbody>
        </table>
        </div>
    )
}

export default TheTable
