export const karma = user => user.Chats[0].ChatPayload.karma;
export const karmaBlockExist = user => !user.Chats[0].ChatPayload.karmaVisible;
export const canChangeKarma = user => user.Chats[0].ChatPayload.canChangeKarma;
export const latestKarmaVote = user => user.Chats[0].ChatPayload.latestKarmaVote;