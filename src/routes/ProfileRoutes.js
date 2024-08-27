import { Route } from "react-router-dom";

import AddCelestial from "../components/profiles/celestial/Addcelestial";
import CelestialDetails from "../components/profiles/celestial/CelestialDetails";
import CelestialIndex from "../components/profiles/celestial/CelestialIndex";
import UpdateCelestial from "../components/profiles/celestial/UpdateCelestial";
import Addchiranjivi from "../components/profiles/chiranjivi/Addchiranjivi";
import ChiranjiviDetails from "../components/profiles/chiranjivi/ChiranjiviDetails";
import ChiranjiviIndex from "../components/profiles/chiranjivi/ChiranjiviIndex";
import UpdateChiranjivi from "../components/profiles/chiranjivi/UpdateChiranjivi";
import AddCreature from "../components/profiles/creature/Addcreature";
import CreatureDetails from "../components/profiles/creature/CreatureDetails";
import CreatureIndex from "../components/profiles/creature/CreatureIndex";
import UpdateCreature from "../components/profiles/creature/UpdateCreature";
import AddDemon from "../components/profiles/demon/Adddemon";
import DemonDetails from "../components/profiles/demon/DemonDetails";
import DemonIndex from "../components/profiles/demon/DemonIndex";
import UpdateDemon from "../components/profiles/demon/UpdateDemon";
import AddGanesh from "../components/profiles/ganesha/Addganesha";
import GaneshDetails from "../components/profiles/ganesha/GaneshaDetails";
import GaneshaIndex from "../components/profiles/ganesha/GaneshaIndex";
import UpdateGanesha from "../components/profiles/ganesha/UpdateGanesha";
import AddGod from "../components/profiles/god/Addgod";
import GodDetails from "../components/profiles/god/GodDetails";
import GodIndex from "../components/profiles/god/GodIndex";
import UpdateGod from "../components/profiles/god/UpdateGod";
import Addgoddess from "../components/profiles/goddess/Addgoddess";
import GoddessDetails from "../components/profiles/goddess/GoddessDetails";
import GoddessIndex from "../components/profiles/goddess/GoddessIndex";
import UpdateGoddess from "../components/profiles/goddess/UpdateGoddess";
import AddMahabharata from "../components/profiles/mahabharat/Addmahabharat";
import MahabharatDetails from "../components/profiles/mahabharat/MahabharatDetails";
import MahabharataIndex from "../components/profiles/mahabharat/MahabharatIndex";
import UpdateMahabharat from "../components/profiles/mahabharat/UpdateMahabharat";
import AddMahavidya from "../components/profiles/mahavidya/Addmahavidya";
import MahavidyaDetails from "../components/profiles/mahavidya/MahavidyaDetails";
import MahavidyaIndex from "../components/profiles/mahavidya/MahavidyaIndex";
import UpdateMahavidya from "../components/profiles/mahavidya/UpdateMahavidya";
import AddModern from "../components/profiles/modern/Addmodern";
import ModernDetails from "../components/profiles/modern/ModernDetails";
import ModernIndex from "../components/profiles/modern/ModernIndex";
import UpdateModern from "../components/profiles/modern/UpdateModern";
import AddNaga from "../components/profiles/naga/Addnaga";
import NagaDetails from "../components/profiles/naga/NagaDetails";
import NagaIndex from "../components/profiles/naga/NagaIndex";
import UpdateNaga from "../components/profiles/naga/UpdateNaga";
import Addnavagraha from "../components/profiles/navagraha/Addnavagraha";
import NavagrahaDetails from "../components/profiles/navagraha/NavagrahaDetails";
import NavagrahaIndex from "../components/profiles/navagraha/NavagrahaIndex";
import UpdateNavagraha from "../components/profiles/navagraha/UpdateNavagraha";
import Adddurga from "../components/profiles/navdurga/Adddurga";
import DurgaDetails from "../components/profiles/navdurga/DurgaDetails";
import DurgaIndex from "../components/profiles/navdurga/DurgaIndex";
import UpdateDurga from "../components/profiles/navdurga/UpdateDurga";
import AddRamayana from "../components/profiles/ramayana/Addramayana";
import RamayanaDetails from "../components/profiles/ramayana/RamayanaDetails";
import RamayanaIndex from "../components/profiles/ramayana/RamayanaIndex";
import UpdateRamayana from "../components/profiles/ramayana/UpdateRamayana";
import RishiIndex from "../components/profiles/rishi/RishiIndex";
import Addrishi from "../components/profiles/rishi/Addrishi";
import RishiDetails from "../components/profiles/rishi/RishiDetails";
import UpdateRishi from "../components/profiles/rishi/UpdateRishi";
import Addshakti from "../components/profiles/shakti/Addshakti";
import ShaktiDetails from "../components/profiles/shakti/ShaktiDetails";
import ShaktiIndex from "../components/profiles/shakti/ShaktiIndex";
import UpdateShakti from "../components/profiles/shakti/UpdateShakti";
import Addshiva from "../components/profiles/shiva/Addshiva";
import ShivaDetails from "../components/profiles/shiva/ShivaDetails";
import ShivaIndex from "../components/profiles/shiva/ShivaIndex";
import UpdateShiva from "../components/profiles/shiva/UpdateShiva";
import Addvanar from "../components/profiles/vanar/Addvanar";
import UpdateVanar from "../components/profiles/vanar/UpdateVanar";
import VanarDetails from "../components/profiles/vanar/VanarDetails";
import VanarIndex from "../components/profiles/vanar/VanarIndex";
import Addvishnu from "../components/profiles/vishnu/Addvishnu";
import UpdateVishnu from "../components/profiles/vishnu/UpdateVishnu";
import VishnuDetails from "../components/profiles/vishnu/VishnuDetails";
import VishnuIndex from "../components/profiles/vishnu/VishnuIndex";

