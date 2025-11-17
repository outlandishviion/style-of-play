import svgPaths from "./svg-r1peccek9r";

function Info() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-[2px] pr-0 pt-[2px] relative shrink-0 w-[14px]" data-name="info">
      <div className="relative shrink-0 size-[12px]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path clipRule="evenodd" d={svgPaths.p36140b00} fill="var(--fill-0, white)" fillRule="evenodd" id="Subtract" opacity="0.25" />
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#acb0b9] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        RTP
      </p>
      <Info />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow h-full items-center min-h-px min-w-px relative shrink-0">
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal items-start relative shrink-0 text-white">
      <div className="flex flex-col justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[10px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Min:</p>
      </div>
      <p className="leading-[normal] relative shrink-0 text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        96%
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal items-end relative shrink-0 text-nowrap text-white">
      <div className="flex flex-col justify-center leading-[0] opacity-50 relative shrink-0 text-[10px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] text-nowrap whitespace-pre">Max:</p>
      </div>
      <p className="leading-[normal] relative shrink-0 text-[14px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`>97%`}</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="box-border content-stretch flex gap-[16px] h-full items-center pb-0 pt-[4px] px-0 relative shrink-0">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function TextIcon() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Text/Icon">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Frame />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame2 />
      </div>
    </div>
  );
}

export default function Title() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-start pb-0 pt-[4px] px-0 relative size-full" data-name="title">
      <TextIcon />
    </div>
  );
}