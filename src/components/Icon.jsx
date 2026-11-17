// One authored icon set: 16px grid, 1.5px stroke, square caps.
const paths = {
  'arrow-right': <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />,
  'arrow-left': <path d="M13.5 8h-10M7 4.5 3.5 8 7 11.5" />,
  'arrow-down': <path d="M8 2.5v10M4.5 9 8 12.5 11.5 9" />,
  external: <path d="M5 3.5h7.5V11M12.5 3.5l-9 9" />,
  download: <path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M3 13.5h10" />,
  plus: <path d="M8 3v10M3 8h10" />,
  minus: <path d="M3 8h10" />,
  copy: (
    <>
      <path d="M5.5 5.5h7v7h-7z" />
      <path d="M3.5 10.5v-7h7" />
    </>
  ),
  check: <path d="M3 8.5 6.5 12 13 4.5" />,
  next: <path d="M6 3.5 10.5 8 6 12.5" />,
  prev: <path d="M10 3.5 5.5 8 10 12.5" />,
};

export function Icon({ name, size = 16, className, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={[name, className].filter(Boolean).join(' ')}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
