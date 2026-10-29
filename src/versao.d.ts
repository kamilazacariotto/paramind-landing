// Tipo do alias "@versao": as três versões exportam a mesma forma.
declare module "@versao" {
  export const Page: () => import("react").JSX.Element;
  export const versao: import("./tracking").Versao;
}
