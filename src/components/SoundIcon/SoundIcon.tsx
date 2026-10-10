import {
  FiActivity,
  FiFeather,
  FiFileText,
  FiThermometer,
  FiBell,
  FiBookOpen,
  FiCloudRain,
  FiClock,
  FiCoffee,
  FiDisc,
  FiDroplet,
  FiHome,
  FiMusic,
  FiRadio,
  FiSun,
  FiUsers,
  FiVolume2,
  FiWind,
  FiZap,
} from "react-icons/fi";
import { GiBee, GiBubbles, GiCampfire, GiCastle, GiFrog, GiHorseHead, GiPawPrint, GiWaterfall, GiWhaleTail } from "react-icons/gi";
import type { IconType } from "react-icons";
import { SoundIconName } from "../../types";
import type { SoundIconProps } from "./types";

const SOUND_ICONS: Record<SoundIconName, IconType> = {
  [SoundIconName.Animal]: GiPawPrint,
  [SoundIconName.Bee]: GiBee,
  [SoundIconName.Bird]: FiFeather,
  [SoundIconName.BoilingWater]: FiThermometer,
  [SoundIconName.Frog]: GiFrog,
  [SoundIconName.Horse]: GiHorseHead,
  [SoundIconName.Paper]: FiFileText,
  [SoundIconName.Whale]: GiWhaleTail,
  [SoundIconName.Air]: FiWind,
  [SoundIconName.Bell]: FiBell,
  [SoundIconName.Bolt]: FiZap,
  [SoundIconName.Book]: FiBookOpen,
  [SoundIconName.Bubbles]: GiBubbles,
  [SoundIconName.Castle]: GiCastle,
  [SoundIconName.Chime]: FiRadio,
  [SoundIconName.Clock]: FiClock,
  [SoundIconName.Crowd]: FiUsers,
  [SoundIconName.Drop]: FiDroplet,
  [SoundIconName.Fire]: GiCampfire,
  [SoundIconName.Hall]: FiHome,
  [SoundIconName.Leaf]: FiSun,
  [SoundIconName.Moon]: FiVolume2,
  [SoundIconName.Music]: FiMusic,
  [SoundIconName.Rain]: FiCloudRain,
  [SoundIconName.Restaurant]: FiCoffee,
  [SoundIconName.Tone]: FiDisc,
  [SoundIconName.Town]: FiHome,
  [SoundIconName.Wave]: GiWaterfall,
  [SoundIconName.Wild]: FiActivity,
};

const SoundIcon = ({ name }: SoundIconProps) => {
  const Icon = SOUND_ICONS[name];

  return <Icon aria-hidden="true" className="block h-[1.08em] w-[1.08em]" />;
};

export default SoundIcon;
