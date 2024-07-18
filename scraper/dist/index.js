"use strict";import i from"fs/promises";async function c(){await i.mkdir("../public/docs",{recursive:!0}),await i.writeFile("../public/docs/index.json","")}c().catch(console.error);
