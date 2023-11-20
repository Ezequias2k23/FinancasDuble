const languageButton = document.getElementById("languageButton");
        const notificationButton = document.getElementById("notificationButton");

        let isEnglish = false;

        languageButton.addEventListener("click", () => {
            if (isEnglish) {
                document.documentElement.lang = "pt-BR";
                isEnglish = false;
            } else {
                document.documentElement.lang = "en-US";
                isEnglish = true;
            }
        });

        notificationButton.addEventListener("click", () => {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    alert("Notificações estão ativadas!");
                } else if (permission === "denied") {
                    alert("Notificações foram negadas.");
                } else {
                    alert("Notificações não suportadas neste navegador.");
                }
            });
        });
        