const socket = io("http://localhost:3000");

const chatBox = document.querySelector(".message-section");
const sendButton = document.querySelector(".send-section__button");
const messageInput = document.querySelector(".send-section__container input");

const username = prompt("Choose your username: ");

socket.emit("new-user-joined", username);
appendMessage({
  username: `You`,
  message: `Joined the conversation as ${username}...`,
  alignClass: "align-right",
});
messageInput.placeholder = username;

socket.on("broadcast-message", (messageData) => {
  appendMessage({
    username: messageData.username,
    message: messageData.message,
    alignClass: "align-left",
  });
});

socket.on("broadcast-joined-user", (newUser) => {
  appendMessage({ ...newUser, alignClass: "align-left" });
});

sendButton.addEventListener("click", () => {
  socket.emit("send-message", { username, message: messageInput.value });
  appendMessage({
    username,
    message: messageInput.value,
    alignClass: "align-right",
  });
  messageInput.value = "";
});

function appendMessage(messageData) {
  let afterContent =
    messageData.alignClass === "align-left" ? messageData.username : "";

  chatBox.innerHTML += `
    <div class="${messageData.alignClass}" data-after="${afterContent}">
      <div class="message-section__row">
        <span class="message__text">${messageData.message}</span>
      </div>
    </div>
  `;
}
