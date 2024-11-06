import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios'

// function App() {

//   let startDate, endDate, locationText, priceText;

//  // In App.js (React)
//  const retrieve = async () => {
//   try {
//     const response = await axios.get('http://127.0.0.1:5000/', {
//       params: {
//         'data[]': ['2024-11-13', '2024-11-14', 'toronto', '400']
//       },
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withCredentials: true, // Include credentials if needed
//     });

//     console.log("Data retrieved:", response.data); // Assuming Flask returns JSON data
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

//   return (
//     <div>
//       <div className="row">
//         <div className="col-md-12 text-center">
//           <h1 className="animate-character">Travel Agent</h1>
//         </div>
//       </div>



//       <div className="container">
      


//         <div className="slide">
//           <div
//             className="item"
//             style={{ backgroundImage: "url(https://i.ibb.co/qCkd9jS/img1.jpg)" }}
//           >
//             <div className="content">
//               <div className="name">Switzerland</div>
//             </div>
//           </div>


//           <div
//               className="item"
//               style={{ backgroundImage: "url(https://i.ibb.co/jrRb11q/img2.jpg)" }}
//             >
//               <div className="content">
//                 <div className="name">Finland</div>
//               </div>
//           </div>




//           <div
//             className="item"
//             style={{ backgroundImage: "url(https://i.ibb.co/NSwVv8D/img3.jpg)" }}
//           >
//             <div className="content">
//               <div className="name">Iceland</div>
//             </div>
//           </div>





//           <div
//             className="item"
//             style={{ backgroundImage: "url(https://i.ibb.co/Bq4Q0M8/img4.jpg)" }}
//           >
//             <div className="content">
//               <div className="name">Australia</div>x
//             </div>
//           </div>





//           <div
//             className="item"
//             style={{ backgroundImage: "url(https://i.ibb.co/jTQfmTq/img5.jpg)" }}
//           >
//             <div className="content">
//               <div className="name">Netherland</div>
//             </div>
//           </div>




//           <div
//             className="item"
//             style={{ backgroundImage: "url(https://i.ibb.co/RNkk6L0/img6.jpg)" }}
//           >
//             <div className="content">
//               <div className="name">Ireland</div>
//             </div>
//           </div>


//         </div>



//         <div className="s01" style={{display: 'flex', flexDirection: 'column'}}>

    


//           <form>
//             <div className="inner-form">
//               <div className="input-field first-wrap">
//                 <div style={{backgroundColor: 'rgba(181, 95, 95, 0)', height: '20px', width: '400px', position: 'fixed', transform: 'translateY(-30px)'}}>
//                   <p>Start Date</p>
//                 </div>
//                 <input id="search001" type="date" placeholder="Start Date" onChange={(e)=>{startDate = e.target.value}} />
//               </div>
//               <div className="input-field first-wrap">
//                 <div style={{backgroundColor: 'rgba(181, 95, 95, 0)', height: '20px', width: '400px', position: 'fixed', transform: 'translateY(-30px)'}}>
//                   <p>End Date</p>
//                 </div>
//                 <input id="search002" type="date" placeholder="End Date" onChange={(e)=>{endDate = e.target.value}} />
//               </div>

//               <div className="input-field second-wrap">
//                 <input
//                   name="search_input"
//                   type="text"
//                   placeholder="Search location"
//                   className="KB W Z pac-target-input locationin"
//                   autoComplete="off"
//                   onChange={(e)=>{locationText = e.target.value}}
//                 />
//               </div>



//               <div className="input-field second-wrap">
//                 <input id="price" type="text" placeholder="Price" onChange={(e)=>{priceText = e.target.value}} />
//               </div>




//               <div className="input-field third-wrap">
//                 <button className="btn-search" type="button" id="searchbutton" onClick={()=>{retrieve()}}>
//                   Search
//                 </button>
                
//               </div>





//             </div>
//           </form>

//         </div>

//       </div>

//     </div>
//   );
// }

function App(){
  let startDate, endDate, locationText, priceText;

  const [bottomStyleObject, bottomChanger] = useState({});


  const [responsedata,responseUpdate] = useState("");
  

  // In App.js (React)
  const retrieve = async () => {
   try {

      
    const datasend = {message:"notcool",location:locationText};

    const response = await axios.post('http://0.0.0.0:3001/sendrequest', datasend);
 
     console.log("Data back:",JSON.parse(response.data.received_message).text);
    response = JSON.parse(response.data.received_message).text.split("\n");
  

    responseUpdate(response);
     bottomChanger({width:"800px", height:"100px"})
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };
  return (<div>

      <div className='bg-gradient-to-r from-green-50 to-blue-200 py-20 px-10 rounded-lg shadow-lg'>
            <h1 className='text-6xl text-blue-400 py-10'>TravelPedia</h1>

          <form>
           <div className="inner-form flex my-10">
              <div className="input-field first-wrap">
                 <div style={{backgroundColor: 'rgba(181, 95, 95, 0)', height: '20px', width: '400px', position: 'fixed', transform: 'translateY(-30px)'}}>
                  <p>Start Date</p>
                 </div>
                 <input id="search001" className='p-3 m-1' type="date" placeholder="Start Date" onChange={(e)=>{startDate = e.target.value}} />
               </div>
              <div className="input-field first-wrap">
                <div style={{backgroundColor: 'rgba(181, 95, 95, 0)', height: '20px', width: '400px', position: 'fixed', transform: 'translateY(-30px)'}}>
                   <p>End Date</p>
                 </div>
                 <input className=' p-3 m-1' id="search002" type="date" placeholder="End Date" onChange={(e)=>{endDate = e.target.value}} />
               </div>

               <div className="input-field second-wrap">
                 <input
                 
                  name="search_input"
                  type="text"
                  placeholder="Search location"
                  className="KB W Z pac-target-input locationin p-3 m-1"
                  autoComplete="off"
                  onChange={(e)=>{locationText = e.target.value}}
                />
              </div>



              <div className="input-field second-wrap">
                <input id="price" type="text" className='p-3 m-1' placeholder="Price" onChange={(e)=>{priceText = e.target.value}} />
              </div>




              <div className="input-field third-wrap p-1">
                <button className="place-content-center h-full w-20 btn-search bg-blue-300" type="button" id="searchbutton" onClick={()=>{retrieve()}}>
                  Search
                </button>
                
              </div>





            </div>
          </form>

          <div className='overflow-y-scroll' style={bottomStyleObject}>
            <ul>
             

            </ul>
            
            {responsedata}</div>

      </div>

  </div>)
}

export default App;
