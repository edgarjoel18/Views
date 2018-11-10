import React from "react";
import NavToggle from "./nav-toggle";
import SideNav from "./side-nav";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    }
  }

  /**
   * Close the drawer
   */
  closeDrawer() {
    this.setState(state => {
      return {
        ...state,
        isOpen: false,
      }
    });
  }

  /**
   * Open the drawer
   */
  openDrawer() {
    this.setState(state => {
      return {
        ...state,
        isOpen: true,
      }
    });
  }

  render() {
    return (
      <div>
        <SideNav isOpen={this.state.isOpen} onClick={() => this.closeDrawer()} />
        <NavToggle onClick={() => this.openDrawer()}/>
        <div class="pos-f-t">
          <div class="collapse" id="navbarToggleExternalContent">
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
      </div>
    );
  }
}
