const API_BASE_URL = Deno.env.get("TelegramBot_Base_URL");
const token = Deno.env.get("TelegramBotToken") as string;

export const sendMessage = async (chat_id: string, text: string) => {
  const response = await fetch(`${API_BASE_URL}${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id,
      text,
    }),
  }).then((response) => response.json())
    .catch((error) => console.error(error));
};
