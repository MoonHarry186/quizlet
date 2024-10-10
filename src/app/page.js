import Main from "./(components)/Main";


export async function getServerSideProps() {
  // Fetch data from an API or database
  const res = await fetch(`http://localhost:3000/api/Courses/`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}


export default async function HomePage({data}) {
  return (
    <>
      <Main data={data}/>
    </>
  );
}
