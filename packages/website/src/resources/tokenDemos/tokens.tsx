import React from 'react';
import KVTable, { KV } from './kvTable';
import * as tokens from '@gio-design/tokens';

const Tokens = () => <KVTable type="Tokens" data={tokens as KV} />;

export default Tokens;
