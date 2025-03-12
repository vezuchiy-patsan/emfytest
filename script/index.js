import parseJwt from "./jwtDecode.js";

const config = {
  apiUrl: "https://daniilaxiyan316.amocrm.ru/",
  delay: 1000,
  cardLimit: 2,
  endpoints: {
    sendRequest: "api/v4/leads",
    getDealId: (id) => `api/v4/leads/${id}`,
  },
  redirectUri: "https://vezuchiy-patsan.github.io/emfytest/",
  integrationId: "d32f79a0-ae38-4980-b611-b9ff629961e1",
  secretKey: "GtTjcu8MvMS0SlODfBVkNTokF3KM58cnpV263HoZ2pyq2AZ7VpQnQGDAMKsi9X9t",
  accessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZiNTUyMTllZDkzNDc2M2NjZTBlYThkMTViNzUwMzU3Y2ZhNWE2OWZhZmZiYTUwOTA0NTJhMTY4Yjg1ZTIwZmMxNDU5ZWU1MTMzZmEwYmVkIn0.eyJhdWQiOiJkMzJmNzlhMC1hZTM4LTQ5ODAtYjYxMS1iOWZmNjI5OTYxZTEiLCJqdGkiOiJmYjU1MjE5ZWQ5MzQ3NjNjY2UwZWE4ZDE1Yjc1MDM1N2NmYTVhNjlmYWZmYmE1MDkwNDUyYTE2OGI4NWUyMGZjMTQ1OWVlNTEzM2ZhMGJlZCIsImlhdCI6MTc0MTc5NzExNSwibmJmIjoxNzQxNzk3MTE1LCJleHAiOjE3NDE4ODM1MTUsInN1YiI6IjEyMjIzODE4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyMjgwNDYyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOTg1NjFhOTItYTE3Ni00MWZmLWJjNjgtZjZkYzZmODYzODhhIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.ZKtDjlNHW0MTdPq6yHXNAVHDi7aNeVxxL3LoVQ-YR7VMadqRIuGL4wbNna3WEx7l4MFGb5-OjHf8r-LCQ56v6i5nttD2uWZZwUzYPKbeY5Lc6lJ_DVosd1HQUmBL6qjbfrnGkKdCtK8dv6UewszYvvyOwMLcucdTCZHdthLZbdw6gb_TIkMHBn3RV4iSqydei-pkiDUsA5UiHPJm-exmDsGYaNFFwsVMZrVHFIp5NrN8IGM_F5ydRk4EwTCySOFB60S3H8wNpkaPxb9DVBaX_IbKaQBR3DVlsHKrk-fyEbHJtXcMJgdd4CzeWYTk7xpIfdyqQ5BG1bwY9ZkVlciCxQ",
  refreshToken:
    "def502007f33c03a9c735c0d2ed08057dd7157bcc66c9cfa09b8b79996cb03ab1f3cdd9bc05bcbc87e6c5aea15601d2b91c31d5ccaad8a565dc252489baaa883224ef8dff8831b40af4cc464ba27ce04ee9111f6ab9b2efb43ef02aa3fd3fa078eea94789486e468a1b0247d407468bc1ed9c4f435949c63b3143be72e50cc3a147d3fd430a0ede23e7bd23eb0ec0181a95ff36353652b7df579a22ee26ee3676e9e1ffc1808d34cd48197c3c90119b060c0e1a67ecd9cd4e7c16688899fa82bef5cbf527d70c96ffd9b464de71f167558710ccd05aa4da97fce6a3bfaa447c145df802067341d841fa2ad653df4da0d8e0028569af4331b155d63bee408792a223f862354a41527860dfba8c88a0ba03dceaf50784de0de8a2db27842236a9c5671649a4b1dcce1c709f661a74c929c5b6fbc073c6b3ef460644c03ce06a40dbf9ee09145e561bd4e720a6a731b4a93d9b4cbc6cb9d25ed4ca8f12cee09e0ed3a83215e4184ebe4af70fb8a4825eff9ca17bfaccbcebe087116d669fab0cabb944e2d56744df4f41d57f89ff198fd4f8a4ab6d05898f3936c2a43e7e1c38edc58001d2e08a28ed3bc958181fd6d5329185edb8371feaaf04c950a6e693c9c4b5049f56711422686c94d34d692b91c1b35cb14f708243edf7f05883c084bf2dd36a4683a6ac3f511cfbf626403c8",
  auth_code:
    "def50200f9fff1a237b4bd950b16d448cc12e2ac60fb84dee80d8944f51c3d2ca773ae8c705497ec1185cdb0d1fa8f9993e94c4cd8264d3ddbada40a38639e9289a11dfc237cf3c69da107475352fa201ae80a621239c001b44ef8eb00a32ac280fe0e5b139c371974298c18fff0e6bc3a693f97f0383f9245aadd6355097009ff84f361f4de74ef6daebd00772c09e466621b34b89b3bdb218a9d07261644619275bca0c854005a0f21c2341ac170cb461ad901cbac394cde73d13f7e103dc7067aef7dcbabfbdcafa37716429031bbf93fe37e252c2be3da26b28f053a0999a1f44424a207cbaffb6f6e34f31b90b428d013394bc2dd6f412882fa0993fd168a03582e076cdc87355494a65004a5a8ed06528247eaef899699bd07ea5e80e2f17df5cb83b7e509216e37a9b4b759b71d3f464e92151d2809e390f4adb64431d20221d043d71c25a79d4900b2aa72f2e98b46832561561021201b51fafaaf54100f3867548377e8d20da481c3deffbf39d740a246ceedd059cab200ec60a7b8f959fd5591c01cf63c895c580b1e8d78e83e003b9e520d3befa6ae5719c23dbd31c465506d22ab4544179e46e78fad51c5e6b4e234e9d9ff5839655afeb821b96756b263fbd43c8a96d7de7ccdbc073113e627afea6c8eb2d26a87efba7a30e505dc35cec9541760fb76763eac696cdf36d89b9502ca4514d361e4b2815f",
};

