// import React, {useState, useEffect} from 'react';
// import axios from 'axios';

// export const Profile = () => {
//   const [user, setUser] = useState(null);

//   const fetchUserProfile = () => {
//     let token = localStorage.getItem('token');
//     if (token) {
//       axios.get(`http://localhost:8080/user/profile?token=${token}`)
//         .then(function (response) {
//           // Xử lý thông tin của người dùng đã đăng nhập
//           let user = response.data;
//           setUser(user);
//         })
//         .catch(function (error) {
//           alert(error.response.data.message);
//         });
//     }
//   }

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   return (
//     <div>
//       <form action="">
//       {/* Hiển thị thông tin của người dùng */}
//       {user && (
//         <div>
//           <p>Username {user.username}</p>
//           <p>Name {user.firstName + " " + user.lastName}</p>
//           <p>Email {user.email}</p>
//           <p>Phone {user.phone}</p>
//         </div>
//       )}

//       </form>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = () => {
    let token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://localhost:8080/user/profile?token=${token}`)
        .then(function (response) {
          let user = response.data;
          setUser(user);
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <form action="">
        {/* Hiển thị thông tin của người dùng */}
        {user && (
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography variant="body2">
                Name: {user.firstName + " " + user.lastName}
              </Typography>
              <Typography variant="body2">
                Email: {user.email}
              </Typography>
              <Typography variant="body2">
                Phone: {user.phone}
              </Typography>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  )
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';

// export const Profile = () => {
//   const [user, setUser] = useState(null);

//   const fetchUserProfile = () => {
//     let token = localStorage.getItem('token');
//     if (token) {
//       axios.get(`http://localhost:8080/user/profile?token=${token}`)
//         .then(function (response) {
//           let user = response.data;
//           setUser(user);
//         })
//         .catch(function (error) {
//           alert(error.response.data.message);
//         });
//     }
//   }

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   return (
//     <div>
//       <form action="">
//         {/* Hiển thị thông tin của người dùng */}
//         {user && (
//           <Card>
//             <CardContent>
//               <Typography variant="h5" component="div">
//                 {user.username}
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Name:</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">{user.firstName + " " + user.lastName}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Email:</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">{user.email}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Phone:</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">{user.phone}</Typography>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         )}
//       </form>
//     </div>
//   )
// }
