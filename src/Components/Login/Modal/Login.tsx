import React from 'react';

const Login: React.FC = () => {
    return (
     <div>
         Login
     </div>
    );
}
  
export default Login;




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { IUserData } from '../../SmallProductCard/SmallProductCard';
// // import * as P from "./parts";

// const Login: React.FC = () => {
//     const [allUsers, setAllUsers] = useState<IUserData[]>([]);
    
//     useEffect(() => {
//         const getUser = async () => {
//             const { user } = await axios.get<IUserData[]>('https://fakestoreapi.com/users');
//             setAllUsers(user);
//         };
      
//         getUser();
//       }, []);
      
//     return (
//     // <P.UserDataWrapper>
//     //    {allUsers.map((x, id) => (
//     //         <div>
//     //         <SmallProductCard 
//     //             key={id+x.title} 
//     //             user={x} 
//     //         />
//     //         </div>
//     //    ))}
//     // </P.UserDataWrapper>
//     )
// }
  
// export default Login;
