import React, { useState } from "react";
import './dataTable.css'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Modal from 'react-modal';

const DataTable = ({ columns, rows, fetchData, slug }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [undoOpen, setUndoOpen] = useState(false);

  React.useEffect(() => {
    fetchData()
      .then(data => setData(data))
      .catch(error => setError(error));
  }, [fetchData]);

  if (error) {
    return <div>Đã xảy ra lỗi: {error.message}</div>;
  }

  function handleDelete(id) {
    setModalOpen(true);
    setDeleteId(id);
  }

  function handleConfirmDelete() {
    // Call API to soft delete
    fetch(`http://localhost:8080/${slug}/${deleteId}`, { method: 'DELETE' })
      .then(() => {
        setData(data => data.filter(item => item.id !== deleteId));
        setModalOpen(false);
        // Show undo snackbar for 10 seconds
        setUndoOpen(true);
        setTimeout(() => setUndoOpen(false), 10000);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while deteting!');
      });
  }

  function handleUndo() {
    // Call API to undo soft delete
    fetch(`http://localhost:8080/${slug}/undo/${deleteId}`, { method: 'POST' })
      .then(() => {
        // Refresh data
        fetchData()
          .then(data => setData(data))
          .catch(error => setError(error));
        setUndoOpen(false);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while undoing!');
      });
  }

  const actionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => (
      <div className="action">
        <Link to={`/${slug}/${params.row.id}`}>
          <img src="/view.svg" alt="" />
        </Link>
        <div className="delete" onClick={() => handleDelete(params.row.id)}>
          <img src="/delete.svg" alt="" />
        </div>
      </div>
    ),
  };

  const columnsWithAction = [...columns, actionColumn];
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={columnsWithAction}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector

      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Confirm Delete"
      >
        <h2>Confirm Delete</h2>
        <hr/>
        <p>Are you sure you want to delete this item?</p>
        <div className="modalButtons">
          <button onClick={() => setModalOpen(false)}>Cancel</button>
          <button onClick={handleConfirmDelete} style={{backgroundColor: "#7181db", color: "#fff"}}>Delete</button>
        </div>
      </Modal>
      {undoOpen && (
        <div className="undoSnackbar">
          <p>Item deleted</p>
          <button onClick={handleUndo}>Undo</button>
        </div>
      )}
    </div>
  )
}
export default DataTable
