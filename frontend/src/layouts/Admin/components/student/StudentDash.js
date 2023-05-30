import CustomizedTables from "../CustomizedTables";

const StudentDash = () => {
  function createData(ID, Nom, Prenom, Username,Email) {
    return { ID, Nom, Prenom, Username,Email };
  }
  const rows = [
    createData(0, "hawalastudent", "Yessine", "hawala12", 4.0),
    createData(1, "Hawala", "Yessine", "9.0, 37", 4.3),
   
    createData(3, "Asma", "student", "3.7, 67", 4.3),
    createData(4, "hawala", "Mohamed", "16.0, 49", 3.9),
  ];//get lel list lkol mta3 el students 
  const headers = ["ID", "Nom", "Prenom",  "Username","Email"];//tbadalhom haseb el donnees eli bech tjik ha4om houma el headers mta3 tableau
  return (
    <div>
      <h1>Students Dashboard</h1>
      <CustomizedTables rows={rows} headers={headers}></CustomizedTables>
    </div>
  );
};
export default StudentDash;
