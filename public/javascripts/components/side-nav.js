import React from "react";

// TODO: Add toggling here
export default class SideNav extends React.Component {

  render() {
    return (
      <div className={"sidenav " + (this.props.isOpen ? 'sidenav--open' : 'sidenav--closed')}>
        <button className="sidenav__close-button" onClick={this.props.onClick}>&times;</button>
        <a className="text-white h4" href="/new-page">
          {" "}
          View News <span className="sr-only">(current)</span>
        </a>
        <a className="text-white h4"> Tech Views </a>
        <a className="text-white h4"> Your Tech </a>
        <a className="text-white h4"> Your View</a>
      </div>
    );
  }
}
