import styled, { css } from "styled-components";

const Heading = styled.h1`
${(props)=>props.as==='h1' && css`
font-size:20px;
font-weight:600;
`
}
${(props) => props.as ==='h2' && css`
font-size:18px;
font-weight:500;
`}
${(props) => props.as ==='h3' && css`
font-size:16px;
font-weight:400;
`}
line-height:1.4;
`;

export default Heading;
// now this as is a special prop provided by styled components which allows us to change the underlying html element that is being rendered without changing the styles applied to it.
// without it all headings were h1 if we inspect , so it is good for SEO and tagging purposes to have proper heading tags.