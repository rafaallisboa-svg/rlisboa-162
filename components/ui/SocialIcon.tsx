import { SiInstagram, SiBehance, SiWhatsapp } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const MAPA = {
  Instagram: SiInstagram,
  LinkedIn: FaLinkedinIn,
  Behance: SiBehance,
} as const;

export function SocialIcon({
  nome,
  className = "h-5 w-5",
}: {
  nome: string;
  className?: string;
}) {
  const Icone = MAPA[nome as keyof typeof MAPA];
  if (!Icone) return null;
  return <Icone className={className} aria-hidden="true" />;
}

export function IconeEmail({ className = "h-5 w-5" }: { className?: string }) {
  return <HiOutlineMail className={className} aria-hidden="true" />;
}

export function IconeWhatsApp({ className = "h-5 w-5" }: { className?: string }) {
  return <SiWhatsapp className={className} aria-hidden="true" />;
}
