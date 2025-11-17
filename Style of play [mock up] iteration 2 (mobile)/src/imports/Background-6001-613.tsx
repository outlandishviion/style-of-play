function TextWrapper() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-0 relative shrink-0" data-name="Text wrapper">
      <p className="capitalize font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Big Thrills
      </p>
    </div>
  );
}

function Perset() {
  return (
    <div className="box-border content-stretch flex h-[32px] items-center overflow-clip p-[8px] relative rounded-[18px] shrink-0" data-name="Perset">
      <TextWrapper />
    </div>
  );
}

function LocalPresetBtn() {
  return (
    <div className="content-stretch flex items-start opacity-0 relative shrink-0" data-name="[Local] preset-btn">
      <Perset />
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#ff9800] box-border content-stretch flex items-center overflow-clip relative rounded-[999px] shadow-[0px_0px_10px_3px_#ff9800] size-full" data-name="background">
      <LocalPresetBtn />
    </div>
  );
}