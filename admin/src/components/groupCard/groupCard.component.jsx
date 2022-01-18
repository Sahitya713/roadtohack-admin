import React from "react";

import { Edit, Delete } from "@material-ui/icons";

import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import FormInputTextArea from "../form-input-textarea/form-input-textarea.component";
import FormInput from "../form-input/form-input.component";
// import { createStructuredSelector } from "reselect";

import {
  deleteGroupStart,
  updateGroupStart,
} from "../../redux/group/group.actions";

import "./groupCard.styles.css";

class GroupCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      name: "",
      members: "",
    };
  }
  componentDidMount() {}

  switchToEdit = () => {
    let { name, members } = this.props.group;
    members = members.join(";");
    this.setState({
      name,
      members,
      edit: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { name, members } = this.state;
    members = members.split(";");
    members.map((m) => m.trim());
    const update = {};
    update["name"] = name;
    update["members"] = members;

    this.props.updateGroupStart({
      groupId: this.props.group._id,
      group: update,
    });

    this.setState({ edit: false });
  };

  render() {
    const { name, members, groupCode, _id } = this.props.group;
    return (
      <div
        className="groupCard-container"
        style={{ background: this.state.edit ? "whitesmoke" : "white" }}
      >
        {this.state.edit ? (
          <div>
            <div className="title" style={{ fontSize: "30px" }}>
              Edit Group Details.
            </div>

            <form onSubmit={this.handleSubmit}>
              <FormInput
                name="name"
                value={this.state.name}
                handleChange={this.handleChange}
                label="Group Name:"
                required
              />
              <div>
                Enter the emails of all the members, seperating each email with
                a ;
              </div>
              <FormInputTextArea
                name="members"
                handleChange={this.handleChange}
                label="Members: "
                value={this.state.members}
                rows="5"
                required
              />
              <CustomButton
                type="submit"
                style={{ background: "#40C94E", marginRight: "10px" }}
              >
                Save
              </CustomButton>
              <CustomButton
                type="button"
                onClick={() => {
                  this.setState({ edit: false });
                }}
              >
                Cancel
              </CustomButton>
            </form>
          </div>
        ) : (
          <div className="groupCard-overlay">
            <div className="groupCard-left">
              <div className="groupCard-name">{name}</div>
              <div className="groupCard-subheading">Group Code:</div>
              <div className="groupCard-code">{groupCode}</div>
            </div>
            <div className="groupCard-right">
              <div className="groupCard-buttons">
                {" "}
                <Edit
                  onClick={this.switchToEdit}
                  style={{
                    fontSize: "25px",
                    color: "#40C94E",
                    marginRight: "5px",
                  }}
                />
                <Delete
                  onClick={() => {
                    this.props.deleteGroupStart(_id);
                  }}
                  style={{ fontSize: "25px", color: "red" }}
                />
              </div>

              <div className="groupCard-subheading"> Members: </div>

              <div>
                {members.map((mem, idx) => (
                  <div key={idx}>{mem}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteGroupStart: (groupId) => dispatch(deleteGroupStart(groupId)),
  updateGroupStart: (group) => dispatch(updateGroupStart(group)),
});

export default connect(null, mapDispatchToProps)(GroupCard);
