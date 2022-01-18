import React from "react";

import "./groupAddCard.styles.css";
import { connect } from "react-redux";
import { createGroupStart } from "../../redux/group/group.actions";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import FormInputTextArea from "../form-input-textarea/form-input-textarea.component";

class GroupAddCard extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      members: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, members } = this.state;
    members = members.split(";");
    members.map((m) => m.trim());
    console.log(members);

    if (name === "" || members.length === 0) {
      alert("make sure to fill up both the name and members");
      return;
    }

    this.props.createGroupStart({ name, members });
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    return (
      <div className="groupAddCard-container">
        <div className="title" style={{ fontSize: "30px" }}>
          Add a Group.
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
            Enter the emails of all the members, seperating each email with a ;
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
            style={{ backgroundColor: "#40C94E", marginRight: "10px" }}
          >
            Create
          </CustomButton>
          <CustomButton type="button" onClick={onClose}>
            Cancel
          </CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createGroupStart: (group) => dispatch(createGroupStart(group)),
});

export default connect(null, mapDispatchToProps)(GroupAddCard);
