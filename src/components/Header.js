import React, { Component } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import { toRem } from "../utils/utils";
import Menu from "react-icons/lib/md/menu";
import Clear from "react-icons/lib/md/clear";
import { Link } from "react-router-dom";
import breakpoints from "../theme/breakpoints";

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${toRem(32)};
  padding-right: ${toRem(32)};
  padding-top: ${toRem(32)};
`;

const Logo = styled.img`
  width: 100px;
  margin: 0;
`;

const StyledMobileMenu = styled(Menu)`
  color: ${theme.textBlack};
  transition: all 0.3s ease;

  @media screen and (min-width: ${breakpoints._480}) {
    display: none;
  }

  &:hover {
    color: ${theme.textHoverBlack};
  }

  &:active {
    color: ${theme.lightRed};
  }
`;

const StyledDesktopMenu = styled.ul`
  color: ${theme.textBlack};
  transition: all 0.3s ease;
  display: none;
  float: right;
  margin: 0;
  padding: 0;

  @media screen and (min-width: ${breakpoints._480}) {
    display: block;
  }
`;

const DesktopNavItem = styled.li`
  padding: ${toRem(8)};
  font-weight: lighter;
  margin: 0;
  display: inline-block;
  color: ${theme.textBlack};

  &:hover {
    color: ${theme.textHoverBlack};
  }

  &:active {
    color: ${theme.lightRed};
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: ${theme.white};
  z-index: 4;
`;

const CloseWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 8px;
`;

const CloseButton = styled(Clear)`
  color: ${theme.textBlack};

  &:hover {
    cursor: pointer;
  }
`;

const MenuList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 18px;
`;

const MenuItem = styled.li`
  margin: ${toRem(12)} 0;
  text-align: center;
  font-size: ${toRem(18)};
  font-weight: lighter;
  color: ${theme.textBlack};
`;

const StyledLink = styled(Link)`
  color: ${theme.textBlack};
  text-decoration: none;

  &:hover {
    color: ${theme.textHoverBlack};
  }
`;

class Header extends Component {
  state = {
    open: false
  };

  componentWillMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick = e => {
    this.state.open &&
      !this.node.contains(e.target) &&
      this.setState({ open: false });
  };

  handleToggleMenu = () =>
    this.setState({
      open: !this.state.open
    });

  render() {
    const navItems = [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" }
      //   { name: "Contact", url: "/contact" },
      //   { name: "Get Listed", url: "/get-listed" }
    ];

    return (
      <StyledHeader>
        <Link to="/">
          <Logo src="dentto_logo.svg" />
        </Link>
        <StyledDesktopMenu>
          {navItems.map((item, i) => (
            <DesktopNavItem key={i}>
              <StyledLink to={item.url}>{item.name}</StyledLink>
            </DesktopNavItem>
          ))}
        </StyledDesktopMenu>
        <StyledMobileMenu onClick={this.handleToggleMenu} size={32} />
        {this.state.open && (
          <DropDown innerRef={node => (this.node = node)}>
            <CloseWrapper>
              <CloseButton size={32} onClick={this.handleToggleMenu} />
            </CloseWrapper>
            <MenuList>
              {navItems.map((item, i) => (
                <MenuItem key={i}>
                  <StyledLink to={item.url} onClick={this.handleToggleMenu}>
                    {item.name}
                  </StyledLink>
                </MenuItem>
              ))}
            </MenuList>
          </DropDown>
        )}
      </StyledHeader>
    );
  }
}

export default Header;
