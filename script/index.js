// Конфигурация
const config = {
  apiUrl: "https://daniilaxiyan316.amocrm.ru/",
  delay: 1000,
  cardLimit: 2,
  redirectUri: "https://cors-anywhere.herokuapp.com/",
  integrationId: "d32f79a0-ae38-4980-b611-b9ff629961e1",
  secretKey: "I1esmjh4VkKgYQIzqIVhyvfkVwKrkRrcVxCrSoywKqWFQGpeykjuSG8g1SVWE2co",
  longTermToken:
    "def502004dfc3453da0bd4bb088dd449c0fd5a91a56f5bac6ae2f16ca1cf450c5be0b9611875e0d05659ec5a064d84b885b97dc77931871a9ebf92b4c92557064ea4340e95dfeb10004f5fd19831166ed35fe742591d4d4835921920d756fec442a43332c56499ccaff70a745b02851a59d1ce4ecadd051bbd7137bb24046b16a4450c4085086309a3255f110af017717ee9fb80fd4b54ff06723970b2da7801f0898f238c1478a774b050e29955ca8ceb3acc53491d0b4f9fbdfafc9a302b9eabbc46747367b11ea4de58865c31fc8fbb647877bfc294ab850c6acd79e6915b9b13222ac7150b773a8684f476ea7bc736c9b0d0f14e0e82ed6a796747d75fe04f24996e3dbd54183a8c0dc05e64c350885d387a9c1418ac17faeeed86a6d4231c523ed99c12b2e52154b02c1fc0a490c16dc5c30f6dbea7c9bc64369cbf80ae37beee253c615b29e2b7e7244f926cfa3ac62dd9bd5b349efff3302b9436d1be3e9d2c6e867ac5b31f72f15721841123ea3bb4829beeadfc3f6746a848bedadb5b8983d2160a20dc2697582d8edd1acdce534ccb269b73e556bee991de60d0c61e1ec47ccd5e62b5d38997cd9839e3d5af8598702bc9a51ec32258ec7a08943975bda9d61f6b524e8c817f4f2364a8c9b61c24f036d9b9fb50f04fd44b00fd6dd5537d52d8a370555ecd31456b33983a49bedae73fce",
};

// Утилиты
const getAuth = async (url, options = {}) => {
  const URL = `${url}oauth2/access_token`;

  const body = {
    client_id: config.integrationId,
    client_secret: config.secretKey,
    grant_type: "authorization_code",
    code: config.longTermToken,
    redirect_uri: config.redirectUri,
  };
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "	application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Ошибка запроса: ${errorData.message || response.status}`);
  }

  return response.json();
};

const getDeals = async (url, options = {}) => {
  const URL = `${url}/api/v4/leads`;

  const accessToken = window.localStorage.getItem("access_token");
  if (!accessToken) {
    document.getElementsByTagName("body").innerHTML =
      '<div class="error">Отсутствует access_token. Проверьте логи</div>';
    throw new Error(`Ошибка: в localStorage нету access_token`);
  }

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

  return response.json();
};

const formatDate = (dateString) => {
  if (!dateString) return "Нет даты";
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const getStatusCircle = (dateString) => {
  if (!dateString) return "gray"; // Нет даты
  const taskDate = new Date(dateString);
  const today = new Date();
  const dayDifference = Math.ceil((taskDate - today) / (1000 * 3600 * 24));

  if (dayDifference < 0) return "red"; // Просрочено
  if (dayDifference === 0) return "green"; // Сегодня
  return "yellow"; // В будущем
};

// Работа с API
const fetchDeals = async () => {
  let page = 1;
  let hasMoreDeals = true;

  while (hasMoreDeals) {
    try {
      const data = await getDeals(`${config.apiUrl}`, { limit: pa });
      renderDeals(data._embedded.leads);

      if (data._embedded.leads.length < config.cardLimit) {
        hasMoreDeals = false;
      }
      page++;
      await new Promise((r) => setTimeout(r, config.delay));
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

  button.innerHTML = '<div class="spinner"></div>';

  try {
    const deal = await getAuth(`${config.apiUrl}`);
    const taskDate = deal.tasks ? deal.tasks[0].date : null;
    const statusCircle = getStatusCircle(taskDate);

    button.innerHTML = `
        Название: ${deal.name}<br>
        ID: ${deal.id}<br>
        Дата задачи: ${formatDate(taskDate)}<br>
        <span class="status-circle ${statusCircle}"></span>
      `;
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
    const data = await getAuth(config.apiUrl);

    const localStorage = window.localStorage;

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    await fetchDeals();
  } catch (error) {
    document.getElementsByTagName("body").innerHTML =
      '<div class="error">Непридведенная ошибка. Проверьте логи</div>';
    console.error("Ошибка инициализации:", error);
  }
});
