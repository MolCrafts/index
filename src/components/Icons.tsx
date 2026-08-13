import moko from "@/assets/moko.svg";

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <img
      src={moko}
      alt="MolCrafts Logo"
      className={`w-12 h-12 object-contain rounded-lg ${props.className ?? ""}`}
    />
  );
};
