// Encode text string to character set bytes, then to Base64
// Copyright: 2017 Javier Serrano Polo <javier@jasp.net>
// License: GPL-3.0+ WITH reinstatement-exception

function encode_ISO_8859_15(cp) {
	let map = [
		[0xa4, 0x20ac],
		[0xa5, 0x00a5],
		[0xa6, 0x0160],
		[0xa7, 0x00a7],
		[0xa8, 0x0161],
		[0xa9, 0x00a9],
		[0xaa, 0x00aa],
		[0xab, 0x00ab],
		[0xac, 0x00ac],
		[0xad, 0x00ad],
		[0xae, 0x00ae],
		[0xaf, 0x00af],
		[0xb0, 0x00b0],
		[0xb1, 0x00b1],
		[0xb2, 0x00b2],
		[0xb3, 0x00b3],
		[0xb4, 0x017d],
		[0xb5, 0x00b5],
		[0xb6, 0x00b6],
		[0xb7, 0x00b7],
		[0xb8, 0x017e],
		[0xb9, 0x00b9],
		[0xba, 0x00ba],
		[0xbb, 0x00bb],
		[0xbc, 0x0152],
		[0xbd, 0x0153],
		[0xbe, 0x0178]
	];

	if (cp <= 0xa3 || (0xbf <= cp && cp <= 0xff))
		return String.fromCharCode(cp);
	for (let i = 0; i < map.length; i++)
		if (map[i][1] == cp)
			return String.fromCharCode(map[i][0]);
	return "";
}

function encode_UTF_8(cp) {
	if (cp < 0x00000080)
		return String.fromCharCode(cp);
	let b;
	if (cp < 0x00000800)
		b = String.fromCharCode(0xc0 | cp >> 6);
	else {
		if (cp < 0x00010000) {
			if (0x0000d800 <= cp && cp <= 0x0000dfff)
				return "";
			b = String.fromCharCode(0xe0 | cp >> 12);
		}
		else if (cp < 0x00110000)
			b = String.fromCharCode(0xf0 | cp >> 18,
				0x80 | (cp >> 12 & 0x3f));
		else
			return "";
		b += String.fromCharCode(0x80 | (cp >> 6 & 0x3f));
	}
	b += String.fromCharCode(0x80 | (cp & 0x3f));
	return b;
}

function encode_windows_1252(cp) {
	let map = [
		[0x80, 0x20ac],
		[0x81, 0x0081],
		[0x82, 0x201a],
		[0x83, 0x0192],
		[0x84, 0x201e],
		[0x85, 0x2026],
		[0x86, 0x2020],
		[0x87, 0x2021],
		[0x88, 0x02c6],
		[0x89, 0x2030],
		[0x8a, 0x0160],
		[0x8b, 0x2039],
		[0x8c, 0x0152],
		[0x8d, 0x008d],
		[0x8e, 0x017d],
		[0x8f, 0x008f],
		[0x90, 0x0090],
		[0x91, 0x2018],
		[0x92, 0x2019],
		[0x93, 0x201c],
		[0x94, 0x201d],
		[0x95, 0x2022],
		[0x96, 0x2013],
		[0x97, 0x2014],
		[0x98, 0x02dc],
		[0x99, 0x2122],
		[0x9a, 0x0161],
		[0x9b, 0x203a],
		[0x9c, 0x0153],
		[0x9d, 0x009d],
		[0x9e, 0x017e],
		[0x9f, 0x0178]
	];

	if (cp <= 0x7f || (0xa0 <= cp && cp <= 0xff))
		return String.fromCharCode(cp);
	for (let i = 0; i < map.length; i++)
		if (map[i][1] == cp)
			return String.fromCharCode(map[i][0]);
	return "";
}

function stringToBytesToBase64(s) {
	let rule;
	let cs = document.characterSet;
	switch (cs) {
	case "ISO-8859-15":
		rule = encode_ISO_8859_15;
		break;
	case "UTF-8":
		rule = encode_UTF_8;
		break;
	default:
		log(`Unknown encoding '${cs}'`);
	case "windows-1252":
		rule = encode_windows_1252;
		break;
	}
	let b = "";
	for (let i = 0; i < s.length;) {
		let cp = s.codePointAt(i);
		b += rule(cp);
		i += cp < 0x10000? 1: 2;
	}
	return btoa(b);
}
