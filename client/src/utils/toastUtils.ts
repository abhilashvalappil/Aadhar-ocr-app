import iziToast from "izitoast";

export const showErrorToast = (message: string) => {
  iziToast.error({
    message,
    position: "topCenter",
    timeout: 2000,
    close: true,
    progressBar: true,
    pauseOnHover: true,
    transitionIn: "fadeInDown",
    transitionOut: "fadeOutUp",
  });
};
