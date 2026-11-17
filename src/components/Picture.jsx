import manifest from '../content/images.json';

const BASE = import.meta.env.BASE_URL;

// Responsive image from the generated manifest. Width and height are always set,
// so the browser reserves space and nothing shifts while images load.
export function Picture({ name, alt, sizes = '100vw', priority = false, className, style, ...rest }) {
  const entry = manifest[name];
  if (!entry) {
    return (
      <div className="placeholder" role="img" aria-label={alt} style={{ aspectRatio: '16 / 10', display: 'grid', placeItems: 'center' }}>
        <span className="placeholder-label">Missing image: {name}</span>
      </div>
    );
  }
  const srcSet = entry.files.map((f) => `${BASE}img/${f.file} ${f.w}w`).join(', ');
  const fallback = entry.files.find((f) => f.w >= 1080) || entry.files[entry.files.length - 1];
  return (
    <img
      src={`${BASE}img/${fallback.file}`}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      data-edge={entry.edge}
      className={className}
      style={style}
      {...rest}
    />
  );
}

export function ratio(name) {
  const entry = manifest[name];
  return entry ? `${entry.width} / ${entry.height}` : '16 / 10';
}
