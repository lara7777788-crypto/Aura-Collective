import velaWatermark from "@/assets/vela-watermark.png";

const VelaWatermark = () => (
  <a
    href="https://loveconcursall.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Vela — loveconcursall.com"
    className="fixed bottom-4 right-4 z-[100] group print:hidden pointer-events-auto"
  >
    <img
      src={velaWatermark}
      alt="Vela watermark"
      className="h-8 w-auto sm:h-10 md:h-12 opacity-30 group-hover:opacity-90 transition-opacity duration-300 select-none"
      draggable={false}
    />
  </a>
);

export default VelaWatermark;
