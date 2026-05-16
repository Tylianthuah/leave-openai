import OpenAI from "openai";

export const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: "function",

    function: {
      name: "createLeave",

      description: "Create a new leave request",

      parameters: {
        type: "object",

        properties: {
          fromDate: {
            type: "string",
          },

          toDate: {
            type: "string",
          },

          leaveType: {
            type: "string",
          },

          reason: {
            type: "string",
          },
        },

        required: ["fromDate", "toDate", "leaveType", "reason"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "getLeaves",

      description: "Get all leave applications",

      parameters: {
        type: "object",

        properties: {},
      },
    },
  },

  {
    type: "function",

    function: {
      name: "cancelLeave",

      description: "Cancel leave by id",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "number",
          },
        },

        required: ["id"],
      },
    },
  },
  {
    type: "function",

    function: {
      name: "scheduleOOO",

      description: "Schedule Out Of Office status in Microsoft Teams",

      parameters: {
        type: "object",

        properties: {
          fromDate: {
            type: "string",

            description: "Start date of OOO",
          },

          toDate: {
            type: "string",

            description: "End date of OOO",
          },

          reason: {
            type: "string",

            description: "Reason for leave",
          },

          useCustomMessage: {
            type: "boolean",

            description: "Whether the user wants a custom OOO message",
          },

          customMessage: {
            type: "string",

            description: "Custom Out Of Office message provided by user",
          },
        },

        required: ["fromDate", "toDate", "reason", "useCustomMessage"],
      },
    },
  },
];
