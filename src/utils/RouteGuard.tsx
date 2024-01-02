// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useToast } from '@chakra-ui/react'

// import { authService } from '@/services/authService';
// import Sidebar from '@/components/Sidebar';
// import Loader from '@/components/Loader';
// import axios from 'axios';
// import { userDataAtom } from '@/lib/atoms';
// import { useAtom } from 'jotai';
// import { getUserData } from './user/get';

// const RouteGuard = ({ children }: { children: React.ReactNode }) => {
//     const toast = useToast()
//     const router = useRouter();
//     const [authorized, setAuthorized] = useState(false);
//     const [userData, setUserData] = useAtom(userDataAtom);
   
//     const authCheck = async (url: string) => {
//         const publicPaths = ['/login'];
//         const path = url.split('?')[0];

//         const user = authService.getUser()
//         if (user?.uid) {
//             const data = await getUser(user.uid)
//             setUserData(data)
//         }

//         // redirect to login page if accessing a private page and not logged in 
//         if (!!!user && !publicPaths.includes(path)) {
//             setAuthorized(false);
//             router.push({
//                 pathname: '/login',
//                 query: { returnUrl: router.asPath }
//             });
//         } else {
//             setAuthorized(true);
//         }
//     }

//     const getUser = async (uid: String) => {
//         try {
//             const data  = getUserData(uid)

//             return data
//         } catch (error) {
//             toast({
//                 title: 'Erro ao carregar dados do usuário',
//                 description: 'error',
//                 variant: 'subtle',
//                 status: 'error',
//                 isClosable: true,
//             })
//         }
//     }

//     useEffect(() => {
//         // on initial load - run auth check 
//         authCheck(router.asPath);

//         // // on route change start - hide page content by setting authorized to false  
//         const hideContent = () => setAuthorized(false);
//         router.events.on('routeChangeStart', hideContent);

//         // // // on route change complete - run auth check 
//         router.events.on('routeChangeComplete', authCheck)

//         // // // unsubscribe from events in useEffect return function
//         return () => {
//             router.events.off('routeChangeStart', hideContent);
//             router.events.off('routeChangeComplete', authCheck);
//         }

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     // return <>{authorized ? <Sidebar> {children} </Sidebar> : <Loader />}</>
//     return <><Sidebar>{authorized ?  children : <Loader/>}</Sidebar></>

// }

// export default RouteGuard