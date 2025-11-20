import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
display:grid;
grid-template-columns: 26rem 1fr ;
grid-template-rows: auto 1fr;
height:100vh;
`
    


const Main = styled.main`
     background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll;
`

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

`
function AppLayout() {
    return (
        <StyledAppLayout>
            <SideBar />
            <Header />
            <Main>
                <Container>
                <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    )
}

export default AppLayout;

// ! 1 we created Applayout and all route components inside App.jsx will be children of it and will be rendered inside outlet
// !2 except the login and pagenotfound components those are outside the layout
//!3 so we warp our routes inside AppLayout in App.jsx file


//now lets create a sidebar on left and headder on top below it will be content

// lets make sidebar left and header up , by using grids