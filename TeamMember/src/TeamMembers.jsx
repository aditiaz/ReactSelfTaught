import TeamMemberCard from "./TeamMemberCard";

const TeamMembers = ({ ems, handleEmployeeClick, selectedTeam }) => {
  return ems.map((el) => (
    <TeamMemberCard em={el} handleEmployeeClick={handleEmployeeClick} selectedTeam={selectedTeam} />
  ));
};

export default TeamMembers;
