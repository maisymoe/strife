const { findByProps } = vendetta.metro;
const { getCustomEmojiById } = findByProps("getCustomEmojiById");
const { getLastSelectedGuildId } = findByProps("getLastSelectedGuildId");

// https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/index.js#L25
const hasEmotesRegex = /<a?:(\w+):(\d+)>/i;

function extractUnusableEmojis(messageString, size) {
	const emojiStrings = messageString.matchAll(/<a?:(\w+):(\d+)>/gi);
	const emojiUrls = [];

	for (const emojiString of emojiStrings) {
		// Fetch required info about the emoji
		const emoji = getCustomEmojiById(emojiString[2]);

		// Check emoji usability
		if (
			emoji.guildId != getLastSelectedGuildId() ||
			emoji.animated ||
			isInDms()
		) {
			// Remove emote from original msg
			messageString = messageString.replace(emojiString[0], "");
			// Add to emotes to send
			emojiUrls.push(`${emoji.url.split("?")[0]}?size=${size}`);
		}
	}

	return [messageString.trim(), emojiUrls];
}

export default (msg) => {
	if (!msg.content.match(hasEmotesRegex)) return;

	// Find all emojis from the captured message string and return object with emojiURLS and content
    // TODO: When Vendetta has persistent storage for plugins, change second arg to that
	const [newContent, extractedEmojis] = extractUnusableEmojis(msg.content, 64);

	msg.content = newContent;

	if (extractedEmojis.length > 0)
		msg.content += "\n" + extractedEmojis.join("\n");

	// Set invalidEmojis to empty to prevent Discord yelling to you about you not having nitro
	msg.invalidEmojis = [];
};