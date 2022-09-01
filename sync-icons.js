import fs from "fs";
import mkdirp from 'mkdirp';
import p, {dirname} from 'path';
import {createRequire} from "module";
import {fileURLToPath} from 'url';
import {iconNameToPathsRecordKey, IconSvgPaths20} from "@blueprintjs/icons";

const __dirname = dirname(fileURLToPath(import.meta.url));
const requireFile = createRequire(import.meta.url);
const iconsMetadata = requireFile("@blueprintjs/icons/icons.json");

(async function () {
    for (const icon of iconsMetadata) {
        await generation(icon.iconName)
    }

    console.info('sync icons done.');
})();

async function generation(file_name) {
    const paths = IconSvgPaths20[iconNameToPathsRecordKey(file_name)];
    if (paths == null) {
        return null;
    }
    const path = paths.map((path, i) => `<path d="${path}" fill="currentColor"/>`);
    const content = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;
    const file = p.join(__dirname, 'resources/svg', file_name + '.svg');

    mkdirp.sync(p.dirname(file));
    fs.writeFileSync(file, content, 'utf8');

    console.info('sync-icon:' + file_name);
}
