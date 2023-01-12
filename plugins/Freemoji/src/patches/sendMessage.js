const { before } = vendetta.patcher;
const { findByProps } = vendetta.metro;
import modifyIfNeeded from "../msgProcessor";

const messageModule = findByProps("sendMessage", "receiveMessage");
const uploadModule = findByProps("uploadLocalFiles");

export default [
	before("sendMessage", messageModule, (args) => modifyIfNeeded(args[1])),
	before("uploadLocalFiles", uploadModule, (args) => modifyIfNeeded(args[0].parsedMessage)),
];