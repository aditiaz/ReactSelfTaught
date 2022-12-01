import Teams from "./Teams";
import TeamMembers from "./TeamMembers";

const Employees = ({ em, selectedTeam, handleEmployeeClick, handleTeam }) => {
  return (
    <main className="container">
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-6">
          <Teams selectedTeam={selectedTeam} handleTeam={handleTeam} />
        </div>
      </div>
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-8">
          <div className="card-collection">
            <TeamMembers
              ems={em}
              handleEmployeeClick={handleEmployeeClick}
              selectedTeam={selectedTeam}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Employees;
