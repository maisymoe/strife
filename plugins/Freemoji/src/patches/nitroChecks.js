const { instead } = vendetta.patcher;
const { findByProps } = vendetta.metro;

const nitroInfo = findByProps("canUseEmojisEverywhere");

export default [
	instead("canUseEmojisEverywhere", nitroInfo, () => true),
	instead("canUseAnimatedEmojis", nitroInfo, () => true),
];