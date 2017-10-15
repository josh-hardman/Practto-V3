import React, { Component } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from '../utils/utils'
import Menu from "react-icons/lib/md/menu";
import Clear from "react-icons/lib/md/clear";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
    width: 100%;
    // background: grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${toRem(32)};
`

const Logo = styled.img`
    width: 100px;
    margin: 0;
`

const StyledMenu = styled(Menu) `
    color: ${theme.white};
    transition: all .3s ease;
    visibility: ${props => props.hide && 'hidden'};

    &:hover {
        color: ${theme.darkBlue};
    }

    &:active {
        color: ${theme.lightRed};
    }
`

const DropDown = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(255,255,255,.9);
    z-index: 4;
`

const CloseWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 8px;
`

const CloseButton = styled(Clear) `
    color: ${theme.textBlack};

    &:hover {
        cursor: pointer;
    }
`

const MenuList = styled.ul`
    margin: 0;
    list-style: none;
    padding: 18px;
`

const MenuItem = styled.li`
    margin: ${toRem(12)} 0;
    text-align: center;
    font-size: ${toRem(18)};
    font-weight: lighter;
    color: ${theme.textBlack};
`

const StyledLink = styled(Link) `
    color: ${theme.textBlack};
    text-decoration: none;

    &:hover {
       color: ${theme.textHoverBlack};
    }
`

class Header extends Component {
    state = {
        open: true
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    handleClick = e => {
        this.state.open && !this.node.contains(e.target) &&
            this.setState({ open: false })
    }

    handleToggleMenu = () => this.setState({
        open: !this.state.open
    })

    render() {
        return (
            <StyledHeader >
                <Logo src="dentto_logo.svg" />
                <StyledMenu hide={this.state.open} onClick={this.handleToggleMenu} size={32} />
                {
                    this.state.open &&
                    <div ref={node => this.node = node}>
                        <DropDown>
                            <CloseWrapper>
                                <CloseButton size={32} onClick={this.handleToggleMenu} />
                            </CloseWrapper>
                            <MenuList>
                                <MenuItem>
                                    <StyledLink to="/about">
                                        About
                                </StyledLink>
                                </MenuItem>
                                <MenuItem>
                                    <StyledLink to="/contact">
                                        Contact
                                </StyledLink>
                                </MenuItem>
                                <MenuItem>
                                    <StyledLink to="/get-listed">
                                        Get Listed
                                </StyledLink>
                                </MenuItem>
                            </MenuList>
                        </DropDown>
                    </div>
                }
            </StyledHeader>
        )
    }
}

export default Header;