import fProfile from "./img/femaleProfile.jpg";
import mProfile from "./img/maleProfile.jpg";

const TeamMemberCard = ({ em, handleEmployeeClick, selectedTeam }) => {
  return (
    // indvidual card :
    //if the employee's teamName property === eaqual selecteTeam
    // ensure that a css class named standout is refernced in the relevant div element
    // in the relevant div element
    //klo property teamName === selectedTeam values
    <div
      key={em.id}
      id={em.id}
      className={em.teamName === selectedTeam ? "card m-2 standout" : "card m-2 "}
      style={{ cursor: "pointer" }}
      onClick={handleEmployeeClick}
    >
      {em.gender === "male" ? (
        <img src={mProfile} className="card-img-top" />
      ) : (
        <img src={fProfile} className="card-img-top" />
      )}
      <div className="card-body">
        <h5 className="card-title">Full Name: {em.fullName} </h5>
        <p className="card-text">
          <b> Designation </b>
          {em.designation}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