const ProfileRoutes = [
  // Rishis
  <Route key="rishi-index" path="profile/rishi" element={<RishiIndex />} />,
  <Route
    key="add-rishi"
    path="profile/rishi/add-rishi"
    element={<Addrishi />}
  />,
  <Route
    key="rishi-details"
    path="profile/rishi/:id"
    element={<RishiDetails />}
  />,
  <Route
    key="update-rishi"
    path="profile/rishi/update/:id"
    element={<UpdateRishi />}
  />,

  // Gods
  <Route key="god-index" path="profile/god" element={<GodIndex />} />,
  <Route key="add-god" path="profile/god/add-god" element={<AddGod />} />,
  <Route key="god-details" path="profile/god/:id" element={<GodDetails />} />,
  <Route
    key="update-god"
    path="profile/god/update/:id"
    element={<UpdateGod />}
  />,

  // Goddess
  <Route
    key="goddess-index"
    path="profile/goddess"
    element={<GoddessIndex />}
  />,
  <Route
    key="add-goddess"
    path="profile/goddess/add-goddess"
    element={<Addgoddess />}
  />,
  <Route
    key="goddess-details"
    path="profile/goddess/:id"
    element={<GoddessDetails />}
  />,
  <Route
    key="update-goddess"
    path="profile/goddess/update/:id"
    element={<UpdateGoddess />}
  />,

  // Nagas
  <Route key="naga-index" path="profile/naga" element={<NagaIndex />} />,
  <Route key="add-naga" path="profile/naga/add-naga" element={<AddNaga />} />,
  <Route
    key="naga-details"
    path="profile/naga/:id"
    element={<NagaDetails />}
  />,
  <Route
    key="update-naga"
    path="profile/naga/update/:id"
    element={<UpdateNaga />}
  />,

  // Celestial Beings
  <Route
    key="celestial-index"
    path="profile/celestial"
    element={<CelestialIndex />}
  />,
  <Route
    key="add-celestial"
    path="profile/celestial/add-celestial"
    element={<AddCelestial />}
  />,
  <Route
    key="celestial-details"
    path="profile/celestial/:id"
    element={<CelestialDetails />}
  />,
  <Route
    key="update-celestial"
    path="profile/celestial/update/:id"
    element={<UpdateCelestial />}
  />,

  // Creature
  <Route
    key="creature-index"
    path="profile/creature"
    element={<CreatureIndex />}
  />,
  <Route
    key="add-creature"
    path="profile/creature/add-creature"
    element={<AddCreature />}
  />,
  <Route
    key="creature-details"
    path="profile/creature/:id"
    element={<CreatureDetails />}
  />,
  <Route
    key="update-creature"
    path="profile/creature/update/:id"
    element={<UpdateCreature />}
  />,

  // Demons
  <Route key="demon-index" path="profile/demon" element={<DemonIndex />} />,
  <Route
    key="add-demon"
    path="profile/demon/add-demon"
    element={<AddDemon />}
  />,
  <Route
    key="demon-details"
    path="profile/demon/:id"
    element={<DemonDetails />}
  />,
  <Route
    key="update-demon"
    path="profile/demon/update/:id"
    element={<UpdateDemon />}
  />,

  // Modern
  <Route key="modern-index" path="profile/modern" element={<ModernIndex />} />,
  <Route
    key="add-modern"
    path="profile/modern/add-modern"
    element={<AddModern />}
  />,
  <Route
    key="modern-details"
    path="profile/modern/:id"
    element={<ModernDetails />}
  />,
  <Route
    key="update-modern"
    path="profile/modern/update/:id"
    element={<UpdateModern />}
  />,

  // Vanar
  <Route key="vanar-index" path="profile/vanara" element={<VanarIndex />} />,
  <Route
    key="add-vanar"
    path="profile/vanara/add-vanar"
    element={<Addvanar />}
  />,
  <Route
    key="vanar-details"
    path="profile/vanara/:id"
    element={<VanarDetails />}
  />,
  <Route
    key="update-vanar"
    path="profile/vanara/update/:id"
    element={<UpdateVanar />}
  />,

  // Shakti
  <Route key="shakti-index" path="profile/shakti" element={<ShaktiIndex />} />,
  <Route
    key="add-shakti"
    path="profile/shakti/add-shakti"
    element={<Addshakti />}
  />,
  <Route
    key="shakti-details"
    path="profile/shakti/:id"
    element={<ShaktiDetails />}
  />,
  <Route
    key="update-shakti"
    path="profile/shakti/update/:id"
    element={<UpdateShakti />}
  />,

  // Chiranjivi
  <Route
    key="chiranjivi-index"
    path="profile/chiranjivi"
    element={<ChiranjiviIndex />}
  />,
  <Route
    key="add-chiranjivi"
    path="profile/chiranjivi/add-chiranjivi"
    element={<Addchiranjivi />}
  />,
  <Route
    key="chiranjivi-details"
    path="profile/chiranjivi/:id"
    element={<ChiranjiviDetails />}
  />,
  <Route
    key="update-chiranjivi"
    path="profile/chiranjivi/update/:id"
    element={<UpdateChiranjivi />}
  />,

  // Vishnu
  <Route key="vishnu-index" path="profile/vishnu" element={<VishnuIndex />} />,
  <Route
    key="add-vishnu"
    path="profile/vishnu/add-vishnu"
    element={<Addvishnu />}
  />,
  <Route
    key="vishnu-details"
    path="profile/vishnu/:id"
    element={<VishnuDetails />}
  />,
  <Route
    key="update-vishnu"
    path="profile/vishnu/update/:id"
    element={<UpdateVishnu />}
  />,

  // Shiva
  <Route key="shiva-index" path="profile/shiva" element={<ShivaIndex />} />,
  <Route
    key="add-shiva"
    path="profile/shiva/add-shiva"
    element={<Addshiva />}
  />,
  <Route
    key="shiva-details"
    path="profile/shiva/:id"
    element={<ShivaDetails />}
  />,
  <Route
    key="update-shiva"
    path="profile/shiva/update/:id"
    element={<UpdateShiva />}
  />,

  // Nav Durga
  <Route key="durga-index" path="profile/durga" element={<DurgaIndex />} />,
  <Route
    key="add-durga"
    path="profile/durga/add-durga"
    element={<Adddurga />}
  />,
  <Route
    key="durga-details"
    path="profile/durga/:id"
    element={<DurgaDetails />}
  />,
  <Route
    key="update-durga"
    path="profile/durga/update/:id"
    element={<UpdateDurga />}
  />,

  // Navagraha
  <Route
    key="navagraha-index"
    path="profile/navagraha"
    element={<NavagrahaIndex />}
  />,
  <Route
    key="add-navagraha"
    path="profile/navagraha/add-navagraha"
    element={<Addnavagraha />}
  />,
  <Route
    key="navagraha-details"
    path="profile/navagraha/:id"
    element={<NavagrahaDetails />}
  />,
  <Route
    key="update-navagraha"
    path="profile/navagraha/update/:id"
    element={<UpdateNavagraha />}
  />,

  // Ganesha
  <Route
    key="ganesha-index"
    path="profile/ganesha"
    element={<GaneshaIndex />}
  />,
  <Route
    key="add-ganesha"
    path="profile/ganesha/add-ganesha"
    element={<AddGanesh />}
  />,
  <Route
    key="ganesha-details"
    path="profile/ganesha/:id"
    element={<GaneshDetails />}
  />,
  <Route
    key="update-ganesha"
    path="profile/ganesha/update/:id"
    element={<UpdateGanesha />}
  />,

  // Ramayana
  <Route
    key="ramayana-index"
    path="profile/ramayana"
    element={<RamayanaIndex />}
  />,
  <Route
    key="add-ramayana"
    path="profile/ramayana/add-ramayana"
    element={<AddRamayana />}
  />,
  <Route
    key="ramayana-details"
    path="profile/ramayana/:id"
    element={<RamayanaDetails />}
  />,
  <Route
    key="update-ramayana"
    path="profile/ramayana/update/:id"
    element={<UpdateRamayana />}
  />,

  // Mahabharat
  <Route
    key="mahabharat-index"
    path="profile/mahabharat"
    element={<MahabharataIndex />}
  />,
  <Route
    key="add-mahabharat"
    path="profile/mahabharat/add-mahabharat"
    element={<AddMahabharata />}
  />,
  <Route
    key="mahabharat-details"
    path="profile/mahabharat/:id"
    element={<MahabharatDetails />}
  />,
  <Route
    key="update-mahabharat"
    path="profile/mahabharat/update/:id"
    element={<UpdateMahabharat />}
  />,

  //   mahavidya
  <Route
    key="mahavidya-index"
    path="profile/mahavidya"
    element={<MahavidyaIndex />}
  />,
  <Route
    key="mahavidya-add"
    path="profile/mahavidya/add-mahavidya"
    element={<AddMahavidya />}
  />,
  <Route
    key="mahavidya-details"
    path="profile/mahavidya/:id"
    element={<MahavidyaDetails />}
  />,
  <Route
    key="mahavidya-update"
    path="profile/mahavidya/update/:id"
    element={<UpdateMahavidya />}
  />,
];

export default ProfileRoutes;
