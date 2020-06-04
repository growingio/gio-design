function _camelCase(string) {
  return string.replace(
    /^.|-./g,
    (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase()
  );
}

function _basicCleanup(svg, name) {
  return svg
    .replace(/width="\S+"/, '')
    .replace(/height="\S+"/, '')
    .replace(/xmlns="(\S*)"/, '')
    .replace(/data-name="(.*?)"/, '')
    .replace(/([\w-]+)="/g, match => _camelCase(match))
    .replace(/\s{2,}/g, ' ')
    // .replace(/xlink\:href="(\S*)"/g, 'xlinkHref="$1"')
    // .replace(/xmlns\:xlink="(\S*)"/g, 'xmlnsXlink="$1"')
    // .replace(/<style>(.*?)<\/style>/g, '')
    .replace(/xmlns\:(\S)/g, (match, $1) => 'xmlns' + $1.toUpperCase())
    .replace(/serif\:(\S)/g, (match, $1) => 'serif' + $1.toUpperCase())
    .replace(/class=/g, 'className=')
    .replace(/#323333/g, 'currentColor')
    .replace(/<style>(.*)<\/style>/g, '<style>{"$1"}</style>')
    .replace(/(id="clip-path)/g, '$1-' + name)
    .replace(/(#clip-path)/g, '$1-' + name)
    .replace(/cls-/g, 'cls-' + name + '-');
}

export function cleanupName(name) {
  return name.replace(/u[A-Z0-9]{4}-/, '');
}

export function cleanupSvg(svg, keepFillColor, name) {
  const cleanedSvg = _basicCleanup(svg, name)
    .replace(/viewBox/, '{...rest} height={height || size} width={width || size} onClick={onClick} style={style} className={className} viewBox');

  return keepFillColor
    ? cleanedSvg
    : cleanedSvg
      .replace(/fill="#?\w+"/g, '')
      .replace(/viewBox/, 'fill={color} viewBox')
      .replace(/\s{2,}/g, ' ')
      .replace(/ \>/g, '>');
}

export function cleanupNativeSvg(svg, keepFillColor) {
  const cleanedSvg = _basicCleanup(svg)
    .replace(/viewBox/, '{...rest} height={height || size} width={width || size} style={style} viewBox')
    .replace(/\<[a-z]|\<\/[a-z]/g, match => match.toUpperCase());

  return keepFillColor
    ? cleanedSvg
    : cleanedSvg
      .replace(/fill="#?\w+"/g, '')
      .replace(/\<Path/g, '<Path fill={color}')
      .replace(/\s{2,}/g, ' ')
      .replace(/ \>/g, '>');
}
