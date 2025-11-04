import styled, { css } from "styled-components";

const Row = styled.div`
    display:flex;
    ${(props) => props.type === 'horizontal' && css`
    justify-content:space-between;
    align-items:center;
    `
    }

    ${(props) => props.type === 'vertical' && css`
        flex-direction:column;
        gap:1.6 rem;
    `}

`;


// one thing we can do here is to set default props
Row.defaultProps={
    type:'horizontal'
}

//now there is no need to pass horizantal prop, bidefault it will be horizontal
export default Row;