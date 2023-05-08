import CustomizedTables from "../CustomizedTables";

const TeacherDash = () => {
  function createData(ID, Nom, Prenom, Username,Email) {
    return { ID, Nom, Prenom, Username,Email };
  }
  const rows = [
    createData(0, "Ben Salah", "Mounir", "6.0, 24", 4.0),
    createData(1, "Hawala", "Salah", "9.0, 37", 4.3),
    createData(2, "Hmila", "Red3i"," 16.0, 24", 6.0),
    createData(3, "Charada", "Yessine", "3.7, 67", 4.3),
    createData(4, "Hajri", "Kais", "16.0, 49", 3.9),
  ];
  const headers = ["ID", "Nom", "Prenom",  "Username","Email"];
  return (
    <div>
      <h1>Teachers Dashboard</h1>
      <CustomizedTables rows={rows} headers={headers}></CustomizedTables>
    </div>
  );
};
export default TeacherDash;
