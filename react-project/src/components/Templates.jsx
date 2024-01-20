import React, { useState, useEffect } from 'react'

//mui
import { DataGrid } from '@mui/x-data-grid';

import MuiAlert from '@mui/material/Alert';



import { isAuthenticated } from '../auth';
import { getTemplates } from '../api/template';
import moment from 'moment';



//icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Snackbar } from '@mui/material';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const copy = (id) => {
  console.log(window.location)
  navigator.clipboard.writeText(`${window.location.origin}/template/${id}`)
}



const Templates = () => {

  const columns = [

    { field: 'name', headerName: 'Name ', flex: 1 },
    {
      field: '_id', headerName: 'Link', flex: 1, renderCell: (cell) => (
  
        <div>
          <a href={`/template/${cell.row._id}`} target='_blank'>{`/template/${cell.row._id}`}
  
          </a>  <IconButton onClick={() => {
            copy(cell.row._id)
            setOpenSnackbar(true)
          }}>
            <ContentCopyIcon />
          </IconButton>
        </div>
      )
    },
    {
      field: 'createdAt',
      headerName: 'createdAt'
      , flex: 1,
      renderCell: (cell) => (<p>{moment(cell.value).format('LLL')}</p>)
    },
  ];
  
  const [rows, setRows] = useState([])
  //openSnackbar
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [templates, setTemplates] = useState([])
  const { user, token } = isAuthenticated()
  useEffect(() => {

    getTemplates(user._id, token).then((data) => {

      setTemplates(data.templates)
    })
  }, [])

  
  return (
    <div>


      <DataGrid
        rows={templates}
        getRowId={(row) => row._id}
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

<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={()=>setOpenSnackbar(false)}>
  <Alert onClose={()=>setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
    copied!
  </Alert>
</Snackbar>
    </div>
  )
}

export default Templates