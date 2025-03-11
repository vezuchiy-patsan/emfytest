// Конфигурация
const config = {
  apiUrl: "https://daniilaxiyan316.amocrm.ru/",
  delay: 1000,
  cardLimit: 2,
  redirectUri: "https://vezuchiy-patsan.github.io/emfytest/",
  integrationId: "d32f79a0-ae38-4980-b611-b9ff629961e1",
  secretKey: "I1esmjh4VkKgYQIzqIVhyvfkVwKrkRrcVxCrSoywKqWFQGpeykjuSG8g1SVWE2co",
  longTermToken:
    "def502005f0597cbf53a6ca84b90b1b760d8983ccb917f59107b1fb90802016b48cbc79cc423285a436ce7b4594cf5ace07fe29886ab926b028db343ee955b8d1429d6fed3fc583c406425348842fa4d29ca32893b07b2fd71d1e53338e6375670b7bf79a620ea51971db9c3af82ca496ace49fccc4367aca8c7b0ad144883beaeb91b77be3f4594decdb682fe28094cc49c86834d00b7cbfe6f8095d4574bd613bba044cd82aa79ba8478f002c0e0503485c35eee9d3e94957ecfc90c1dff6d4cb5abdfe844a31b6d37929e05b4829eddb6bfcece53369dcc8df185424d252227de7ae301f954dd5824028f7f77c818219a2ab9c600be55ff942172afb1578cd4b3974d41e0823ff4ab064a055073c1770f88aa1048af204da4f6ee989c29a49a698b15ff8530dfa56fc974ad847005bc58bbc453187d40dc349d52348eae9857d1ad0c6796cd1373894672d62cf515f75605e772b426a19289917d4c8216c6d442bd0d6dc78767f2aa8206f212f5f78e3c720937ccc9c0f81e5752b66bd0a45daa73b99ad5834f832a3dbbffebc45ceaff11030db865cfd7b52da4693aee3161b1fea9601bad72f0fc9373c4ba2bca291d7c5836225f84776bd2be75bf49892c35dfd7449c95f5f4e802dc8add6470f107de02daeb3f7d79e608cc0dd91c55e409441f83515b22fbe13ed5b55bd889923986affff0",
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
