import Card from './Card';
import CardMeta from './CardMeta';
import WithSubComponent from '../utils/withSubComponent';

export { CardProps, CardMetaProps } from './interfaces';

export default WithSubComponent(Card, { Meta: CardMeta });
