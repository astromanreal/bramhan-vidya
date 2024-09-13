import "./Page.css";

const images = [
  {
    original: "https://i.postimg.cc/TPSnr1vL/maa-durga.webp",
    thumbnail: "https://i.postimg.cc/TPSnr1vL/maa-durga.webp",
  },
  {
    original: "https://i.postimg.cc/FRL3GvhP/maa-parvati.jpg",
    thumbnail: "https://i.postimg.cc/FRL3GvhP/maa-parvati.jpg",
  },
];

export default function Page() {
  return (
    <>
      <div id="gallery" className="gallery"></div>
    </>
  );
}
