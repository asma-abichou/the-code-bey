import CustomizedTables from "../CustomizedTables";

const CourseDash = () => {
  function createData(ID, Title, Category,Duration, Description) {
    return { ID, Title, Category,Duration, Description };
  }
  const rows = [
    createData(0, "React", "Front", "15min","6.0, 24, 4.0"),
    createData(1, "Django", "Back","15min"," 9.0, 37, 4.3"),
    createData(2, "Python", "Programmation", "15min","16.0, 24, 6.0"),
    createData(3, "Flutter", "Mobile", "15min","3.7, 67, 4.3"),
  ];
  const headers = ["ID", "Title","Category","Duration" , "Description"];
  return (
    <div>
      <h1>Courses Dashboard</h1>
      <CustomizedTables rows={rows} headers={headers}></CustomizedTables>
    </div>
  );
};
export default CourseDash;
