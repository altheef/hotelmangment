import {
 useState,
 useEffect
}
from "react";

import Header
from "../components/Header";

import {
 useDispatch,
 useSelector
}
from "react-redux";

import Swal
from "sweetalert2";

import {

 addCustomer,

 deleteCustomer,

 updateCustomer,

 searchCustomer,

 initializeCustomer

}
from "../redux/slices/customerSlice";

function Customers() {

 const dispatch =
 useDispatch();

 const { customers } =
 useSelector(
  state =>
  state.customerReducer
 );

 const [name,setName]
 =
 useState("");

 const [email,setEmail]
 =
 useState("");

 const [phone,setPhone]
 =
 useState("");

 const [editingId,
 setEditingId]
 =
 useState(null);

 useEffect(()=>{

  dispatch(
   initializeCustomer()
  );

 },[dispatch]);

 const handleSubmit =
 () => {

  if(
   !name ||
   !email ||
   !phone
  )
  {
   Swal.fire({
    title:"Missing",
    text:"Fill all fields",
    icon:"warning"
   });

   return;
  }

  if(editingId){

   dispatch(
    updateCustomer({

      id:editingId,

      name,

      email,

      phone

    })
   );

   Swal.fire({
    title:"Updated",
    icon:"success"
   });

   setEditingId(null);

  }

  else{

   dispatch(
    addCustomer({

      id:Date.now(),

      name,

      email,

      phone

    })
   );

   Swal.fire({
    title:"Added",
    icon:"success"
   });

  }

  setName("");
  setEmail("");
  setPhone("");
 };

 const handleDelete =
 (id)=>{

  Swal.fire({

   title:"Delete Customer?",

   icon:"warning",

   showCancelButton:true

  }).then(result=>{

   if(result.isConfirmed){

    dispatch(
      deleteCustomer(id)
    );

    Swal.fire(
      "Deleted",
      "",
      "success"
    );
   }

  });

 };

 const handleEdit =
 (customer)=>{

  setEditingId(
    customer.id
  );

  setName(
    customer.name
  );

  setEmail(
    customer.email
  );

  setPhone(
    customer.phone
  );
 };

 return (

 <>
 <Header/>

 <div
 className="container mt-5 pt-5"
 >

 <h1
 className="text-primary mb-4"
 >
 Customers
 </h1>

 <input

 type="text"

 placeholder="Search Customer"

 className="form-control mb-3"

 onChange={(e)=>

 dispatch(

 searchCustomer(
 e.target.value
 )

 )}

 />

 <div
 className="card p-4 shadow mb-4"
 >

 <input

 className="form-control mb-2"

 placeholder="Name"

 value={name}

 onChange={e=>
 setName(
 e.target.value
 )}

 />

 <input

 className="form-control mb-2"

 placeholder="Email"

 value={email}

 onChange={e=>
 setEmail(
 e.target.value
 )}

 />

 <input

 className="form-control mb-2"

 placeholder="Phone"

 value={phone}

 onChange={e=>
 setPhone(
 e.target.value
 )}

 />

 <button

 onClick={handleSubmit}

 className="btn btn-success"

 >

 {editingId ?

 "Update Customer"

 :

 "Add Customer"}

 </button>

 </div>

 <table
 className="table table-bordered"
 >

 <thead>

 <tr>

 <th>#</th>

 <th>Name</th>

 <th>Email</th>

 <th>Phone</th>

 <th>Action</th>

 </tr>

 </thead>

 <tbody>

 {

 customers.length>0 ?

 customers.map(
 (customer,index)=>(

 <tr
 key={customer.id}
 >

 <td>
 {index+1}
 </td>

 <td>
 {customer.name}
 </td>

 <td>
 {customer.email}
 </td>

 <td>
 {customer.phone}
 </td>

 <td>

 <button

 onClick={()=>
 handleEdit(
 customer
 )}

 className=
 "btn btn-warning me-2"

 >
 Edit
 </button>

 <button

 onClick={()=>
 handleDelete(
 customer.id
 )}

 className=
 "btn btn-danger"

 >
 Delete
 </button>

 </td>

 </tr>

 ))

 :

 <tr>

 <td
 colSpan="5"
 >

 No Customers Found

 </td>

 </tr>

 }

 </tbody>

 </table>

 </div>

 </>
 );
}

export default Customers;
