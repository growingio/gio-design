import { startsWith, pick } from 'lodash';

export default function pickEventProps(props: any, picked: string[] = []): any {
  const keys = Object.keys(props).filter((prop) => startsWith(prop, 'on') || picked.indexOf(prop) >= 0);
  return pick(props, keys);
}
