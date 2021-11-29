import { useContext } from 'react';
import SizeContext from '../SizeContext';

const useSize = () => useContext(SizeContext);

export default useSize;
