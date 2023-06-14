import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "../../components/LearningOptions/LearningOptions";
import LinkList from "../../components/LinkList/LinkList";

const config = {
  initialMessages: [createChatBotMessage(`Hello Bey, What do you want to help with ?`, {
    widget: "learningOptions",
  })],
  customStyles: {
    botMessageBox: {
      backgroundColor: "white",
    },
    chatButton: {
      backgroundColor: "purple",
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Introduction to JS",
            url:
              "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Mozilla JS Guide",
            url:
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },
  ],
}

export default config