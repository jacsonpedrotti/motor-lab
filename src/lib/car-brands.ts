import type { SimpleIcon } from "simple-icons";
import {
  siAudi,
  siBmw,
  siChevrolet,
  siCitroen,
  siFiat,
  siFord,
  siHonda,
  siHyundai,
  siJeep,
  siKia,
  siMini,
  siMitsubishi,
  siNissan,
  siPeugeot,
  siPorsche,
  siRam,
  siRenault,
  siSubaru,
  siSuzuki,
  siToyota,
  siVolkswagen,
  siVolvo,
} from "simple-icons";

export type CarBrandEntry = {
  name: string;
  icon: SimpleIcon | "custom";
  customId?: string;
};

/** Marcas de automóveis presentes no mercado brasileiro (passageiros). */
export const CAR_BRANDS: CarBrandEntry[] = [
  { name: "Audi", icon: siAudi },
  { name: "BMW", icon: siBmw },
  { name: "CAOA Chery", icon: "custom", customId: "caoa-chery" },
  { name: "Chery", icon: "custom", customId: "chery" },
  { name: "Citroën", icon: siCitroen },
  { name: "Chevrolet", icon: siChevrolet },
  { name: "Dodge", icon: "custom", customId: "dodge" },
  { name: "Fiat", icon: siFiat },
  { name: "Ford", icon: siFord },
  { name: "Honda", icon: siHonda },
  { name: "Hyundai", icon: siHyundai },
  { name: "JAC", icon: "custom", customId: "jac" },
  { name: "Jaguar", icon: "custom", customId: "jaguar" },
  { name: "Jeep", icon: siJeep },
  { name: "Kia", icon: siKia },
  { name: "Land Rover", icon: "custom", customId: "land-rover" },
  { name: "Lexus", icon: "custom", customId: "lexus" },
  { name: "Mercedes-Benz", icon: "custom", customId: "mercedes" },
  { name: "Mini", icon: siMini },
  { name: "Mitsubishi", icon: siMitsubishi },
  { name: "Nissan", icon: siNissan },
  { name: "Peugeot", icon: siPeugeot },
  { name: "Porsche", icon: siPorsche },
  { name: "RAM", icon: siRam },
  { name: "Renault", icon: siRenault },
  { name: "Subaru", icon: siSubaru },
  { name: "Suzuki", icon: siSuzuki },
  { name: "Toyota", icon: siToyota },
  { name: "Volkswagen", icon: siVolkswagen },
  { name: "Volvo", icon: siVolvo },
];

export type CarBrand = (typeof CAR_BRANDS)[number]["name"];
