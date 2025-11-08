import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries:{
        staleTime:1000*60, // 1minutes
      },
    },
  }
);


function App () {
  return (
    // 2 lets provide query data to our component tree
    <QueryClientProvider client={queryClient}>
      //3 it is first child of QueryClientProvider
      <ReactQueryDevtools initialIsOpen={false}/>
    <GlobalStyles/>
    <BrowserRouter>
    <Routes>
      {/* //!1 we created Applayout and all route components inside App.jsx will be children of it and will be rendered inside outlet */}
   <Route element ={<AppLayout/>}>
      <Route index element={<Navigate replace to ="dashboard"/>}/>
      <Route  path ='dashboard' element={<Dashboard/>}/>
      <Route  path ='account' element={<Account/>}/>
      <Route  path ='bookings' element={<Bookings/>}/>
      <Route  path ='cabins' element={<Cabins/>}/>
      <Route  path ='settings' element={<Settings/>}/>
      <Route  path ='users' element={<Users/>}/>
      </Route>
       <Route  path ='login' element={<Login/>}/>
      <Route  path ='*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
   
  )
}

export default App;