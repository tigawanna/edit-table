import {FaRegEdit, FaRegTrashAlt, FaRegCheckCircle, FaTimesCircle} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import dayjs from 'dayjs'


const mainRow=(
    index,
    item,
    header,
    handleChange,
    editIdx,
    startEditing,
    stopEditing,
    removeItem,
    cancelEdit,
    input,
    update
    )=>{
 
  const currentlyEditing = editIdx ===index;
  return<tr key={item.id+index+item.gender+item.date}>
      
  {header.map((head,index)=>{

     return(
          <td key={head.prop+item[head.prop]+index}>
          {currentlyEditing?
              <input
              id={head.prop}
              name={head.prop}
              onChange={(e) => handleChange(e, head.prop, index)}
              value={input[head.prop]}
                  />:
               (head.prop==="date"?( dayjs(item[head.prop])
               .format('MMM D, YYYY h:mm A')
               ):item[head.prop])
              }
              </td>
              )
  })
}

<td>
  <IconContext.Provider 
  value={{size:"1.2rem",className:"table-edit-icons"}}>
{currentlyEditing?
  <FaRegCheckCircle
  onClick={() => stopEditing(index,item)}
  />:<div>
  <FaRegEdit
  onClick={() => startEditing(index)}
  />
</div>
}
{currentlyEditing?
  <FaRegTrashAlt
  onClick={()=>removeItem(index)}/>:null
}
{currentlyEditing?
  <FaTimesCircle
  onClick={() => cancelEdit(index)}
  />
  :null
}
</IconContext.Provider>
</td>
</tr>
       
  

}



export {mainRow}