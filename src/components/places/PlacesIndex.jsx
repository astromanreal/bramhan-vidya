import { Link } from "react-router-dom";
import "./Places.css";
import * as img from "./img/exports";
import PlaceFeed from "./PlaceFeed";

export default function PlacesIndex() {
  const placeList = [
    {
      title: "Ashta Veeratta Sthalams",
      path: "ashta-veeratta-sthalams",
      image: img.ashta_veeratta_sthalams_img,
    },
    {
      title: "Ashtavinayaka",
      path: "ashta-vinayaka",
      image: img.ashtavinayaka_img,
    },
    {
      title: "chakra Vaishnava temple",
      path: "chakra-vaishnava",
      image: img.chakra_vaishnava_img,
    },
    {
      title: "Char Dham",
      path: "char-dham",
      image: img.char_dham_img,
    },
    {
      title: "Chota Char Dham",
      path: "chota-char-dham",
      image: img.chota_char_dham_img,
    },
    {
      title: "Divya Desam",
      path: "divya-desam",
      image: img.divya_desham_img,
    },
    {
      title: "12 jyotrilinga",
      path: "jyotrilinga",
      image: img.jyotrilinga_img,
    },
    {
      title: "Maha Shakti Pitha",
      path: "maha-shakti-pitha",
      image: img.maha_shakti_peeth_img,
    },
    {
      title: "Natchathara",
      path: "natchathara",
      image: img.natchathara_temple_img,
    },
    {
      title: "Navagraha Temple",
      path: "navagraha",
      image: img.navagraha_temple_img,
    },
    {
      title: "Pancharama Kshetra",
      path: "pancharama-kshetra",
      image: img.pancharama_kshetra_img,
    },
    {
      title: "Pancha Sabhi",
      path: "pancha-sabhi",
      image: img.pancha_sabhi_img,
    },
    {
      title: "Panch Bhuta Sthalam",
      path: "panch-bhuta-sthalam",
      image: img.panch_bhuta_sthalam_img,
    },
    {
      title: "Panch Kedar",
      path: "panch-kedar",
      image: img.panch_kedar_img,
    },
    {
      title: "Panch Prayag",
      path: "panch-prayag",
      image: img.panch_prayag_img,
    },
    {
      title: "Parasurama Shiva",
      path: "parasurama-shiva",
      image: img.parasurama_shiva_img,
    },
    {
      title: "Sapt Puri",
      path: "sapt-puri",
      image: img.sapt_puri_img,
    },
    {
      title: "Shakti Peeth",
      path: "shakti-peeth",
      image: img.shakti_peeth_img,
    },
    {
      title: "Swayambhu Vishnu",
      path: "swayambhu-vishnu",
      image: img.swayambhu_vishnu_img,
    },
  ];

  return (
    <>
      <header id="places-img-header">
        <div className="places-overlay">
          <h1>Places in Hinduism</h1>
          <p>
            Explore the sacred and historic places from Hindu mythology. This
            collection includes temples, stalams, and more, each with unique
            stories and attributes that enrich the tapestry of Hindu beliefs and
            traditions.
          </p>
        </div>
      </header>
      <PlaceFeed />
      <div id="places-page-list">
        {placeList.map((p) => (
          <div key={p.path} id="places-page-card">
            <Link to={p.path}>
              <img src={p.image} alt={p.title} id="clickable-img" />
              <h2>{p.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
