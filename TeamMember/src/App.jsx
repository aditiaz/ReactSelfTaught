import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Employees from "./Employees";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GroupedTeamMembers from "./GroupedTeamMembers";
import Nav from "./Nav";
import NotFound from "./NotFound";

export default function App() {
  //selectedTeam sesuai yang ada di local storage jika belum ada maka teamA
  // penjelasan di atas memakai shortcircuit evaluation
  const [selectedTeam, setTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || "TeamA"
  );

  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employeeList")) || [
      {
        id: 1,
        fullName: "Bob Jones",
        designation: "JavaScript Developer",
        gender: "male",
        teamName: "TeamA",
      },
      {
        id: 2,
        fullName: "Jill Bailey",
        designation: "Node Developer",
        gender: "female",
        teamName: "TeamA",
      },
      {
        id: 3,
        fullName: "Gail Shepherd",
        designation: "Java Developer",
        gender: "female",
        teamName: "TeamA",
      },
      {
        id: 4,
        fullName: "Sam Reynolds",
        designation: "React Developer",
        gender: "male",
        teamName: "TeamB",
      },
      {
        id: 5,
        fullName: "David Henry",
        designation: "DotNet Developer",
        gender: "male",
        teamName: "TeamB",
      },
      {
        id: 6,
        fullName: "Sarah Blake",
        designation: "SQL Server DBA",
        gender: "female",
        teamName: "TeamB",
      },
      {
        id: 7,
        fullName: "James Bennet",
        designation: "Angular Developer",
        gender: "male",
        teamName: "TeamC",
      },
      {
        id: 8,
        fullName: "Jessica Faye",
        designation: "API Developer",
        gender: "female",
        teamName: "TeamC",
      },
      {
        id: 9,
        fullName: "Lita Stone",
        designation: "C++ Developer",
        gender: "female",
        teamName: "TeamC",
      },
      {
        id: 10,
        fullName: "Daniel Young",
        designation: "Python Developer",
        gender: "male",
        teamName: "TeamD",
      },
      {
        id: 11,
        fullName: "Adrian Jacobs",
        designation: "Vue Developer",
        gender: "male",
        teamName: "TeamD",
      },
      {
        id: 12,
        fullName: "Devin Monroe",
        designation: "Graphic Designer",
        gender: "male",
        teamName: "TeamD",
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  const handleTeam = (e) => {
    setTeam(e.target.value);
  };
  // handle untuk add and delete employee terhadap team yg telah di pilih
  const handleEmployeeClick = (e) => {
    const transformedEmployees = employees.map((em) =>
      em.id === +e.currentTarget.id
        ? // jika sudah diklik  dan diklik lagi maka dihapus :
          // em dibikin objek ->let em = {teamName : ''}
          // cth : ->let em = {teamName : 'TeamA'}
          //  ->jika teamName(say TeamA) === TeamA
          // diklik lagi :
          // jika teamName === selectedTeam maka :
          // const ={teamName:TeamA }di hapus value propertinya jadi kosong(teamNAme:'')

          // jika teamName !== selectedTeam alias belum di klik maka :
          // const em ={teamName: ''} jadi const em ={teamName: 'selectedTeam'}
          // maka properti value em(teamName) di hapus jika tidak di tambah
          // bukan dibikin objek teamName,emang udah ada teamName sbg properti nya employye
          em.teamName === selectedTeam
          ? { ...em, teamName: "" }
          : { ...em, teamName: selectedTeam }
        : em
    );
    setEmployees(transformedEmployees);
  };
  // di bawah terjadi props drilling
  return (
    <Router>
      <Nav />
      <Header
        selectedTeam={selectedTeam}
        // memfilter value property employes yang properti teamNamenya sama dengan selected team,ada berapa itulah lenghtnya
        // lalu dia mereturn number(angka) sesuai length kumpulan em.teamName === selectedTeam
        teamMemberCount={employees.filter((em) => em.teamName === selectedTeam).length}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Employees
              em={employees}
              selectedTeam={selectedTeam}
              handleEmployeeClick={handleEmployeeClick}
              handleTeam={handleTeam}
            />
          }
        ></Route>
        {/* route GroupedTeamMembers sebenarnya ngolah data yg di app.jsx cuma dia uinya ga keliatan */}
        <Route
          path="/GroupedTeamMembers"
          element={
            <GroupedTeamMembers
              employees={employees}
              selectedTeam={selectedTeam}
              setTeam={setTeam}
            />
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </Router>
  );
}
