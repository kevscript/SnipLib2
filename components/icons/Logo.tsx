import { SvgIconProps } from "./types";

const LogoIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      className={className}
    >
      <g clipPath="url(#a)">
        <g filter="url(#b)">
          <rect width="32" height="32" fill="#0033A5" rx="4" />
        </g>
        <rect width="31" height="31" x=".5" y=".5" stroke="#498DFF" rx="3.5" />
        <g filter="url(#c)">
          <path
            fill="#fff"
            d="M13.023 14c-.03-.379-.173-.674-.426-.886-.25-.213-.631-.319-1.143-.319-.325 0-.592.04-.8.12a.963.963 0 0 0-.455.312.771.771 0 0 0-.153.455.746.746 0 0 0 .073.38c.06.11.156.21.284.302.13.087.294.166.495.238.2.072.44.137.716.194l.954.204c.644.136 1.195.316 1.654.54.458.223.833.486 1.125.79.291.299.505.636.642 1.01.14.376.212.785.215 1.228-.003.765-.195 1.413-.573 1.943-.38.53-.92.934-1.625 1.21-.701.277-1.544.415-2.529.415-1.011 0-1.894-.15-2.647-.448-.75-.3-1.334-.76-1.75-1.381-.413-.625-.622-1.424-.625-2.398h3c.018.356.107.655.267.898.159.242.382.426.67.551.292.125.638.188 1.04.188.337 0 .62-.042.846-.125.228-.084.4-.2.518-.347a.818.818 0 0 0 .181-.506.718.718 0 0 0-.176-.466c-.11-.136-.292-.257-.545-.363a5.807 5.807 0 0 0-1.029-.307l-1.159-.25c-1.03-.224-1.843-.597-2.437-1.12-.591-.526-.885-1.244-.881-2.153-.004-.739.193-1.384.59-1.937.402-.557.957-.99 1.666-1.301.712-.311 1.528-.466 2.448-.466.94 0 1.752.157 2.438.471.686.315 1.214.758 1.585 1.33.375.568.565 1.233.569 1.994h-3.023Zm4.383 8V10.364h3.16v9.09h4.704V22h-7.864Z"
          />
        </g>
      </g>
      <defs>
        <filter
          id="b"
          width="32"
          height="36"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_216_6" />
        </filter>
        <filter
          id="c"
          width="26.815"
          height="19.932"
          x="2.455"
          y="10.205"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_216_6" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_216_6"
            result="shape"
          />
        </filter>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LogoIcon;
