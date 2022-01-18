import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomButton from "../../components/custom-button/custom-button.component";
import {
  selectGroupError,
  selectGroups,
} from "../../redux/group/group.selectors";
import GroupCard from "../../components/groupCard/groupCard.component";
import GroupAddCard from "../../components/groupAddCard/groupAddCard.component";
import ErrMessage from "../../components/errMessage/errMessage.component";

import "./groupsPage.styles.css";

// class GroupsPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
// }

const GroupsPage = ({ groups, groupError }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="groupsPage-overlay">
      <div className="title">Group Details</div>
      {groupError ? <ErrMessage message={groupError} /> : <br></br>}
      {groups.map((group) => (
        <GroupCard
          style={{ background: "green", textAlign: "center" }}
          key={group._id}
          group={group}
        />
      ))}
      {!isOpen && (
        <CustomButton onClick={() => setIsOpen(true)}>Add</CustomButton>
      )}
      {isOpen && <GroupAddCard onClose={() => setIsOpen(false)} />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  groups: selectGroups,
  groupError: selectGroupError,
});

export default connect(mapStateToProps)(GroupsPage);
