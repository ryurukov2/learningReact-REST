export const preChangeSteps = () => {
    const scrollPos = window.scrollY;
    sessionStorage.setItem('scrollPos', scrollPos.toString());
  };