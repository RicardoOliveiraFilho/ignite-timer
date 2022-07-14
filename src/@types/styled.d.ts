// '.d.ts' significa que é apenas um arquivo de definição de tipos do Typescript.
// Só existe código que define tipagens...
import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}