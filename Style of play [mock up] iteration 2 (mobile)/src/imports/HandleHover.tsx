import svgPaths from "./svg-z55b4884u7";

export default function HandleHover() {
  return (
    <div className="relative size-full" data-name="handle: hover">
      <div className="absolute inset-[-0.01%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <g id="handle: hover ">
            <circle cx="17.96" cy="17.96" fill="var(--fill-0, white)" id="Ellipse 2" opacity="0.3" r="17.96" />
            <g id="Ellipse 1">
              <mask fill="white" id="path-2-inside-1_2050_260">
                <path d={svgPaths.p34389a00} />
              </mask>
              <path d={svgPaths.p34389a00} fill="var(--fill-0, white)" mask="url(#path-2-inside-1_2050_260)" stroke="var(--stroke-0, white)" strokeWidth="302" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}