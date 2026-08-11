export const WHATSAPP_NUMBER = "5511999999999";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WHATSAPP_LINK = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Olá! Gostaria de solicitar um orçamento."
)}`;

export const WHATSAPP_DISPLAY = "(11) 99999-9999";

export const EMAIL = "contato@motorlab.com.br";

export const ADDRESS = {
  street: "Rua das Oficinas, 847",
  neighborhood: "Vila Industrial",
  city: "São Paulo",
  state: "SP",
  cep: "03100-000",
} as const;

export const ADDRESS_FULL = `${ADDRESS.street} — ${ADDRESS.neighborhood}\n${ADDRESS.city}, ${ADDRESS.state} — CEP ${ADDRESS.cep}`;

export const ADDRESS_LINE = `${ADDRESS.street} — ${ADDRESS.neighborhood}, ${ADDRESS.city} — ${ADDRESS.state}`;

export const MAPS_QUERY = `${ADDRESS.street}, ${ADDRESS.neighborhood}, ${ADDRESS.city}, ${ADDRESS.state}, ${ADDRESS.cep}, Brasil`;

export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export const GOOGLE_MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&hl=pt-BR&z=16&output=embed`;

export const INSTAGRAM_HANDLE = "@motorlab.oficina";

export const INSTAGRAM_URL = "https://www.instagram.com/motorlab.oficina";

export const BUSINESS_HOURS = {
  weekdays: "Seg–Sex: 8h às 18h",
  saturday: "Sáb: 8h às 12h",
} as const;
