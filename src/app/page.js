import Home from "./(components)/Home";
export default async function HomePage() {
  const res = await fetch('http://localhost:3000/api/Courses');
  const data = await res.json();
  const isLogin = true;
  return (
    <>
      <Home data={data.courses}/>
    </>
  );
}
