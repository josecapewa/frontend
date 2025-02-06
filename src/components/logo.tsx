
import TuassakdilaIcon from "/logo-tuassakidila.png";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      src={TuassakdilaIcon}
      height={100}
      width={100}
      alt="Tuassakidila Icon"
      className={className}
    />
  );
};
