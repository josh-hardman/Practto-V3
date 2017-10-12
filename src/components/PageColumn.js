import React from "react";
import styled from "styled-components";
import { toRem } from "../utils/utils";
import breakpoints from "../theme/breakpoints";

const PageColumnWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const PageColumnInner = styled.div`
    max-width: ${breakpoints._840};
    width: 100%;
`

const PageColumn = ({ children }) => (
    <PageColumnWrapper>
        <PageColumnInner>
            {children}
        </PageColumnInner>
    </PageColumnWrapper>
);

export default PageColumn;
