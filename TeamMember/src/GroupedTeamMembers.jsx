import { useState } from "react";

const GroupedTeamMembers = ({ employees, selectedTeam, setTeam }) => {
  const [groupedEmployees, setGroupedData] = useState(groupTeamMembers());

  // this function will return an array of objects
  // that will be the default state stored in the groupedEmployees Array

  // this function tranforms the list of employees object stored in the employees array
  // and group the employees into their appropiate team based on the team name
  // property value for each employee object

  function groupTeamMembers() {
    let teams = [];

    let teamAMembers = employees.filter((em) => em.teamName === "TeamA");
    let teamA = {
      team: "TeamA",
      members: teamAMembers,
      collapsed: selectedTeam === "TeamA" ? false : true,
    };
    teams.push(teamA);

    let teamBMembers = employees.filter((em) => em.teamName === "TeamB");
    let teamB = {
      team: "TeamB",
      members: teamBMembers,
      collapsed: selectedTeam === "TeamB" ? false : true,
    };
    teams.push(teamB);

    let teamCMembers = employees.filter((em) => em.teamName === "TeamC");
    let teamC = {
      team: "TeamC",
      members: teamCMembers,
      collapsed: selectedTeam === "TeamC" ? false : true,
    };
    teams.push(teamC);

    let teamDMembers = employees.filter((em) => em.teamName === "TeamD");
    let teamD = {
      team: "TeamD",
      members: teamDMembers,
      collapsed: selectedTeam === "TeamD" ? false : true,
    };
    teams.push(teamD);

    return teams;
  }

  const handleTeamClick = (e) => {
    let transformedGroupData = groupedEmployees.map((groupedData) =>
      // jika property team sama dengan id target yg idnya juga berupa team maka
      groupedData.team === e.currentTarget.id
        ? // di bawah kaya fungsi toggle :
          { ...groupedData, collapsed: !groupedData.collapsed }
        : groupedData
    );
    setGroupedData(transformedGroupData);
    setTeam(e.currentTarget.id);
  };
  return (
    <main className="container">
      {groupedEmployees.map((item) => {
        return (
          <div key={item.team} className="card mt-2" style={{ cursor: "pointer" }}>
            <h4
              id={item.team}
              className="card-header text-secondary bg-green"
              onClick={handleTeamClick}
            >
              Team Name : {item.team}
            </h4>
            {/* jika class collapse dihapus maka akan kebawah dan mendisplay anggota team */}
            <div id={"collapse_" + item.team} className={item.collapsed === true ? "collapse" : ""}>
              <hr />
              {item.members.map((member) => {
                return (
                  <div className="mt-2">
                    <h5 className="card-tittle mt-2">
                      <span className="text-dark">Full Name : {member.fullName}</span>
                    </h5>
                    <p>Designation: {member.designation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default GroupedTeamMembers;
