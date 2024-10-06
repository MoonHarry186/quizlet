import Image from "next/image";

const getCourses = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Courses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function Home() {
  const data = await getCourses();
  console.log(data);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    Home
    </div>
  );
}