const getAuth = async (url, options = {}, isRefresh = false) => {
  const URL = `${url}oauth2/access_token`;

  const body = {
    client_id: config.integrationId,
    client_secret: config.secretKey,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
  };

  if (isRefresh) {
    body.refresh_token = window.localStorage.getItem("refresh_token");
  } else {
    body.code = config.auth_code;
  }

  const response = await fetch(URL, {
    ...options,
    method: "POST",
    headers: {
      ...options.headers,
      Accept: "	application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Ошибка запроса: ${errorData.message || response.status}`);
  }

  return response.json();
};

const sendRequest = async (url, options = {}, params = {}) => {
  const accessToken = window.localStorage.getItem("access_token");
  if (!accessToken) {
    document.getElementsByTagName("body").innerHTML =
      '<div class="error">Отсутствует access_token. Проверьте логи</div>';
    throw new Error(`Ошибка: в localStorage нету access_token`);
  }

  const urlParams = new URLSearchParams(params);

  const URL = `${url}${urlParams.size > 0 ? "?" + urlParams : ""}`;

  const response = await fetch(URL, {
    ...options,
    method: "GET",
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Ошибка запроса: ${errorData.message || response.status}`);
  }
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const formatDate = (dateString) => {
  if (!dateString) return "Нет даты";
  const date = new Date(dateString * 1000);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const checkStatusTask = (dateString) => {
  const dialogContent = document.getElementById("dialog-content");

  if (dialogContent) {
    const svg = dialogContent.querySelector(".circle-fill");
    if (!dateString) {
      svg.classList.toggle("red");
      return;
    } // Нет даты
    const taskDate = new Date(dateString * 1000);
    const today = new Date();
    const diff = Math.floor((taskDate - today) / (1000 * 3600 * 24));

    if (diff < 0) {
      svg.classList.toggle("red");
      return;
    } // Просрочено
    if (diff === 0) {
      svg.classList.toggle("green");
      return;
    } // Сегодня
    svg.classList.toggle("yellow"); // В будущем
  }
};

const fetchDeals = async () => {
  let page = 1;
  let hasMoreDeals = true;

  while (hasMoreDeals) {
    try {
      const data = await sendRequest(
        `${config.apiUrl}${config.endpoints.sendRequest}`,
        {},
        { page: page, limit: config.cardLimit }
      );
      if (data !== null) {
        renderDeals(data._embedded.leads);

        // Проверяем, есть ли еще данные для загрузки
        if (data._embedded.leads.length < config.cardLimit) {
          hasMoreDeals = false;
        }

        page++;
      } else {
        hasMoreDeals = false;
      }

      // Добавляем задержку перед следующим запросом
      await new Promise((resolve) => setTimeout(resolve, config.delay));
    } catch (error) {
      console.error("Ошибка загрузки сделок:", error);
      hasMoreDeals = false;
    }
  }
};

const renderDeals = (deals) => {
  const tableBody = document.getElementById("table-body");
  try {
    deals.forEach((deal) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${deal.id}</td>
            <td>${deal.name}</td>
            <td>${deal.price}</td>
            <td><button class="open-deal button" data-id="${deal.id}">Открыть</button></td>
          `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    document.getElementsByTagName("body").innerHTML =
      '<div class="error">Непридведенная ошибка при добавлении таблицы. Проверьте логи</div>';
    console.error("Ошибка: ", error);
  }
};

const handleTaskButtonClick = async (event) => {
  const button = event.target;
  const dealId = button.dataset.id;

  button.innerHTML = "<div>Загрузка данных...</div>";

  try {
    const deal = await sendRequest(
      `${config.apiUrl}${config.endpoints.getDealId(dealId)}`
    );
    const taskDate = deal.closest_task_at;
    button.innerHTML = "Открыть";

    const dialog = document.getElementById("dealDialog");
    if (dialog) {
      const content = dialog.children[0];
      content.innerHTML = `
        <p>Название: ${
          deal.name
        }         <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="5" class="circle-fill" />
        </svg><p>
        <p>ID: ${deal.id}</p>
        <p>Дата задачи: ${formatDate(taskDate)}</p>
      `;
      checkStatusTask(taskDate);

      window["dealDialog"].showModal();
    }
  } catch (error) {
    button.innerHTML = "Ошибка загрузки";
    console.error("Ошибка загрузки задачи:", error);
  }
};

// Инициализация
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("open-deal")) {
    handleTaskButtonClick(event);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const localStorage = window.localStorage;

    if (
      localStorage.getItem("access_token") === null &&
      config.accessToken.length === 0
    ) {
      const data = await getAuth(config.apiUrl);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    } else if (
      localStorage.getItem("access_token") === null &&
      config.accessToken.length !== 0
    ) {
      localStorage.setItem("access_token", config.accessToken);
      localStorage.setItem("refresh_token", config.refreshToken);
    }

    const refreshToken = localStorage.getItem("access_token");
    const parsedToken = parseJwt(refreshToken);

    if (parsedToken) {
      const exp = parsedToken.exp;
      const now = Math.floor(Date.now() / 1000);

      if (exp > now) {
        const timeUntilExpiry = (exp - now) * 1000;

        setTimeout(() => {
          getAuth(config.apiUrl, {}, true);
        }, timeUntilExpiry - 60000); // Обновляем токен за 1 минуту до истечения
      }
    }

    await fetchDeals();
  } catch (error) {
    document.getElementsByTagName("body").innerHTML =
      '<div class="error">Непридведенная ошибка. Проверьте логи</div>';
    console.error("Ошибка инициализации:", error);
  }
});
