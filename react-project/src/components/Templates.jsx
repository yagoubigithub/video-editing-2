import React, { useState  , useEffect} from 'react'

//mui
import { DataGrid } from '@mui/x-data-grid';



import { isAuthenticated } from '../auth';
import { getTemplates } from '../api/template';
import moment from 'moment';



//icons
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const columns = [
   
    { field: 'name', headerName: 'Name ', flex: 1  },
    { field: '_id', headerName: 'Link', flex: 1  , renderCell : ( cell)=> ( <a href={`/template/${cell.row._id}`} target='_blank'>{`/template/${cell.row._id}`}
    <InsertLinkIcon/>
    </a>) },
    {
      field: 'createdAt',
      headerName: 'createdAt'
      , flex: 1 ,
      renderCell : (cell)=>(<p>{moment(cell.value).format('LLL')}</p>)
    },
  ];
  

  
const Templates = () => {

    const [rows , setRows] = useState([])
    const [templates , setTemplates] = useState([]) 
    const {user, token} = isAuthenticated()
    useEffect(()=>{

        getTemplates(user._id , token).then((data)=>{

            setTemplates(data.templates)
        })
    } , [])
  return (
    <div>


<DataGrid
        rows={templates}
        getRowId={(row)=>row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
     //   checkboxSelection
      />
    </div>
  )
}

export default Templates