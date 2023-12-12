// import original module declarations
import "styled-components";

// and extend them!
// interface를 변경시킴
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
