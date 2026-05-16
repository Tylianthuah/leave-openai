interface OOO {
  fromDate: string;

  toDate: string;

  reason: string;

  useCustomMessage: boolean;

  customMessage?: string;
}

export const scheduleOOO = async ({
  fromDate,
  toDate,
  reason,
  useCustomMessage,
  customMessage,
}: OOO) => {
  
  const finalMessage =
    useCustomMessage && customMessage ? customMessage
    : `Hi, I am currently out of office from ${fromDate} to ${toDate}. Reason: ${reason} I will respond once I return.`;

  console.log(finalMessage);
  return {
    success: true,
    teamsStatus: "Scheduled",
    oooMessage: finalMessage,
  };
};