import '@testing-library/jest-dom';

// JSDOM ne fournit pas nativement les méthodes TextEncoder et TextDecoder
// donc ajout manuel ici
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
